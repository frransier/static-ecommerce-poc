import Axios from 'axios'
import { timestampHelper } from '@/helpers/helpers'

const searchAxios = Axios.create({
    baseURL: '/umbraco/Api/SearchApi/',
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

export default {
    getProductsInPage (pageId = 0, urlStructure = '', pageNumber = 1, filters = [], sortKey = '', useAscendingSortOrder = true) {
        if (pageId > 0) {
            return searchAxios.post('GetProducts', {
                pageId,
                urlStructure,
                pageNumber,
                filters,
                sortOption: sortKey,
                ascendingSort: useAscendingSortOrder
            })
        }
    },
    doQuickSearch (query, pageId = 0, searchForProducts = true) {
        return new Promise((resolve, reject) => {
            if (pageId === 0) {
                reject('No pageId provided to doQuickSearch function in search API.') // eslint-disable-line prefer-promise-reject-errors
            }

            const searchEndpoint = searchForProducts ? 'GetProducts' : 'UmbracoSearch'
            const pageSize = searchForProducts ? 3 : 2

            searchAxios.get(
                `${searchEndpoint}?searchAsYouType=true&query=${query}&pageId=${pageId}&pageSize=${pageSize}&${timestampHelper()}`
            ).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    doFullProductSearch (pageId = 0, query, pageNumber = 1, filters = [], sortKey = '', useAscendingSortOrder = true) {
        return new Promise((resolve, reject) => {
            if (pageId === 0) {
                reject('No pageId provided to doFullProductSearch function in search API.') // eslint-disable-line prefer-promise-reject-errors
            }

            searchAxios.post('GetProducts', {
                pageId,
                query,
                urlStructure: '',
                pageNumber,
                filters,
                sortOption: sortKey,
                ascendingSort: useAscendingSortOrder
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    doFullContentSearch (pageId = 0, query = '', pageNumber = 1) {
        return new Promise((resolve, reject) => {
            if (query.length === 0) {
                reject('No search query provided to doFullContentSearch function in search API.') // eslint-disable-line prefer-promise-reject-errors
            }

            searchAxios.get(
                `UmbracoSearch?searchAsYouType=false&query=${query}&pageNumber=${pageNumber}&pageId=${pageId}&${timestampHelper()}`
            ).then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
