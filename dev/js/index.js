
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
    radio2 = window.innerWidth / 640 * 2;
    bump = new Bump(PIXI);
    su = new SpriteUtilities(PIXI)
    d = new Dust(PIXI)
    renderer = this.autoDetectRenderer(640 * this.radio2, 1008 * this.radio2,
        { antialias: false, transparent: false, resolution: 1 }//抗锯齿，透明，分辨率
    );
    stage = new this.Container();
    group = new this.Container();
    graphics = new this.Graphics();
    size = (num) => {
        return num * this.radio2
    }

    init() {
        console.log(window.dpr, 'dpr');
        console.log(this.radio2, 'radio2');
        this.mount();
        this.draw();
    }

    mount() {
        document.querySelector('#app').appendChild(this.renderer.view)
        /* 缩放至可视宽高 */
        this.renderer.view.style.display = 'block';
        this.renderer.view.style.width = (window.innerWidth) + 'px';
    }
    draw() {
        let { radio2, stage, group, renderer, Sprite, resources, Graphics, Text, loader, Texture, size, d } = this;
        this.drawGrapgics()
        // this.keyframeAnimation()
        // this.drawSprite()
        // this.drawSriteFromImage()
        // this.drawAnimationLine()
        // this.drwaParticles()
        // this.drawTiling()
        animate()
        function animate() {
            requestAnimationFrame(animate)
            d.update()
            renderer.render(stage)
        }
    }
    drawTiling() {
        let { radio2, stage, group, renderer, Sprite, resources, Graphics, Text, loader, Texture, size, d } = this;
        PIXI.loader.add('./images/assets/box_open.png')
            .load(() => {
                //prepare circle texture, that will be our brush
                var brush = new PIXI.Graphics();
                brush.beginFill(0xffffff);
                brush.drawCircle(0, 0, size(50));
                brush.endFill();

                let graphics = new Graphics()
                graphics.beginFill(0xf75555).drawRect(0, 0, size(window.innerWidth), size(window.innerHeight))
                stage.addChild(graphics)


                let texture = PIXI.loader.resources['./images/assets/box_open.png'].texture;
                let tilingSprite = new PIXI.extras.TilingSprite(texture, size(window.innerWidth), size(window.innerHeight))
                tilingSprite.tilePosition.x = size(32);
                tilingSprite.tileScale.x = 1.5;
                stage.addChild(tilingSprite)

                let renderTexture = new PIXI.RenderTexture.create(size(window.innerWidth), size(window.innerHeight))
                let renderTextureSprite = new Sprite(renderTexture)
                stage.addChild(renderTextureSprite)
                tilingSprite.mask = renderTextureSprite


                // brush.position.set(0, 0);
                // renderer.render(brush, renderTexture, false, null, false);

                stage.interactive = true;
                stage.on('pointerdown', pointerDown);
                stage.on('pointerup', pointerUp);
                stage.on('pointermove', pointerMove);

                var dragging = false;

                function pointerMove(event) {
                    if (dragging) {
                        brush.position.copy(event.data.global);
                        /* 复制笔刷给renderTexture */
                        renderer.render(brush, renderTexture, false, null, false);
                    }
                }

                function pointerDown(event) {
                    dragging = true;
                    pointerMove(event);
                }

                function pointerUp(event) {
                    dragging = false;
                }
                // setInterval(() => {
                //     tilingSprite.tilePosition.x -= size(1);
                // }, 100)
            })
    }
    /* 粒子动画 */
    drwaParticles() {
        let { radio2, stage, group, renderer, Sprite, resources, Graphics, Text, loader, Texture, size, d } = this;
        PIXI.loader
            .add('./images/assets/star.jpg')
            .load(() => {
                let starContainer = new PIXI.ParticleContainer()
                stage.addChild(starContainer)
                // d.create(
                //     size(window.innerWidth) / 2,
                //     size(window.innerHeight) / 2,
                //     () => {
                //         return this.su.sprite('./images/assets/star.jpg')
                //     },
                //     starContainer,
                //     50,
                //     0.1,
                //     true,
                //     0, Math.PI * 2,/* 分散角度 */
                //     size(4), size(4),/* 尺寸 */
                //     1, 10,/* 速度 */
                //     1, 1,/* 扩散速度 */
                //     0.005, 0.01,/* 透明速度 */
                //     0.05, 0.1,/* 旋转速度 */
                // )
                let particleStream = d.emitter(
                    100,
                    () => d.create(
                        size(window.innerWidth) / 2,
                        size(window.innerHeight) / 2,
                        () => {
                            return this.su.sprite('./images/assets/star.jpg')
                        },
                        starContainer,
                        50,
                        0,
                        true,
                        0, Math.PI * 2,/* 分散角度 */
                        size(4), size(4),/* 尺寸 */
                        1, 2,/* 速度 */
                        1, 1,/* 扩散速度 */
                        0.005, 0.01,/* 透明速度 */
                        0.05, 0.1,/* 旋转速度 */
                    )
                )
                particleStream.play()
                setTimeout(() => {
                    particleStream.stop()
                }, 1000);
            })
    }
    keyframeAnimation() {
        let { radio2, stage, group, renderer, Sprite, resources, Graphics, Text, loader, Texture, size, su } = this;
        PIXI.loader
            .add('./images/assets/timg.jpg')
            .load(() => {
                // let texture = resources['./images/assets/shipin.png'].texture
                // let sprite = new Sprite(texture)
                // stage.addChild(sprite)

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
                sprite.scale.set(10, 10)
                sprite.animationSpeed = 0.2;
                sprite.fps = 8
                // sprite.gotoAndStop(10);
                sprite.loop = true
                sprite.onComplete = () => {
                    console.log(1)
                }
                stage.addChild(sprite)
                sprite.vx = 0;
                let left = new Keyboard(37)
                left.press = () => {
                    sprite.playAnimation(sprite.states.walkLeft)
                    sprite.vx = -1
                    sprite.vy = 0
                }
                left.release = () => {
                    if (!right.isDown && sprite.vy == 0) {
                        sprite.vx = 0;
                        sprite.show(sprite.states.left)
                    }
                }
                let right = new Keyboard(39)
                right.press = () => {
                    sprite.playAnimation(sprite.states.walkRight)
                    sprite.vx = 1
                    sprite.vy = 0
                }
                right.release = () => {
                    if (!left.isDown && sprite.vy == 0) {
                        sprite.vx = 0;
                        sprite.show(sprite.states.right)
                    }
                }
                let move = () => {
                    requestAnimationFrame(move)
                    sprite.x += sprite.vx
                }
                move()
            })
    }
    drawAnimationLine() {
        /* 两点连线圆形运动 */
        let { radio2, stage, group, renderer, Sprite, resources, Graphics, Text, loader, Texture, size } = this;
        let line = new Graphics;
        stage.addChild(line)
        stage.cacheAsBitmap = true;
        line.angleA = 0;
        line.angleB = 0;
        let state;
        let rotateAroundPoint = (pointX, pointY, distanceX, distanceY, angle) => {
            let point = {}
            point.x = pointX + Math.cos(angle) * distanceX
            point.y = pointY + Math.sin(angle) * distanceY
            return point
        }
        let play = () => {
            line.angleA += size(0.02);
            let rotatingA = rotateAroundPoint(size(164), size(64), size(80), size(20), line.angleA);

            line.angleB -= size(0.03)
            let rotatingB = rotateAroundPoint(size(164), size(208), size(80), size(20), line.angleB);

            line.clear()

            line.lineStyle(size(4), 0xffffff, 1)
                .moveTo(rotatingA.x, rotatingA.y)
                .lineTo(rotatingB.x, rotatingB.y)
        }
        state = play
        let gameLoop = () => {
            requestAnimationFrame(gameLoop)
            state()
            renderer.render(stage)
        }
        gameLoop()
    }
    drawGrapgics() {
        let { radio2, stage, group, renderer, Sprite, resources, Graphics, Text, loader, Texture, size } = this;

        var graphics = new Graphics();
        graphics.beginFill('0x061639').lineStyle(1 * radio2, '0xffffff', 1).drawRect(50 * radio2, 250 * radio2, 120 * radio2, 120 * radio2).endFill();

        var graphics1 = new Graphics();
        graphics1.beginFill('0xf75555').lineStyle(1 * radio2, '0xffffff', 1).drawRect(100 * radio2, 350 * radio2, 120 * radio2, 120 * radio2).endFill();
        graphics1.position.set(size(100), size(100))


        var graphics2 = new Graphics();
        graphics2.beginFill('0x999999').drawEllipse(220 * radio2, 490 * radio2, 70 * radio2, 120 * radio2).endFill();
        graphics2.blendMode = PIXI.BLEND_MODES.SCREEN
        // graphics2.blendMode = PIXI.BLEND_MODES.MULTIPLY
        // graphics2.beginFill('0x061639').drawEllipse(220 , 490 , 70 , 120 ).endFill();

        //手绘线条
        var line = new Graphics();
        var before = { x: null, y: null };
        var stop = false;
        document.addEventListener('touchmove', function (e) {
            if (new Date().getTime() - stop > 100) {
                before = { x: null, y: null };
            }
            var x = e.changedTouches[0].pageX;
            var y = e.changedTouches[0].pageY;
            line.lineStyle(10 * radio2, '0xffffff', 1).moveTo(before.x * radio2 ? before.x * radio2 : (x - 1) * radio2, before.y * radio2 ? before.y * radio2 : (y - 1) * radio2).lineTo((x + 1) * radio2, (y + 1) * radio2);
            before = {
                x: x,
                y: y
            };
            stop = new Date().getTime();
        }, false)

        //多边形
        var tri = new Graphics();
        tri.beginFill('0xf75555')
        var path = [
            0, 0,
            100 * radio2, 200 * radio2,
            640 * radio2, 400 * radio2
        ];
        tri.drawPolygon(path)
        tri.endFill()

        //文字
        var msg = new Text(
            'test',
            { fontFamily: 'Courier', fontSize: 32 * radio2, fill: 'white', dropShadow: true }
        )
        msg.position.set(100 * radio2, 100 * radio2);

        // 二次方程曲线
        let quadline = new Graphics();
        quadline.lineStyle(size(4), 0xffffff, size(1)).moveTo(size(32), size(128)).quadraticCurveTo(size(128), size(20), size(224), size(128));
        /* 平滑处理,定位会改变 */
        let quadTexture = quadline.generateTexture();
        let quadSprite = new Sprite(quadTexture)
        console.log(quadline.position, 'quad')
        group.addChild(quadSprite)

        // 贝塞尔曲线
        let bazierLine = new Graphics();
        bazierLine
            .lineStyle(size(4), 0xffffff, size(1))
            .moveTo(size(32), size(228))
            .bezierCurveTo(size(32), size(50), size(224), size(50), size(224), size(228))
            .tint = 0xf75555;
        /* 一个实例化graphics可以绘制多条曲线 */
        bazierLine
            .lineStyle(size(20), 0xf75555, size(1))
            .moveTo(size(66), size(228))
            .bezierCurveTo(size(66), size(50), size(224), size(50), size(284), size(228));
        group.addChild(bazierLine)



        // 画弧度-基于圆
        let partialCircle = new Graphics();
        partialCircle
            .lineStyle(size(14), 0xffffff, size(1))
            .arc(size(64), size(64), size(200), 0, Math.PI, false)
        group.addChild(partialCircle)

        group.addChild(graphics)
        group.addChild(graphics1)
        group.addChild(graphics2)
        stage.addChild(tri)
        stage.addChild(line)
        stage.addChild(msg)
        group.position.set(200 * radio2, 200 * radio2);
        group.backgroundColor = '0xffffff'
        console.log(graphics.x)//分组位置
        console.log(graphics.getGlobalPosition())//分组位置
        /* 无非load自动加载 */
        stage.addChild(PIXI.Sprite.fromImage('./images/assets/shipin.png'));
        stage.addChild(group)
    }
    drawSprite() {
        let { radio2, stage, group, renderer, Sprite, resources, Graphics, Text, loader, Texture, bump } = this;
        //精灵
        //加载器
        PIXI.loader
            // .add(['./assets/QQ图片20171226090918.jpg', './assets/box_open.png', './assets/shipin.png'])//加载多张图片
            .add('./images/assets/test.json')//加载json文件
            // .add('./assets/box_open.png')//加载单张图片
            .on('progress', function (loader, resource) {
                /* 进度条 */
                console.log(resource, 'progress-resource')
                console.log(loader, 'progress-loader')
            })
            .load(function () {//加载完成的回调
                // Texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
                var arr = []
                for (var i = 0; i < 1; i++) {
                    arr.push(new Sprite(
                        //json文件
                        resources['./images/assets/test.json'].textures['布-r.png']
                        //单个文件
                        // resources['./assets/分享图尺寸：124_124.jpg'].texture
                    ));
                }
                for (var n in arr) {
                    arr[n].position.set((n + 10) * radio2, 0)
                    /* 雪碧图动画初始化数据 */
                    arr[n] = Object.assign(arr[n], {
                        width: arr[n].width * radio2,
                        height: arr[n].height * radio2,
                        accelerationX: 0,/* 加速度 */
                        accelerationY: 0,
                        frictionX: 1,/* 阻力，减速 */
                        frictionY: 1,
                        speed: 0.3,
                        drag: 0.98,
                        vx: 1,
                        vy: 1
                    });
                    arr[n].jiasu = true
                    arr[n].forward = true
                    arr[n].tint = 0xff3300;/* 染色 */
                    stage.addChild(arr[n])
                }
                // setTimeout(function () {
                //     /* 切换图片 */
                //     //截取雪碧图
                //     arr[0].texture = PIXI.utils.TextureCache['布-L.png'];
                //     //键盘移动
                //     var right = new Keyboard(39);
                //     right.press = function () {
                //         arr[0].x += 1
                //         arr[0].y += 1
                //     }
                //     right.release = function () {

                //     }
                // }, 1000);
                /* 图片移动 */
                function spriteMove(el, back) {
                    if (back) {
                        el.vx -= el.accelerationX
                    } else {
                        el.vx += el.accelerationX
                    }
                    el.vx *= el.frictionX
                    el.x += el.vx
                }
                function jiasu(el, back) {
                    el.accelerationX = el.speed
                    el.frictionX = 1
                    spriteMove(el, back)
                }
                function jiansu(el, back) {
                    el.accelerationX = 0
                    el.frictionX = el.drag
                    spriteMove(el, back)
                }
                function play() {
                    /* 摇晃效果+碰撞检测 */
                    for (var n in arr) {
                        if (arr[n].x < (640 * radio2 / 2)) {
                            if (arr[n].forward) {
                                jiasu(arr[n])
                            } else {
                                jiansu(arr[n], true)
                                if (arr[n].x < 0) {
                                    arr[n].forward = true
                                }
                            }
                        } else {
                            if (arr[n].forward) {
                                jiansu(arr[n])
                                if (arr[n].x >= (640 * radio2 - 100)) {
                                    arr[n].forward = false
                                }
                            } else {
                                jiasu(arr[n], true)
                            }
                        }
                    }
                }
                let state;
                state = play;
                function moving() {
                    requestAnimationFrame(moving)
                    //自动移动
                    state()
                }
                moving()
                /* Bump碰撞检测 */
                // let addOne = new Sprite(resources['./images/assets/test.json'].textures['布-L.png']); addOne.position.set(300, 300);
                // stage.addChild(addOne)
                // setInterval(() => {
                //     console.log(bump.hitTestRectangle(addOne, arr[0]))
                // }, 100)
            })


    }
    drawSriteFromImage() {
        let { radio2, stage, group, renderer, Sprite, resources, Graphics, Text, loader, Texture } = this;
        //image对象加载
        var img = new Image();
        img.crossOrigin = "Anonymous";//允许跨域
        img.src = 'http://dlstest.img4399.com/redirect/mm.img4399.com/ot/y2018/game/timetunnel/static/index/img/index-bg_01.dc47459.png';
        img.onload = function () {
            var base = new PIXI.BaseTexture(img);
            var texture = new PIXI.Texture(base)
            var imgSprite = new PIXI.Sprite(texture)
            imgSprite.position.set(0 * radio2, 600 * radio2);
            console.log(imgSprite.width, imgSprite.height, 'imgSprite')
            imgSprite.scale.set(0.5, 0.5);
            imgSprite.width *= radio2;
            imgSprite.height *= radio2;
            // imgSprite.anchor.set(0.5, 0.5);
            imgSprite.pivot.set(imgSprite.width / 2, imgSprite.width / 2);
            imgSprite.rotation = Math.PI / 180 * 45;
            stage.addChild(imgSprite)
        }
    }

}
$(function () {
    new App();
})

