//
// Common JavaScript functions that can be imported and used when needed.
//
// Note: They are (supposed to be) sorted in descending alphabetical order.
//

//
// debounceHelper - Copied from https://github.com/vuejs-tips/tiny-debounce and fixed to apply to our style guide and ES6.
// Author: Mikael Karlsson
//
export function debounceHelper (fn, delay) {
    let timeoutID = null
    return function () {
        clearTimeout(timeoutID)
        let args = arguments
        let that = this
        timeoutID = setTimeout(function () {
            fn.apply(that, args)
        }, delay)
    }
}

//
// timestampHelper - Returns a string with a parameter and the current time as value (for use in Ajax calls).
// Author: Mikael Karlsson
//
// Parameters:
// customParameter: string (opt)
//
export function timestampHelper (customParameter) {
    const time = new Date().getTime()
    return customParameter ? `${customParameter}=${time}` : `timestamp=${time}`
}

//
// toggleHelper - Adds event listeners to element(s) which triggers a toggle of defined css class(es).
// Author: Mikael Karlsson
//
// Parameters:
// toggleElementSelector: string (req)
// targetElementSelector: string (req)
// cssClasses: string or array (req)
//
export function toggleHelper (toggleElementSelector, targetElementSelector, cssClasses) {
    if (toggleElementSelector && targetElementSelector && (cssClasses || cssClasses.length)) {
        const toggleElements = document.querySelectorAll(toggleElementSelector)
        const targetElement = document.querySelector(targetElementSelector)

        if (toggleElements.length && targetElement !== null) {
            // There might be multiple toggle elements, therefore use a loop.
            Array.prototype.forEach.call(toggleElements, element => {
                element.addEventListener('click', () => {
                    if (Array.isArray(cssClasses)) {
                        Array.prototype.forEach.call(cssClasses, cssClass => {
                            targetElement.classList.toggle(cssClass)
                        }, false)
                    } else {
                        targetElement.classList.toggle(cssClasses)
                    }
                }, false)
            })
        }
    }
}

//
// shuffleArray - Shuffles an array
// Author: Mikael Karlsson
// Reference: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
//
// Parameters:
// a: Array (req)
//
export function shuffleArray (a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Holy moly, a corner case when ; is needed! :O
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

//
// getUrlParameter - Gets query parameters by name
// Author: Robert Niklasson
// Reference: https://davidwalsh.name/query-string-javascript
//
// Parameters:
// name: String (req)
//
export function getUrlParameter (name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]') // eslint-disable-line no-useless-escape
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    var results = regex.exec(location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}
