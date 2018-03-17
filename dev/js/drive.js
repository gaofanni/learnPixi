// 键盘事件
class Keyboard {
    constructor(keycode) {
        this.code = keycode;
        this.isDown = false
        this.isUp = true;
        this.press = undefined
        this.release = undefined
        this.init()
    }
    downHandler(e) {
        if (e.keyCode == this.code) {
            if (this.isUp && this.press) {
                this.press()
            }
            this.isDown = true;
            this.isUp = false
        }
        e.preventDefault()
    }
    upHandler(e) {
        if (e.keyCode == this.code) {
            if (this.isDown && this.release) {
                this.release()
            }
            this.isDown = false;
            this.isUp = true
        }
        e.preventDefault()
    }
    init() {
        window.addEventListener('keydown', this.downHandler.bind(this), false)
        window.addEventListener('keyup', this.upHandler.bind(this), false)
    }
}
class App {
    constructor() {
        this.init();
    }
    Container = PIXI.Container
    autoDetectRenderer = PIXI.autoDetectRenderer
    loader = PIXI.loader
    resources = PIXI.loader.resources
    Sprite = PIXI.Sprite
    Graphics = PIXI.Graphics
    BaseTexture = PIXI.BaseTexture
    Texture = PIXI.Texture
    Text = PIXI.Text
    radio = window.innerWidth / 640 * 2;
    bump = new Bump(PIXI);
    su = new SpriteUtilities(PIXI)
    d = new Dust(PIXI)
    wrapSize = { x: 540, y: 808 }
    renderer = PIXI.autoDetectRenderer(this.wrapSize.x * this.radio, this.wrapSize.y * this.radio,
        { antialias: false, transparent: true, resolution: 1 }//抗锯齿，透明，分辨率
    );
    stage = new PIXI.Container();
    group = new this.Container();
    graphics = new this.Graphics();
    state = null
    roadStage = null
    hitTestElement = null
    walkElement = null
    roadData = {
        angle: Math.PI / 180 * -45,
        len: this.wrapSize.x * this.radio,
        gap: 0,
        position: {
            x: 0,
            y: 0
        },
        roadWidth: 200 * this.radio
    }
    speed = 1
    size = (num) => {
        return num * this.radio
    }
    init() {
        this.mount();
        this.load();
    }
    mount() {
        document.querySelector('#app').appendChild(this.renderer.view)

        /* 缩放至可视宽高 */
        this.renderer.view.style.display = 'block';
        this.renderer.view.style.width = window.innerWidth + 'px';
        this.renderer.view.style.margin = '40px auto';
        this.renderer.view.style.transform = 'rotateX(35deg) translateZ(300px)';
        this.renderer.view.style.transformOrigin = 'center';

    }
    play() {
        let { bump, hitTestElement, roadStage, speed, walkElement, size } = this;
        /* 移动马路 */
        // roadStage.y += speed;
        // if (roadStage.children[0].getGlobalPosition().y > size(1600)) {
        //     roadStage.removeChild(roadStage.children[0])
        //     this.addRoad()
        // }
        // switch (walkElement.cur) {
        //     case 'left':
        //         roadStage.x += speed;
        //         break
        //     case 'right':
        //         roadStage.x -= speed;
        //         break
        // }

        // for (let n in this.roadStage.children) {
        //     let endY = this.getEndY(
        //         {
        //             rotation: this.roadStage.children[n].rotation,
        //             oriPos: this.roadStage.children[n].getGlobalPosition(),
        //             r: this.roadStage.children[n].height,
        //         }
        //     )
        //     if (this.walkElement.y < this.roadStage.children[n].getGlobalPosition().y && this.walkElement.y > endY) {
        //         console.log(n)
        //     }
        // }

    }
    load() {
        let { loader } = this;
        loader
            .add(['./images/assets/test.json', './images/assets/timg.jpg'])
            .load(this.setup.bind(this))
    }
    setup() {
        let { Sprite, stage, resources, Graphics, size, wrapSize, bump } = this;
        this.roadStage = this.drawRoad();
        /* 初始化加载 */
        let initialNum = 15;
        while (initialNum) {
            this.addRoad();
            initialNum--
        }
        stage.addChild(this.roadStage)

        this.setHitTestElement()
        this.setWalkEle()
        stage.addChild(this.walkElement)

        for (let n in this.roadStage.children) {
            let curX = this.getPointX(
                {
                    rotation: this.roadStage.children[n].rotation,
                    oriPos: this.roadStage.children[n].getGlobalPosition(),
                    y: this.roadStage.children[n].getGlobalPosition().y,
                    r: this.roadStage.children[n].width / 2,
                    type: 'left'
                }
            );

            let endY = this.getEndY(
                {
                    rotation: this.roadStage.children[n].rotation,
                    oriPos: this.roadStage.children[n].getGlobalPosition(),
                    r: this.roadStage.children[n].height,
                }
            )
            let bgGra = new Graphics();
            let bg = bgGra.beginFill('0xff7777').drawRect(0, 0, size(10), size(10)).endFill()
            bg.position.set(0, endY)
            this.stage.addChild(bg);

        }


        this.state = this.play;
        let gameLoop = () => {
            requestAnimationFrame(gameLoop)
            this.state()
            this.renderer.render(this.stage)
        }
        gameLoop()
    }
    getEndY({ rotation, oriPos, r }) {
        return oriPos.y - Math.cos(rotation) * r
    }
    getPointX({ rotation, oriPos, y, r, type }) {
        let x = (y - oriPos.y) / Math.tan(Math.PI - rotation) + oriPos.x;
        if (type == 'left') {
            return x - r / Math.cos(rotation)
        } else if (type == 'right') {
            return x + r / Math.cos(rotation)
        }
    }
    setWalkEle() {
        let { su, wrapSize, size, roadStage } = this;
        let frames = su.filmstrip('./images/assets/timg.jpg', 59, 93)
        let sprite = su.sprite(frames)
        sprite.states = {
            down: 0,
            left: 4,
            right: 8,
            up: 12,
            walkDown: [0, 3],
            walkLeft: [4, 7],
            walkRight: [8, 11],
            walkUp: [12, 15]
        }
        sprite.show(sprite.states.left)
        sprite.scale.set(3, 3)
        sprite.animationSpeed = 0.2;
        sprite.fps = 8
        sprite.position.set(size(wrapSize.x / 2) - 59 * 1.5, size(wrapSize.y / 2) * 1.2)
        sprite.loop = true
        sprite.onComplete = () => {
            console.log(1)
        }
        sprite.vx = 0;
        let left = new Keyboard(37)
        left.press = () => {
            sprite.playAnimation(sprite.states.walkLeft)
            sprite.vx = -1
            sprite.vy = 0

            sprite.cur = 'left';
        }
        left.release = () => {
            if (!right.isDown && sprite.vy == 0) {
                sprite.vx = 0;
                sprite.show(sprite.states.left)

                sprite.cur = null;
            }
        }
        let right = new Keyboard(39)
        right.press = () => {
            sprite.playAnimation(sprite.states.walkRight)
            sprite.vx = 1
            sprite.vy = 0

            sprite.cur = 'right';
        }
        right.release = () => {
            if (!left.isDown && sprite.vy == 0) {
                sprite.vx = 0;
                sprite.show(sprite.states.right)

                sprite.cur = null;
            }
        }

        this.walkElement = sprite
    }
    setHitTestElement() {
        let { hitTestElement, Graphics, stage, size, wrapSize } = this;
        let elGra = new Graphics();
        hitTestElement = elGra.beginFill('0x000000').drawRect(0, 0, size(100), size(100)).endFill()
        hitTestElement.position.set(size(wrapSize.x / 2), size(wrapSize.y) * 2)
        stage.addChild(hitTestElement)
    }
    // 画马路
    drawRoad() {
        let { Sprite, stage, resources, Graphics, size, wrapSize, Container } = this;
        let roadStage = new Container();
        /* 旋转马路背景到以0，0开始绘图 */
        roadStage.width = size(wrapSize.x);
        roadStage.height = size(wrapSize.y / 2);
        roadStage.pivot.set(size(wrapSize.x / 2), 0);/* 设置旋转中心为中间 */
        roadStage.rotation = Math.PI;
        roadStage.position.set(size(wrapSize.x / 2), size(wrapSize.y)); /* 设置渲染点与旋转中心一致 */
        /* 马路背景绘制 */
        // let bgGra = new Graphics();
        // let bg = bgGra.beginFill('0xff7777').drawRect(0, 0, size(wrapSize.x), size(wrapSize.y / 2)).endFill()
        // roadStage.addChild(bg);

        return roadStage
    }
    addRoad() {
        let { Graphics, roadStage, size } = this;
        let { angle, len, position, roadWidth, gap } = this.roadData;
        let road = new Graphics();
        /* 
        * x轴往右偏
        * y轴往下偏，解决多个矩形拼接夹角无法对准
        * 道路宽度
        * 每条道路长度
        */
        road.beginFill('0x0f5ff0').drawRect(size(-100), -roadWidth / 2, roadWidth, len).endFill();
        // road.beginFill('0x0f5ff0').drawRect(size(-100), 0, roadWidth, len).endFill();
        road.rotation = angle
        road.position.set(position.x, position.y)
        roadStage.addChild(road)

        this.roadData.position = this.getPositionFromAngle(position, angle, len)
        this.roadData.angle *= -1
        this.roadData.len = Math.random() * (size(this.wrapSize.x) - size(this.wrapSize.x * 0.4)) + size(this.wrapSize.x * 0.4);

    }
    /* 已知圆心坐标与半径，获取旋转指定角度后的坐标
    * oldPos 圆心坐标
    * angle 旋转弧度
    * len 半径
    */
    getPositionFromAngle(oldPos, angle, r) {
        let a = {
            x: oldPos.x,
            y: oldPos.y + r
        }
        return {
            x: (a.x - oldPos.x) * Math.cos(angle) - (a.y - oldPos.y) * Math.sin(angle) + oldPos.x,
            y: (a.x - oldPos.x) * Math.sin(angle) + (a.y - oldPos.y) * Math.cos(angle) + oldPos.y
        }
    }
}

window.onload = function () {
    new App();
}