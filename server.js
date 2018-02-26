const koa = require('koa');
const serve = require('koa-static');

const app = new koa();
app.use(serve(__dirname))
    .listen(8880);