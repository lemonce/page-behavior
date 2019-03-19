const Router = require('koa-router');
const path = require('path');
const fsp = require('fs').promises;
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
	const { dataValues: session } = await Session.findOne({
		where: {
			code: ctx.params.sessionCode
		}
	});

	ctx.body = session;
});

router.delete('/session', async ctx => {
	Session.truncate();
	ctx.status = 200;
});

router.get('/session', async ctx => {
	const result = {};
	const sessionList = await Session.findAll();

	sessionList.forEach(session => result[session.code] = session);

	ctx.body = result;
});

router.post('/session/:code/action', async ctx => {
	const ip = ctx.headers['client-address'];
	const ua = ctx.headers['user-agent'];
	const { code } = ctx.params;
	const { type, data } = ctx.request.body;
	const { snapshot } = data;
	const time = new Date(Number(snapshot.time));

	const session = await Session.findOrCreate({
		where: { code, ip, ua },
		defaults: {
			code, ip, ua,
			lastVisitTime: time
		}
	});

	session.update({ lastVisitTime: time });

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

	const recordDir = path.resolve(sessionDataPath, time);
	
	await fsp.mkdir(recordDir);
	await utils.createRcord(data.snapshot, recordDir, 'root');

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

	ctx.type = 'html/text';
	ctx.body = await fsp.readFile(path.resolve('data', code, time, pathname));
});