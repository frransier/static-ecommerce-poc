// Vue core stuff, plugins etc
import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from '@/tools/routing/router-config'
import { productListingPageRoutes, productDetailPageRoutes, searchResultPageRoutes } from '@/tools/routing/routes'
import dictionaryPlugin from '@/tools/dictionaryPlugin'
import pagesPlugin from '@/tools/pagesPlugin'
import lozadDirective from '@/directives/lozad-directive'
import toastDirective from '@/directives/toast-directive'
import vClickOutside from 'v-click-outside'
import { initVueGtm } from './tools/init-vue-gtm'

// Vue SFC components
import Search from '@/components/search/Search'
import SearchResultPage from '@/components/search/SearchResultPage'
import ImageSlider from '@/components/image-slider/ImageSlider'
import StoreFinder from '@/components/store-finder/StoreFinder'
import ProductListingPage from '@/components/product/ProductListingPage'
import ProductDetailPage from '@/components/product/ProductDetailPage'
import Presentkort from '@/components/Presentkort'

// Vanilla JS components
import LazyLoad from '../components/08-other/lazy-load/lazy-load'
import Master from 'PageLayouts/master/master'
import MainMenu from 'Organisms/main-menu/main-menu'
import Collapsible from 'Molecules/collapsible/collapsible'
import SiteHeader from 'Organisms/site-header/site-header'
import Toast from 'Atoms/toast/toast'
import Share from 'Molecules/share/share'
import HeroVideo from 'Molecules/hero/hero-video'

// Tools
import RememberScroll from '@/tools/remember-scroll'

//
// Vue core stuff and components
//

Vue.use(VueRouter)
Vue.use(dictionaryPlugin)
Vue.use(pagesPlugin)
Vue.directive('lozad', lozadDirective)
Vue.directive('toast', toastDirective)
Vue.use(vClickOutside)

let router = null // Will be populated with a router object if needed

// Wrap the initization in a promise as it takes some milliseconds to finalize and other functionality are dependent on the components to be in place
const initVueComponents = () => {
    return new Promise(resolve => {
        const searchElement = document.querySelector('[data-js="search"]')
        if (searchElement) {
            new Vue({ // eslint-disable-line no-new
                el: searchElement,
                name: 'SearchContainer',
                components: { Search },
                template: '<Search />'
            })
        }

        const searchResultPageElement = document.querySelector('[data-js="search-result-page"]')
        if (searchResultPageElement) {
            routerConfig.routes = searchResultPageRoutes
            router = new VueRouter(routerConfig)

            new Vue({ // eslint-disable-line no-new
                el: searchResultPageElement,
                name: 'SearchResultPageContainer',
                components: { SearchResultPage },
                router,
                template: '<router-view />'
            })
        }

        const imageSliderElements = [ ...document.querySelectorAll('[data-js="image-slider"]') ]
        if (imageSliderElements.length) {
            imageSliderElements.forEach(imageSlider => {
                const slides = typeof imageSlider.dataset.jsSlides !== 'undefined' ? JSON.parse(imageSlider.dataset.jsSlides) : []

                if (slides.length) {
                    const imageSliderTemplate = `<ImageSlider :slides="slides" />`

                    new Vue({ // eslint-disable-line no-new
                        el: imageSlider,
                        name: 'ImageSliderContainer',
                        components: { ImageSlider },
                        data () {
                            return {
                                slides: slides
                            }
                        },
                        template: imageSliderTemplate
                    })
                }
            })
        }

        const productListingPageElement = document.querySelector('[data-js="product-listing-page"]')
        if (productListingPageElement) {
            routerConfig.routes = productListingPageRoutes
            router = new VueRouter(routerConfig)

            new Vue({ // eslint-disable-line no-new
                el: productListingPageElement,
                name: 'ProductListingPageContainer',
                components: { ProductListingPage },
                router,
                template: '<router-view />'
            })
        }

        const productDetailPageElement = document.querySelector('[data-js="product-detail-page"]')
        if (productDetailPageElement) {
            routerConfig.routes = productDetailPageRoutes
            router = new VueRouter(routerConfig)

            new Vue({ // eslint-disable-line no-new
                el: productDetailPageElement,
                name: 'ProductDetailPageContainer',
                components: { ProductDetailPage },
                router,
                template: '<router-view />'
            })
        }

        const storeFinderElement = document.querySelector('[data-js="store-finder"]')
        if (storeFinderElement) {
            new Vue({ // eslint-disable-line no-new
                el: storeFinderElement,
                name: 'StoreFinderContainer',
                components: { StoreFinder },
                template: '<StoreFinder />'
            })
        }

        const presentkortElements = [ ...document.querySelectorAll('[data-js="presentkort"]') ]
        presentkortElements.forEach(element => {
            new Vue({ // eslint-disable-line no-new
                el: element,
                name: 'PresentkortContainer',
                components: {
                    Presentkort
                },
                template: '<Presentkort />'
            })
        })

        resolve()
    })
}

// Init the Vue components and call any functionality after
initVueComponents().then(() => {
    initVueGtm(router)
})

//
// Init vanilla JS components
//

LazyLoad.init()
Master.init()
MainMenu.init()
Collapsible.init()
SiteHeader.init()
RememberScroll.init()
Toast.init()
Share.init()
HeroVideo.init()

// Do not remove or modify this, it's for the hot reloading!
if (module.hot) {
    module.hot.accept()
}
