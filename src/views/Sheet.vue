<style scoped lang="scss">
@import '../scss/dependency/variable';
@import '../scss/dependency/mixin';

.item {
    width: unitsConverter(22);
    margin: unitsConverter(.8) unitsConverter(.8);
    border-radius: unitsConverter(.8);

    /*@include media-breakpoint('tablet') {
        width: 100%;
    }*/
}
</style>

<template>
    <div>
        <Loader v-show="loading" />
        <div v-show="!loading" v-masonry transition-duration="0.3s" item-selector=".item" fit-width="true" v-bind:style="{margin:'0 auto'}">
            <div ref="cardItem" v-masonry-tile v-for="(card, index) in cards" v-bind:key="`card-${index}`" class="item">
                <Cardbox v-bind="card" />
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
// import EventBus from '../EventBus';
import { VueMasonryPlugin } from 'vue-masonry'; // [API] https://github.com/shershen08/vue-masonry
import Loader from '@/components/Loader';
import Cardbox from '@/components/Cardbox';

Vue.use(VueMasonryPlugin);

export default {
    name: 'Sheet',
    components: {
        Loader,
        Cardbox
    },
    props: {
        searchMessage: String
    },
    data () {
        return {
            loading: true,
            cards: [],
            cardItemInactiveCounts: []
        };
    },
    watch: {
        '$route': function (to) {
            const param = to.params.name;

            this.loading = true;
            this.fetchDataLoaded(param);
            this.$emit('search-update', ''); // 부모 컴포넌트 v-on 연동 이벤트 트리거 호출, 파라미터값 전달
        },
        searchMessage: function () {
            this.cards.forEach((card) => {
                card.items.forEach((item) => {
                    let inactiveCount = 0;

                    item.list.forEach((list) => {
                        if (list.value.toLowerCase().includes(this.searchMessage.toLowerCase())) {
                            list.inactive = false;

                            inactiveCount++;
                        } else {
                            list.inactive = true;
                        }
                    });

                    // item.inactive = (inactiveCount > 0) ? false : true;
                    item.inactive = (inactiveCount <= 0);
                });
            });
        }
    },
    // created () {
    //     // console.log('created');
    // },
    mounted () {
        const param = this.$route.params.name;

        this.fetchDataLoaded(param);
    },
    methods: {
        /**
         * fetchDateAPI
         * @description 비동기 JSON 데이터 연동
         * @param {String} apiName - API 네이밍 파마리터 값
         * @return {Promise<any>} 프로미스 반환
         */
        fetchDataAPI: (apiName) => {
            return new Promise((resolve, reject) => {
                fetch(`${window.location.origin}/api/${apiName}.json`)
                    .then((res) => {
                        if (res.ok) { return res.json(); }

                        throw new Error('Network response was not ok');
                    })
                    .then((json) => {
                        if (json) { resolve(json); }

                        reject(new Error('Request is failed'));
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            });
        },
        /**
         * fetchDataLoaded
         * @description 비동기 JSON 데이터 로드
         * @param {String} param - API 네이밍 파라미터값
         */
        fetchDataLoaded: function (param) {
            this.fetchDataAPI(param)
                .then((data) => {
                    this.cards = this.setInactiveInject(data);
                    this.loading = false;
                })
                .then(() => {
                    this.setBgCard();

                    if (typeof this.$redrawVueMasonry === 'function') {
                        this.$redrawVueMasonry();
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        /**
         * setInactiveInject
         * @description 비동기 데이터 inactive 프로퍼티 동적 주입
         * @param {JSON} data - JSON 데이터
         * @return {JSON} 가공된 JSON 데이터 반환
         */
        setInactiveInject: (data) => {
            data.cards.forEach((card) => {
                card.items.forEach((item) => {
                    item.inactive = false;

                    item.list.forEach((list) => {
                        list.inactive = false;
                    });
                });
            });

            return data.cards;
        },
        /**
         * setBgCard
         * @description 카드 아이템 배경색 설정
         */
        setBgCard: function () {
            const charCode = window.location.pathname.substr(0).charCodeAt();
            const rgba = [
                'rgba(250, 34, 240, .25)',
                'rgba(214, 18, 22, .25)',
                'rgba(16, 250, 252, .25)',
                'rgba(158, 134, 255, .25)',
                'rgba(60, 254, 20, .25)',
                'rgba(44, 158, 52, .25)',
                'rgba(225, 210, 20, .25)',
                'rgba(70, 266, 14, .25)',
                'rgba(100, 118, 122, .25)',
                'rgba(96, 54, 44, .25)',
                'rgba(204, 22, 230, .25)'
            ];

            this.$refs.cardItem.forEach((elem, index) => {
                const color = (index + charCode) % rgba.length;

                elem.style.cssText = `background-color:${rgba[color]}`;
            });
        }
    }
};
</script>
