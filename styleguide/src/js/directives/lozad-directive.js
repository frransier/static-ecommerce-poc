/*
Lazy loading of images in `<img>` elements.

HOW TO USE
For regular image elements:
Provide "v-lozad" as directive and assign a data property containing the image URL.

For background images:
Provide the backgroundImage argument (v-lozad:backgroundImage)

Example of use cases:
v-lozad="/images/myimage.jpg"
v-lozad.backgroundImage="/images/myimage.jpg"
*/

import lozad from 'lozad'

let initLozad = (element, isBackgroundImage, bindingValue) => {
    if (isBackgroundImage) {
        element.style.backgroundImage = bindingValue
    } else {
        element.setAttribute('data-src', bindingValue)
    }

    lozad(element, {
        loaded: (el) => {
            el.onload = () => { el.classList.add('lazy-load--loaded') }
        }
    }).observe()
}

export default {
    bind (element, binding) {
        const isBackgroundImage = binding.arg === 'backgroundImage'

        if (binding.value && binding.value.length) {
            element.setAttribute(isBackgroundImage ? 'data-background-image' : 'data-src', binding.value)

            initLozad(element, isBackgroundImage, binding.value)
        }
    },
    update (element, binding) {
        if (binding.oldValue !== binding.value) {
            const isBackgroundImage = binding.arg === 'backgroundImage'

            if (isBackgroundImage) {
                element.style.backgroundImage = ''
            } else {
                element.removeAttribute('src')
            }

            element.classList.remove('lazy-load--loaded')
            element.dataset.loaded = 'false'

            initLozad(element, isBackgroundImage, binding.value)
        }
    }
}
