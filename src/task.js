function cleanData(now, time) {
	fs.readdir('./data', (err, sessionList) => {
		if (!sessionList) {
			return;
		} else {
			sessionList.forEach(session => {
				fs.readdir(path.resolve('./data', session), (err, behaveiorList) => {
					behaveiorList.forEach(behaveior => {
						if (behaveior < now - time) {
							fs.unlink(path.resolve('./data', session, behaveior), err => console.log(err))
						}
					});
				});
			});
		}
	});
}

async function cleanBehavior(now, time) {
	const result = await Behavior.destroy({
		where: {
			time: {
				[Op.lt]: new Date(now - time)
			}
		}
	});
}

setInterval(() => {
	const now = Date.now();
	const time = 2 * HOUR;
	cleanData(now, time);
	cleanBehavior(now, time);
}, 10 * MINUTE);