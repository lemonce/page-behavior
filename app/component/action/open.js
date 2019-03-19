const WINDOW_FEATURES = 'resizable,scrollbars,status';
const WINDOW_NAME = 'LC_APM_BEHAVIOR_SNAPSHOT';
const VALUE_ATTRIBUTE = 'lc-apm-value';
const CHECKED_ATTRBUTE = 'lc-apm-checked';
const FRAME_TAG_REG = /i?frame/i;

function highlight($document, path) {
	const selectorList = path.split('<');
	let currentDocument = $document;

	while(selectorList.length > 1) {
		const selector = selectorList.shift();
		const elementList = currentDocument.querySelectorAll(selector);

		currentDocument = Array.from(elementList).find(element => {
			return FRAME_TAG_REG.test(element.tagName);
		}).contentDocument;
	}

	const element = currentDocument.querySelector(selectorList[0]);

	let lalalala = true;
	
	setInterval(() => {
		element.style.boxShadow = lalalala ? '' : '0 0 6px 0 blue inset';
		element.style.outline = lalalala ? '' : 'blue solid 3px';
		
		lalalala = !lalalala;
	}, 500);

	element.scrollIntoView();
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
	
	// console.log(valueElementList, checkedElementList, location.href);
	const frameList = $document.querySelectorAll('iframe,frame');
	
	frameList.forEach(frame => {
		const $document = frame.contentWindow.document;
		if ($document === null) {
			setTimeout(() => setValue($document), 50);
		} else {
			setValue($document);
		}
	});
}

export function openWindow(url, data) {
	const $win = window.open(url, WINDOW_NAME, WINDOW_FEATURES);
	
	function loading() {
		setValue($win.document);

		if (data.path) {
			highlight($win.document, data.path);
		}
	}

	setTimeout(loading, 1000);
	$win.addEventListener('load', loading);
}