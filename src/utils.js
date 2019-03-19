const path = require('path');
const fsp = require('fs').promises;

async function createRecord(snapshot, perfix, nodePath) {
	await fsp.writeFile(path.resolve(perfix, nodePath), snapshot.self);
	snapshot.childNodeList.forEach(async (node, index) => {
		await createRecord(node, perfix, `${nodePath}-${index}`);
	});
}

exports.createRecord = createRecord;