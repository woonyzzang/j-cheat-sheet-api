<style scoped lang="scss">
@import '../scss/dependency/variable';
@import '../scss/dependency/mixin';

.ant-card {
    background-color: transparent;
}

.ant-card-body {
    > .cont {
        margin-bottom: unitsConverter(1.5);
        word-break: break-all;

        h3 {
            font-size: unitsConverter(1.5);
            color: #f4fcbb;

            /*> .anticon-tags {
                font-size: unitsConverter(1);
            }*/
        }

        a {
            display: block;
            padding: unitsConverter(.2) unitsConverter(.4);
            border-radius: unitsConverter(.2);
            font-size: unitsConverter(1.4);
            color: #fff;

            &:hover {
                background-color: #ccc;
                color: #000;
            }

            &.static {
                cursor: default;
            }
        }

        .inactive {
            $color: #666;
            $cursor: default;

            &,
            a {
                color: $color;
                cursor: $cursor;
            }
        }
    }
}
</style>

<template>
    <a-card :bordered="false" v-bind:title="title" class="cardbox" :headStyle="{borderBottomColor: 'rgba(255,255,255,.45)'}" :bodyStyle="{padding: '10px'}">
        <div v-for="(item, index) in items" class="cont" v-bind:key="`item-${index}`">
            <h3 v-bind:class="{inactive: item.inactive}"><!-- a-icon type="tags" theme="twoTone" twoToneColor="#f4fcbb" /--> {{item.subject}}</h3>
            <ul>
                <li v-for="(list, index) in item.list" v-bind:key="`list-${index}`" v-bind:class="{inactive: list.inactive}">
                    <!-- {{$t('message')}} -->
                    <!-- {{title}} | {{item.subject}} | {{list.value}} -->
                    <!--<a-tooltip placement="topLeft" arrowPointAtCenter v-bind:title="list.tooltlp">-->
                    <a-tooltip placement="topLeft" arrowPointAtCenter v-bind:title="$t(`${title}.${item.subject}.${(list.exceptionValue) ? list.exceptionValue : list.value}`)">
                        <a
                            v-bind:href="(!list.inactive) ? list.link : null"
                            v-bind:rel="(list.link) ? 'noopener' : null"
                            v-bind:target="(list.link) ? '_blank' : null"
                            v-bind:class="{static: !list.link}"
                        >
                            {{list.value}}
                        </a>
                    </a-tooltip>
                </li>
            </ul>
        </div>
    </a-card>
</template>

<script>
// import EventBus from '../EventBus';
import Vue from 'vue';
import VueTypes from 'vue-types';
import { Card, Icon, Tooltip } from 'ant-design-vue';

import 'ant-design-vue/lib/card/style/index.css';
import 'ant-design-vue/lib/tooltip/style/index.css';

Vue.use(Card);
Vue.use(Icon);
Vue.use(Tooltip);

export default {
    name: 'Cardbox',
    components: {
        'a-card': Card,
        'a-tooltip': Tooltip
    },
    props: {
        title: VueTypes.string,
        subject: VueTypes.string,
        items: VueTypes.array
    }
};
</script>
