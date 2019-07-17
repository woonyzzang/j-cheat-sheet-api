import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './scss/common/_reset.scss';

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

// [Ref]
// http://overapi.com
// http://help.dottoro.com/
