import Vue from 'vue';
import App from './App.vue';
import i18n from './i18n';
import router from './router';

import './scss/common/_reset.scss';

Vue.config.productionTip = false;

new Vue({
    i18n,
    router,
    render: h => h(App)
}).$mount('#app');

// [Ref]
// http://overapi.com
// http://help.dottoro.com/
