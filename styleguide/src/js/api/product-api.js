import Axios from 'axios'
import { timestampHelper } from '@/helpers/helpers'

const productAxios = Axios.create({
    baseURL: '/umbraco/api/ProductApi/',
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

export default {
    getProduct (productId = null, pageId = null) {
        return new Promise((resolve, reject) => {
            if (!productId || productId < 1) {
                reject('ID not provided or invalid.') // eslint-disable-line prefer-promise-reject-errors
            }

            productAxios.get(
                `GetProduct?productid=${productId}&pageid=${pageId}&${timestampHelper()}`
            ).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getPartPaymentData (price = 0, pageId = null) {
        return new Promise((resolve, reject) => {
            if (price === 0) {
                reject('Price is not provided.') // eslint-disable-line prefer-promise-reject-errors
            }

            productAxios.get(`CalculateDownpayment?price=${price}&pageid=${pageId}`).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
