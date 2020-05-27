<style scoped lang="scss">
@import './scss/dependency/variable';
@import './scss/dependency/mixin';

.ant-layout {
    /*min-width: 1400px;*/
    /*background: #30343d url('assets/bg_pattern.jpg');*/
    background-color: transparent;
}

.ant-layout-header {
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 1;
    width: 100%;
    padding: 0 unitsConverter(4);

    > h1 {
        margin-right: unitsConverter(2.4);

        > a {
            font-weight: bold;
            font-size: unitsConverter(1.8);
            color: #fff;
            vertical-align: top;
            white-space: nowrap;
        }
    }

    .ant-menu {
        line-height: unitsConverter(6.4);
    }

    .util {
        display: flex;
        margin-left: auto;

        .ant-select {
            vertical-align: top;
        }

        .ant-input-search {
            width: auto;
            margin-left: unitsConverter(1);
            vertical-align: top;
        }
    }
}

.ant-layout-content {
    margin-top: unitsConverter(6.4);
    padding: 0 unitsConverter(5);

    > main {
        min-height: unitsConverter(38);
        padding: unitsConverter(2.5);
    }
}
</style>

<template>
    <a-layout>
        <a-layout-header>
            <h1><router-link to="/" exact>J Cheat Sheet API</router-link></h1>
            <a-menu theme="dark" mode="horizontal" :defaultSelectedKeys="['html4']" v-model="selectedkey">
                <a-menu-item key="html4"><router-link v-bind:to="'/sheet/html4'">HTML4.01</router-link></a-menu-item>
                <a-menu-item key="html5"><router-link v-bind:to="'/sheet/html5'">HTML5</router-link></a-menu-item>
                <a-menu-item key="css"><router-link v-bind:to="'/sheet/css'">CSS</router-link></a-menu-item>
                <a-menu-item key="scss"><router-link v-bind:to="'/sheet/scss'">SCSS</router-link></a-menu-item>
                <a-menu-item key="less"><router-link v-bind:to="'/sheet/less'">LESS</router-link></a-menu-item>
                <a-menu-item key="html-dom"><router-link v-bind:to="'/sheet/html-dom'">DOM</router-link></a-menu-item>
                <a-menu-item key="svg"><router-link v-bind:to="'/sheet/svg'">SVG</router-link></a-menu-item>
                <a-menu-item key="javascript"><router-link v-bind:to="'/sheet/javascript'">JavaScript</router-link></a-menu-item>
                <a-menu-item key="jquery"><router-link v-bind:to="'/sheet/jquery'">jQuery</router-link></a-menu-item>
                <a-menu-item key="lodash"><router-link v-bind:to="'/sheet/lodash'">Lodash</router-link></a-menu-item>
                <a-menu-item key="upl-core"><router-link v-bind:to="'/sheet/upl-core'">UPLEAT Core</router-link></a-menu-item>
            </a-menu>
            <div class="util">
                <LocaleSwitcher />
                <a-input-search type="search" size="large" placeholder="Search..." title="Input Search Text" v-model.trim="srchValue" />
            </div>
        </a-layout-header>
        <a-layout-content>
            <main>
                <router-view v-bind:search-message="srchValue" v-on:search-update="searchUpdate" />
            </main>
        </a-layout-content>
    </a-layout>
</template>

<script>
import Vue from 'vue';
// import EventBus from 'EventBus';
import { Layout, Menu, Input } from 'ant-design-vue'; // [API] https://vue.ant.design
import LocaleSwitcher from '@/components/LocaleSwitcher';

import 'ant-design-vue/lib/layout/style/index.css';
import 'ant-design-vue/lib/menu/style/index.css';
import 'ant-design-vue/lib/input/style/index.css';

Vue.use(Layout);
Vue.use(Menu);
Vue.use(Input);

export default {
    name: 'App',
    components: {
        'a-layout': Layout,
        'a-layout-header': Layout.Header,
        'a-layout-content': Layout.Content,
        'a-menu-item': Menu.Item,
        'a-input-search': Input.Search,
        LocaleSwitcher
    },
    data () {
        return {
            selectedkey: ['html4'],
            srchValue: ''
        };
    },
    watch: {
        $route: function (to) {
            this.selectedkey = [to.params.name];
        }
    },
    mounted () {
        this.selectedkey = [this.$route.params.name];
    },
    methods: {
        /**
         * searchUpdate
         * @description 검색 입력창 업데이트
         * @param {String} val - 검색어
         */
        searchUpdate: function (val) {
            this.srchValue = val;
        }
    }
};
</script>
