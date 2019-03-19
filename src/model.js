const debug = require('debug')('behavior:db');
const Sequelize = require('sequelize');
const { db } = config;
const { connection } = db;

const { STRING, DATE, TEXT, INTEGER } = Sequelize;

const sequelize = new Sequelize(connection.database, connection.username, connection.password, {
	host: connection.host,
	port: connection.port,
	dialect: 'mysql',
	pool: {
		max: 150,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	timezone: db.timezone,
	define: {
		freezeTableName: true,
		createdAt: false,
		updatedAt: false,
		charset: 'utf8mb4'
	},
	logging(log) {
		debug(log);
	}
});

exports.Action = sequelize.define('action', {
	code: {
		type: STRING
	},
	time: DATE(6),
	type: STRING,
	data: TEXT,
	height: INTEGER,
	width: INTEGER
});

exports.Session = sequelize.define('session', {
	code: STRING,
	ip: STRING,
	ua: STRING,
	lastVisitTime: DATE
});