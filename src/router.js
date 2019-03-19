const Router = require('koa-router');
const path = require('path');
const fsp = require('fs').promises;
const fse = require('fs-extra');
const _ = require('lodash');
const { Session, Action } = require('./model');
const utils = require('./utils');

const router = module.exports = new Router({ prefix: '/api' });

router.delete('/session/:code', ctx => {
	const { code } = ctx.params;

	Session.destroy({
		where: {
			code
		}
	});

	Action.destroy({
		where: {
			code
		}
	});

	ctx.status = 200;
});

router.get('/session/:code', async ctx => {
	ctx.body = await Session.findOne({
		where: {
			code: ctx.params.code
		}
	});
});

router.delete('/session', async ctx => {
	Action.truncate();
	fse.emptyDir(path.resolve('data'), );
	Session.truncate();
	ctx.status = 200;
});

router.get('/session', async ctx => {
	ctx.body = await Session.findAll();
});

router.post('/session/:code/action', async ctx => {
	const ip = ctx.headers['client-address'];
	const ua = ctx.headers['user-agent'];
	const { code } = ctx.params;
	const { type, data } = ctx.request.body;
	const { snapshot } = data;
	const time = new Date(snapshot.time);

	const session = await Session.findOrCreate({
		where: { code, ip, ua },
		defaults: {
			code, ip, ua,
			lastVisitTime: time
		}
	});

	session[0].update({ lastVisitTime: time });

	await Action.create({
		code, time, type,
		height: snapshot.clientHeight,
		width: snapshot.clientWidth,
		data: JSON.stringify(_.omit(data, ['snapshot']))
	});
	
	const sessionDataPath = path.resolve('data', code);
	
	await fsp.access(sessionDataPath).catch(() => {
		return fsp.mkdir(sessionDataPath, { recursive: true });
	});

	const recordDir = path.resolve(sessionDataPath, String(snapshot.time));
	
	await fsp.mkdir(recordDir);
	await utils.createRecord(data.snapshot, recordDir, 'root');

	ctx.status = 200;
});

router.get('/session/:code/action', async ctx => {
	const { code } = ctx.params;

	const actionList = await Action.findAll({
		where: {
			code
		},
		attributes: {
			exclude: ['snapshot']
		}
	});

	if (actionList.length === 0) {
		return ctx.status = 404;
	}

	ctx.body = actionList;
});

router.get('/session/:code/snapshot/:time/:pathname', async ctx => {
	const { code, time, pathname } = ctx.params;

	ctx.type = 'text/html';
	ctx.body = await fsp.readFile(path.resolve('data', code, time, pathname));
});