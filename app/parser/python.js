const EOL = '\r\n';

const bind = (identifier, value) => `${identifier} = ${value}`;
const click = (identifier, value) => `${identifier}.click()`;
const rightClick = (identifier, value) => `.context_click(${identifier}).perform()`;
const doubleClick = (identifier, value) => `${identifier}.double_click()`;
const input = (identifier, value) => `${identifier}.clear()` + EOL + `${identifier}.send_keys('${value}')`;
const select = (identifier, value) => {};
const check = (identifier, value) => `if ${identifier}.is_selected() == False: ${identifier}.send_keys(Keys.SPACE)`;
const uncheck = (identifier, value) => `if ${identifier}.is_selected(): ${identifier}.send_keys(Keys.SPACE)`;

const browser = { click, rightClick, doubleClick, input, select, check, uncheck };
const actionChains = (driver, type) => type === 'rightClick' ? `ActionChains(${driver})` : '';
const find = (driver, selector) => `${driver}.find_element_by_css_selector('${selector.trim()}')`;
const switchTo = (driver, frame) => `${driver}.switch_to` + (frame === 'top' ? '.default_content()' : `.frame(${frame.trim()})`);

function findAndPerform(driver, elementRelativePath, type, value) {
	const identifier = `${type}_${Math.random().toString(16).slice(2, 12)}`;

	return [bind(identifier, find(driver, elementRelativePath)), actionChains(driver, type) + browser[type](identifier, value)].join(EOL);
}

export default function parserAction(driver, action) {
	const { type, data } = action;
	const { path, value } = data;
	const selectorList = path.split('<');

	const elementRelativePath = selectorList.pop();

	return selectorList.reduceRight((previousPath, currentPath) => switchTo(driver, find(driver, currentPath)) + EOL + previousPath,
		[findAndPerform(driver, elementRelativePath, type, value), (selectorList.length ? switchTo(driver, 'top') + EOL : '')].join(EOL));
}