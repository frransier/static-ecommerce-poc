import Vue from 'vue'
import VueGtm from 'vue-gtm'

// Init the vue-gtm package and track the current view.
// If there's a Vue router in use, any navigation using it will be tracked automatically
export const initVueGtm = function (router = null) {
    if (typeof window.site !== 'undefined') {
        const gtmId = typeof window.site.gtmId !== 'undefined' ? window.site.gtmId : ''
        if (gtmId.length) {
            const vueGtmConfig = {
                id: gtmId,
                enabled: true,
                debug: process.env.NODE_ENV === 'development'
            }

            if (router !== null) {
                vueGtmConfig.vueRouter = router
            }

            Vue.use(VueGtm, vueGtmConfig)

            // A bit ugly, but create a component to track the current page on the first load
            const gtmComponent = {
                name: 'GTM',
                created () {
                    const pageType = document.body.dataset.documentType
                    const hasRouter = typeof this.$route !== 'undefined'

                    if (typeof pageType !== 'undefined' || hasRouter) {
                        this.$gtm.trackView(
                            hasRouter ? this.$route.name : pageType,
                            window.location.pathname
                        )
                    }
                }
            }

            if (router !== null) {
                gtmComponent.router = router
            }

            new Vue(gtmComponent) // eslint-disable-line no-new
        }
    }
}
