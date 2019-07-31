export default {
    config: {
        textAreaElement: document.getElementById('to-copy'),
        shareLinkElement: document.querySelector('[data-copy="copy-link"]')
    },
    init () {
        if (this.config.textAreaElement) {
            // Set content of hidde textarea to current URL
            this.config.textAreaElement.innerText = window.location.href

            // On click, copy text to clipboard
            this.config.shareLinkElement.addEventListener('click', () => {
                this.selectText(this.config.textAreaElement)
                document.execCommand('copy')
            })
        }
    },
    selectText (element) {
        if (navigator.userAgent.match(/ipad|iphone/i)) {
            // iOS is a little bit.. special. This is how we select text for those devices:
            const range = document.createRange()
            range.selectNodeContents(element)

            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)

            element.setSelectionRange(0, 999999)
        } else {
            // If regular device, just select:
            element.select()
        }
    }
}
