import { Notyf } from 'notyf'
import { toastTypes } from './toast-types'

export default {
    config: {
        clickElements: [ ...document.querySelectorAll('[data-js="toast"]') ]
    },
    init () {
        const notyf = new Notyf({ types: toastTypes })

        const clickElements = this.config.clickElements
        if (this.config.clickElements.length) {
            // Add event listner to elements
            clickElements.forEach(element => {
                element.addEventListener('click', () => {
                    notyf.open({
                        type: element.dataset.toastType,
                        message: element.dataset.toastMessage
                    })
                })
            })
        }
    }
}
