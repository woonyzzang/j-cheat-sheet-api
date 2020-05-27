<style scoped lang="scss">
@import '../scss/dependency/variable';
@import '../scss/dependency/mixin';

.ant-select {
    min-width: unitsConverter(10);
}
</style>

<template>
    <!--<div>
        <button v-on:click="$i18n.locale='ko'">한국어</button>
        <button v-on:click="$i18n.locale='en'">English</button>
    </div>-->
    <a-select default-value="en" v-on:change="localeChange">
        <a-select-option value="en">en</a-select-option>
        <a-select-option value="ko">ko</a-select-option>
    </a-select>
</template>

<script>
import Vue from 'vue';
import { Select } from 'ant-design-vue';

import 'ant-design-vue/lib/select/style/index.css';

Vue.use(Select);

export default {
    name: 'LocaleSwitcher',
    components: {
        'a-select': Select
    },
    methods: {
        localeChange (locale) {
            if (this.$i18n.locale !== locale) {
                this.$i18n.locale = locale;
            }
        }
    }
};
</script>
