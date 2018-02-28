
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
    renderer = this.autoDetectRenderer(640 * this.radio2, 1008 * this.radio2,
        { antialias: true, transparent: false, resolution: 1 }//抗锯齿，透明，分辨率
    );
    stage = new this.Container();
    group = new this.Container();
    graphics = new this.Graphics();

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
        let { radio2, stage, group, renderer, Sprite, resources, Graphics, Text, loader, Texture } = this;
        this.drawGrapgics()
        this.drawSprite()
        this.drawSriteFromImage()
        animate()
        function animate() {
            requestAnimationFrame(animate)
            renderer.render(stage)
        }
    }
    drawGrapgics() {
        let { radio2, stage, group, renderer, Sprite, resources, Graphics, Text, loader, Texture } = this;

        var graphics = new Graphics();
        graphics.beginFill('0x061639').lineStyle(1 * radio2, '0xffffff', 1).drawRect(50 * radio2, 250 * radio2, 120 * radio2, 120 * radio2).endFill();

        var graphics1 = new Graphics();
        graphics1.beginFill('0xf75555').lineStyle(1 * radio2, '0xffffff', 1).drawRect(100 * radio2, 350 * radio2, 120 * radio2, 120 * radio2).endFill();

        var graphics2 = new Graphics();
        graphics2.beginFill('0x061639').drawEllipse(220 * radio2, 490 * radio2, 70 * radio2, 120 * radio2).endFill();
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

        group.addChild(graphics)
        group.addChild(graphics1)
        group.addChild(graphics2)
        stage.addChild(tri)
        stage.addChild(line)
        stage.addChild(msg)
        group.position.set(200 * radio2, 200 * radio2);
        console.log(graphics.x)//分组位置
        console.log(graphics.getGlobalPosition())//分组位置
        /* 无非load自动加载 */
        stage.addChild(PIXI.Sprite.fromImage('./images/assets/shipin.png'));
        stage.addChild(group)
    }
    drawSprite() {
        let { radio2, stage, group, renderer, Sprite, resources, Graphics, Text, loader, Texture } = this;
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
            imgSprite.position.set(100 * radio2, 600 * radio2);
            console.log(imgSprite.width, imgSprite.height, 'imgSprite')
            imgSprite.scale.set(1, 1);
            imgSprite.width *= radio2;
            imgSprite.height *= radio2;
            // imgSprite.anchor.set(0.5, 0.5);
            imgSprite.rotation = Math.PI / 180 * 30;
            stage.addChild(imgSprite)
        }
    }

}
$(function () {
    new App();
})

