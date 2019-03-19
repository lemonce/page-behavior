const path = require('path');
const fsp = require('fs').promises;

async function createRecord(nodeList, perfix, nodePath) {
	nodeList.forEach(async (node, key) => {
		if (key === 'self') {
			const filename = nodePath;

			await fsp.writeFile(path.resolve(perfix, filename), node);
		} else {
			const filename = nodePath + '-' + key;

			createRecord(node, perfix, filename);
		}
	});
}

exports.createRecord = createRecord;