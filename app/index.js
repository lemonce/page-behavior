import Vue from 'vue';
import App from './component/App';
import 'bootstrap/dist/css/bootstrap.min.css';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';


import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

App.i18n = new VueI18n({
	locale: 'zh-cn',
	messages: {
		'zh-cn': zh_CN,
		'en-us': en_US
	}
});

const app = new Vue(App);

app.$mount('#app');