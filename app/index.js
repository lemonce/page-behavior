import app from 'lc-apm';
import Behavior from './component/Behavior.vue';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.router.addRoutes([
	{
		path: '/behavior',
		component: Behavior
	}
]);

app.store.dispatch('menu/addGroup', {
	name: 'page.menu.group.name',
	itemList: [
		{
			label: 'page.behavior',
			path: '/behavior'
		}
	]
});

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'zh';