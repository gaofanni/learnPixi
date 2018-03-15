/**
 * Created by 3046 on 2017/1/9.
 */
/**
 * 基于gulp
 * 1.资源合并 concat
 * 2.css压缩，js压缩混淆  minify-css  uglify
 * 3.sass编译 sass
 * 4.生成md5戳，替换html中的引用  rev rev-format rev-replace
 * 5.自由正则替换  replace
 * 6.plumber 捕获出错
 * 7.顺序执行任务  run-sequence
 * 8.监听文件变动 watch
 * 9.connect 启动一个node服务器来作测试
 * 10.babel  编译ES6 和 ES2017
 * 11.自动给css加兼容性前缀 autoprefixer
 * 12.图片压缩和输出
 */

//在这里配置要编译的项目
// var project = 'app-wap';
var project = '../';

var src = {
    sass: './' + project + '/dev/scss/**/*.scss',
    js: './' + project + '/dev/js/**/*.js',
    views: './' + project + '/dev/*.html',
    images: './' + project + '/dev/images/**/*.{jpg,png,jpeg,json}',
    lib: './' + project + '/dev/lib/**/*.js'
};
var dev = './' + project + '/dev/';
// var dist = './' + project + '/release/';
var dist = '../dist/'
var gulp = require('gulp');

var concat = require('gulp-concat');
var miniCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');

var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var sequence = require('run-sequence');

var base64 = require('gulp-base64');


gulp.task('css', function () {
    gulp.src(src.sass)
        .pipe(plumber())
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass())
        .pipe(base64({
            extensions: ['svg', 'jpg', 'png', /\.jpg#datauri$/i],
            maxImageSize: 12 * 1024, // bytes
            debug: false
        }))
        .pipe(miniCss())
        .pipe(gulp.dest(dist + '/css/'))
        .pipe(connect.reload())
});
gulp.task('js', function () {
    gulp.src(src.js)
        .pipe(plumber())
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/js/'))
        .pipe(connect.reload())
});
gulp.task('image', function () {
    gulp.src(src.images)
        .pipe(gulp.dest(dist + 'images'))
        .pipe(connect.reload());
});
gulp.task('server', function () {
    connect.server({
        livereload: true,
        host: '::',
        root: '../',
        port: 7778,
        middleware: function (connect, opt) {
            return [
                proxy('/apiRedirect', {
                    target: 'http://localhost:4040/',
                    changeOrigin: true
                })
            ]
        }
    });
});

gulp.task('lib', function () {
    gulp.src(src.lib)
        .pipe(gulp.dest(dist + '/lib'))
        .pipe(connect.reload())
});
gulp.task('html', function () {
    gulp.src(src.views)
        .pipe(gulp.dest(dist + '/'))
        .pipe(connect.reload())
});
gulp.task('build', function () {
    sequence('image', 'css', 'js', 'lib', 'html');
});
gulp.task('default', function () {
    gulp.start('server');
    watch([src.images, src.lib, src.sass, src.js, src.views]).on('change', function () {
        gulp.start('build')
    });
});