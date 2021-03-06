import Vue from 'vue';
import Router from 'vue-router';
import Sheet from './views/Sheet';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL, // `${process.env.BASE_URL}/api-uidev`
    routes: [
        {
            path: '/',
            name: 'root',
            redirect: '/sheet/html4'
        },
        {
            path: '/sheet',
            name: 'sheet',
            redirect: '/sheet/html4'
        },
        {
            path: '/sheet/:name',
            name: 'sheetName',
            component: Sheet
        }
    ]
});
