import Axios from 'axios'

const dictionaryAxios = Axios.create({
    baseURL: '/umbraco/surface/SiteSurface/',
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

const dictionaries = typeof window.site !== 'undefined' ? window.site.dictionaries : window.site

export default {
    install (Vue, options) {
        Vue.mixin({
            methods: {
                $getDictionaryValue (dictionaryKey = null, fallbackValue = '') {
                    if (dictionaryKey !== null && typeof dictionaries !== 'undefined') {
                        const dictionaryItem = Object.keys(dictionaries).find(key => key.toLowerCase() === dictionaryKey.toLowerCase())
                        if (typeof dictionaryItem !== 'undefined') {
                            return dictionaries[dictionaryItem]
                        } else {
                            // Do API call to create the key if fallbackValue is provided and return fallbackValue
                            if (fallbackValue.length > 0) {
                                dictionaryAxios.post('AddDictionaryItem', {
                                    key: dictionaryKey,
                                    fallback: fallbackValue
                                })
                            }
                            return fallbackValue
                        }
                    } else {
                        return fallbackValue
                    }
                }
            }
        })
    }
}
