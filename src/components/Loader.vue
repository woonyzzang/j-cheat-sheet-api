<style scoped lang="scss">
.ant-spin {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #b6dbff;
}
</style>

<template>
    <a-spin size="large" tip="Loading..." />
</template>

<script>
import Vue from 'vue';
import { Spin } from 'ant-design-vue';

import 'ant-design-vue/lib/spin/style/index.css';

Vue.use(Spin);

export default {
    name: 'Loader',
    components: {
        'a-spin': Spin
    }
};
</script>
