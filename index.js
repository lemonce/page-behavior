global.config = require('./config.json');

const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/router');

const app = new Koa();

app.use(bodyparser());
app.use(router.routes());
app.listen(config.server.http.port);