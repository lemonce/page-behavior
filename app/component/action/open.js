const WINDOW_FEATURES = 'resizable,scrollbars,status';
const WINDOW_NAME = 'LC_APM_BEHAVIOR_SNAPSHOT';
const VALUE_ATTRIBUTE = 'lc-apm-value';
const CHECKED_ATTRBUTE = 'lc-apm-checked';

function highlight($document, path) {
	const element = $document.querySelector(path);
	let lalalala = true;
	
	setInterval(() => {
		element.style.boxShadow = lalalala ? '' : '0 0 6px 0 red inset';
		element.style.outline = lalalala ? '' : 'red solid 3px';
		
		lalalala = !lalalala;
	}, 500);

	element.scrollIntoViewIfNeeded(true);
}

function setValue($document) {
	const valueElementList = $document.querySelectorAll(`[${VALUE_ATTRIBUTE}]`);
	const checkedElementList = $document.querySelectorAll(`[${CHECKED_ATTRBUTE}]`);

	valueElementList.forEach(element => {
		element.value = element.getAttribute(VALUE_ATTRIBUTE);
	});
	
	checkedElementList.forEach(element => {
		element.checked = element.getAttribute(CHECKED_ATTRBUTE) === 'true';
	});
}

export function openWindow(url, data) {
	const $win = window.open(url, WINDOW_NAME, WINDOW_FEATURES);
	
	function loading() {
		if (data.path) {
			highlight($win.document, data.path);
		}

		setValue($win.document);
	}

	setTimeout(loading, 1000);
	$win.addEventListener('load', loading);
}