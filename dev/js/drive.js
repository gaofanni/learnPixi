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
        let { bump, hitTestElement, roadStage } = this;
        /* 移动马路 */
        roadStage.y += 8;
        if (this.roadStage.children[0].getGlobalPosition().y > this.size(1600)) {
            this.roadStage.removeChild(this.roadStage.children[0])
            this.addRoad()
        }
    }
    load() {
        let { loader } = this;
        loader
            .add('./images/assets/test.json')
            .load(this.setup.bind(this))
    }
    setup() {
        let { Sprite, stage, resources, Graphics, size, wrapSize } = this;
        this.roadStage = this.drawRoad();
        /* 初始化加载 */
        let initialNum = 15;
        while (initialNum) {
            this.addRoad();
            initialNum--
        }
        stage.addChild(this.roadStage)

        this.setHitTestElement()

        this.state = this.play;
        let gameLoop = () => {
            requestAnimationFrame(gameLoop)
            this.state()
            this.renderer.render(this.stage)
        }
        gameLoop()
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