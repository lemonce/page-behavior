const END_OF_LINE = '\r\n';

function find(driver, selector) {
	return `${driver}.find_element_by_css_selector('${selector.trim()}')`;
}

function findElement(driver, elementRelativePath, type, value) {
	const identifier = `${type}_${Math.random().toString(16).slice(2, 12)}`;

	return `${identifier} = ${find(driver, elementRelativePath)}` +
	END_OF_LINE +
	getOperator[type](value, identifier, driver);
}

function switchTo(driver, frame) {
	return `${driver}.switch_to` + (frame === 'top' ?
		'.default_content()' :
		`.frame(${frame.trim()})`);
}

const getOperator = {
	click(value, identifier, driver) {
		return `${identifier}.click()`;
	},
	rightClick(value, identifier, driver) {
		return `ActionChains(${driver}).context_click(${identifier}).perform()`;
	},
	doubleClick(value, identifier, driver) {
		return `${identifier}.double_click()`;
	},
	input(value, identifier, driver) {
		return `${identifier}.send_keys(${value})`;
	},
	select(value, identifier, driver) {
		
	},
	check(value, identifier, driver) {
		return `${identifier}.send_keys(Keys.SPACE)`;
	},
	uncheck(value, identifier, driver) {
		return `${identifier}.send_keys(Keys.SPACE)`;
	}
};

export default function parserAction(driver, action) {
	const { type, data } = action;
	if (type === 'enter') {
		return '';
	}

	const { path, value } = data;
	const selectorList = path.split('<');

	const elementRelativePath = selectorList.pop();

	return selectorList.reduceRight(
		(previousPath, currentPath) => {
			const result = switchTo(driver, find(driver, currentPath)) + END_OF_LINE + previousPath;
			return result;
		},
		findElement(driver, elementRelativePath, type, value) +
		END_OF_LINE +
		(selectorList.length ? switchTo(driver, 'top') : '') +
		END_OF_LINE
	);
}