module.exports = {
    productionSourceMap: false, // Chrome의 개발자 도구 > 소스로 이동하면 webpack:// 에서 구성 요소와 전체 코드 노출 안함
    lintOnSave: true,
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    }
};
