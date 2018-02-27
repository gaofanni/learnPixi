function start() {
    // return
    var Container = PIXI.Container,
        autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite;
    //初始化

    var radio2 = 10;
    var renderer = autoDetectRenderer(640 * radio2, 1008 * radio2,
        { antialias: false, transparent: false, resolution: window.dpr }//抗锯齿，透明，分辨率
    );
    document.querySelector('#app').appendChild(renderer.view)
    //创建舞台
    var stage = new Container();

    //创建图形
    //分组创建
    var group = new PIXI.Container();
    var graphics = new PIXI.Graphics();
    graphics.beginFill('0x061639').lineStyle(1 * radio2, '0xffffff', 1).drawRect(50 * radio2, 250 * radio2, 120 * radio2, 120 * radio2).endFill();

    var graphics1 = new PIXI.Graphics();
    graphics1.beginFill('0xffffff').lineStyle(1 * radio2, '0xffffff', 1).drawRect(100 * radio2, 350 * radio2, 120 * radio2, 120 * radio2).endFill();

    var graphics2 = new PIXI.Graphics();
    graphics2.beginFill('0x061639').drawEllipse(220 * radio2, 490 * radio2, 70 * radio2, 120 * radio2).endFill();
    // graphics2.beginFill('0x061639').drawEllipse(220 , 490 , 70 , 120 ).endFill();

    //手绘线条
    var line = new PIXI.Graphics();
    // line.lineStyle(1, '0xffffff', 1).moveTo(0, 0).lineTo(360, 600);
    var before = { x: null, y: null };
    var stop = false;
    // document.addEventListener('touchmove', function (e) {
    //     // console.log(e.touches[0].clientX, e.touches[0].clientY)
    //     if (new Date().getTime() - stop > 100) {
    //         before = { x: null, y: null };
    //     }
    //     var x = e.changedTouches[0].pageX;
    //     var y = e.changedTouches[0].pageY;
    //     line.lineStyle(10, '0xffffff', 1).moveTo(before.x ? before.x : (x - 1), before.y ? before.y : (y - 1)).lineTo(x + 1, y + 1);
    //     before = {
    //         x: x,
    //         y: y
    //     };
    //     stop = new Date().getTime();
    // }, false)

    //多边形
    var tri = new PIXI.Graphics();
    tri.beginFill('0xf75555')
    var path = [
        1 * radio2, 1 * radio2,
        100 * radio2, 200 * radio2,
        640 * radio2, 400 * radio2
    ];
    tri.drawPolygon(path)
    tri.endFill()

    //文字
    var msg = new PIXI.Text(
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
    group.position.set(200, 200);
    console.log(graphics.x)//分组位置
    console.log(graphics.getGlobalPosition())//分组位置
    /* 无非load自动加载 */
    // stage.addChild(PIXI.Sprite.fromImage('./assets/shipin.png'));
    stage.addChild(group)

    // 键盘事件
    // class Keyboard {
    //     constructor(keycode) {
    //         this.code = keycode;
    //         this.isDown = false
    //         this.isUp = true;
    //         this.press = undefined
    //         this.release = undefined
    //         this.init()
    //     }
    //     downHandler(e) {
    //         if (e.keyCode == this.code) {
    //             if (this.isUp && this.press) {
    //                 this.press()
    //             }
    //             this.isDown = true;
    //             this.isUp = false
    //         }
    //         e.preventDefault()
    //     }
    //     upHandler(e) {
    //         if (e.keyCode == this.code) {
    //             if (this.isDown && this.release) {
    //                 this.release()
    //             }
    //             this.isDown = false;
    //             this.isUp = true
    //         }
    //         e.preventDefault()
    //     }
    //     init() {
    //         window.addEventListener('keydown', this.downHandler.bind(this), false)
    //         window.addEventListener('keyup', this.upHandler.bind(this), false)
    //     }
    // }
    //精灵
    //加载器
    PIXI.loader
        // .add(['./assets/QQ图片20171226090918.jpg', './assets/box_open.png', './assets/shipin.png'])//加载多张图片
        .add('./assets/test.json')//加载json文件
        // .add('./assets/box_open.png')//加载单张图片
        .on('progress', function (loader, resource) {
            console.log(resource, 'resource')
            console.log(loader, 'resource')
        })
        .load(function () {//加载完成的回调
            var arr = []
            for (var i = 0; i < 1; i++) {
                arr.push(new Sprite(
                    //json文件
                    resources['./assets/test.json'].textures['布-L.png']
                    //单个文件
                    // resources['./assets/分享图尺寸：124_124.jpg'].texture
                ));
            }
            for (var n in arr) {
                arr[n].position.set(n + 10, 0)
                stage.addChild(arr[n])
            }
            setTimeout(function () {
                //截取雪碧图
                // sprite.texture = PIXI.utils.TextureCache['布-L.png'];
                //键盘移动
                // var right = new Keyboard(39);
                // right.press = function () {
                //     sprite.x += 5
                //     sprite.y += 10
                // }
                // right.release = function () {

                // }
                function moving() {
                    requestAnimationFrame(moving)
                    //自动移动
                    for (var n in arr) {
                        if (arr[n].x < window.innerWidth) {
                            arr[n].x += 5
                            arr[n].y += 10
                        } else {
                            arr[n].x = 0
                            arr[n].y = 0
                        }
                    }
                }
                moving()
                // var rectangle = new PIXI.Rectangle(0, 0, 222, 222)
                // texture.frame = rectangle;
                // sprite.texture = texture;
            }, 1000);
        })

    //image对象加载
    var img = new Image();
    img.crossOrigin = "Anonymous";//允许跨域
    img.src = 'http://dlstest.img4399.com/redirect/mm.img4399.com/ot/y2018/game/timetunnel/static/index/img/index-bg_01.dc47459.png';
    img.onload = function () {
        var base = new PIXI.BaseTexture(img);
        var texture = new PIXI.Texture(base)
        var imgSprite = new PIXI.Sprite(texture)
        imgSprite.position.set(0, 400 * radio2);
        console.log(imgSprite.width, imgSprite.height, 'imgSprite')
        imgSprite.scale.set(1, 1);
        imgSprite.width *= radio2;
        imgSprite.height *= radio2;
        // imgSprite.anchor.set(0.5, 0.5);
        imgSprite.rotation = 0.5;
        stage.addChild(imgSprite)
    }

    animate()
    function animate() {
        requestAnimationFrame(animate)
        renderer.render(stage)
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
    radio2 = 10
    renderer = this.autoDetectRenderer(640 * this.radio2, 1008 * this.radio2,
        { antialias: false, transparent: true, resolution: window.dpr }//抗锯齿，透明，分辨率
    );
    stage = new this.Container();
    group = new this.Container();
    graphics = new this.Graphics();

    init() {
        this.mount();
        this.draw();
    }

    mount() {
        document.querySelector('#app').appendChild(this.renderer.view)
    }

    draw() {

        let { radio2, stage,group,renderer,Sprite,resources,Graphics,Text,loader,Texture } = this;

        var graphics = new Graphics();
        graphics.beginFill('0x061639').lineStyle(1 * radio2, '0xffffff', 1).drawRect(50 * radio2, 250 * radio2, 120 * radio2, 120 * radio2).endFill();

        var graphics1 = new Graphics();
        graphics1.beginFill('0xffffff').lineStyle(1 * radio2, '0xffffff', 1).drawRect(100 * radio2, 350 * radio2, 120 * radio2, 120 * radio2).endFill();

        var graphics2 = new Graphics();
        graphics2.beginFill('0x061639').drawEllipse(220 * radio2, 490 * radio2, 70 * radio2, 120 * radio2).endFill();
        // graphics2.beginFill('0x061639').drawEllipse(220 , 490 , 70 , 120 ).endFill();

        //手绘线条
        var line = new Graphics();
        // line.lineStyle(1, '0xffffff', 1).moveTo(0, 0).lineTo(360, 600);
        var before = { x: null, y: null };
        var stop = false;
        // document.addEventListener('touchmove', function (e) {
        //     // console.log(e.touches[0].clientX, e.touches[0].clientY)
        //     if (new Date().getTime() - stop > 100) {
        //         before = { x: null, y: null };
        //     }
        //     var x = e.changedTouches[0].pageX;
        //     var y = e.changedTouches[0].pageY;
        //     line.lineStyle(10, '0xffffff', 1).moveTo(before.x ? before.x : (x - 1), before.y ? before.y : (y - 1)).lineTo(x + 1, y + 1);
        //     before = {
        //         x: x,
        //         y: y
        //     };
        //     stop = new Date().getTime();
        // }, false)

        //多边形
        var tri = new Graphics();
        tri.beginFill('0xf75555')
        var path = [
            1 * radio2, 1 * radio2,
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
        group.position.set(200, 200);
        console.log(graphics.x)//分组位置
        console.log(graphics.getGlobalPosition())//分组位置
        /* 无非load自动加载 */
        // stage.addChild(PIXI.Sprite.fromImage('./assets/shipin.png'));
        stage.addChild(group)

        // 键盘事件
        // class Keyboard {
        //     constructor(keycode) {
        //         this.code = keycode;
        //         this.isDown = false
        //         this.isUp = true;
        //         this.press = undefined
        //         this.release = undefined
        //         this.init()
        //     }
        //     downHandler(e) {
        //         if (e.keyCode == this.code) {
        //             if (this.isUp && this.press) {
        //                 this.press()
        //             }
        //             this.isDown = true;
        //             this.isUp = false
        //         }
        //         e.preventDefault()
        //     }
        //     upHandler(e) {
        //         if (e.keyCode == this.code) {
        //             if (this.isDown && this.release) {
        //                 this.release()
        //             }
        //             this.isDown = false;
        //             this.isUp = true
        //         }
        //         e.preventDefault()
        //     }
        //     init() {
        //         window.addEventListener('keydown', this.downHandler.bind(this), false)
        //         window.addEventListener('keyup', this.upHandler.bind(this), false)
        //     }
        // }
        //精灵
        //加载器
        PIXI.loader
            // .add(['./assets/QQ图片20171226090918.jpg', './assets/box_open.png', './assets/shipin.png'])//加载多张图片
            .add('./assets/test.json')//加载json文件
            // .add('./assets/box_open.png')//加载单张图片
            .on('progress', function (loader, resource) {
                console.log(resource, 'resource')
                console.log(loader, 'resource')
            })
            .load(function () {//加载完成的回调
                var arr = []
                for (var i = 0; i < 1; i++) {
                    arr.push(new Sprite(
                        //json文件
                        resources['../assets/test.json'].textures['布-L.png']
                        //单个文件
                        // resources['./assets/分享图尺寸：124_124.jpg'].texture
                    ));
                }
                for (var n in arr) {
                    arr[n].position.set(n + 10, 0)
                    stage.addChild(arr[n])
                }
                setTimeout(function () {
                    //截取雪碧图
                    // sprite.texture = PIXI.utils.TextureCache['布-L.png'];
                    //键盘移动
                    // var right = new Keyboard(39);
                    // right.press = function () {
                    //     sprite.x += 5
                    //     sprite.y += 10
                    // }
                    // right.release = function () {

                    // }
                    function moving() {
                        requestAnimationFrame(moving)
                        //自动移动
                        for (var n in arr) {
                            if (arr[n].x < window.innerWidth) {
                                arr[n].x += 5
                                arr[n].y += 10
                            } else {
                                arr[n].x = 0
                                arr[n].y = 0
                            }
                        }
                    }
                    moving()
                    // var rectangle = new PIXI.Rectangle(0, 0, 222, 222)
                    // texture.frame = rectangle;
                    // sprite.texture = texture;
                }, 1000);
            })

        //image对象加载
        var img = new Image();
        img.crossOrigin = "Anonymous";//允许跨域
        img.src = 'http://dlstest.img4399.com/redirect/mm.img4399.com/ot/y2018/game/timetunnel/static/index/img/index-bg_01.dc47459.png';
        img.onload = function () {
            var base = new PIXI.BaseTexture(img);
            var texture = new PIXI.Texture(base)
            var imgSprite = new PIXI.Sprite(texture)
            imgSprite.position.set(0, 400 * radio2);
            console.log(imgSprite.width, imgSprite.height, 'imgSprite')
            imgSprite.scale.set(1, 1);
            imgSprite.width *= radio2;
            imgSprite.height *= radio2;
            // imgSprite.anchor.set(0.5, 0.5);
            imgSprite.rotation = 0.5;
            stage.addChild(imgSprite)
        }

        animate()
        function animate() {
            requestAnimationFrame(animate)
            renderer.render(stage)
        }
    }


}
$(function () {
    new App();
})

