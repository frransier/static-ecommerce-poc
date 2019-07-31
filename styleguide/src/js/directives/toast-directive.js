/*
HOW TO USE

Provide "v-toast" as directive and assign a data property containing the message (the directive updates the message if the property is changed).
The toast type can be defined by providing a modifier (default is "info"), for example v-toast.success.
A static message can also be provided by using the argument static and provide a string (wrap the text with ' or `): v-toast:static="`My static message`"

Example of use cases:
v-toast.error="myDynamicErrorMessageProperty"
v-toast.info:static="`This message is static and is not provided via a data property`"
*/

import { Notyf } from 'notyf'
import { toastTypes } from 'Atoms/toast/toast-types'

const notyf = new Notyf({ types: toastTypes })

let message = ''

export default {
    bind (element, binding) {
        const modifiers = Object.keys(binding.modifiers)
        const type = modifiers.length > 0 ? modifiers[0] : 'info'

        if (binding.arg === 'static') {
            message = binding.expression.slice(1, -1) // Remove first and last characters as it will be ' or ` in order to provide a string to the directive
        } else {
            message = binding.value
        }

        element.addEventListener('click', () => {
            notyf.open({
                type: type,
                message: message
            })
        })
    },
    update (element, binding) {
        message = binding.value
    }
}
