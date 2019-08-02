module.exports = {
    name: 'overlay',
    status: 'ready',
    context: {
        additionalModifiers: [],
        customClasses: [],
        customAttributes: [],
        content: 'Some content in overlay'
    },
    variants: [
        {
            name: 'is-visible',
            context: {
                modifier: 'is-visible'
            }
        },
        {
            name: 'low-z-index',
            context: {
                modifier: 'low-z-index'
            }
        },
        {
            name: 'transparent',
            context: {
                modifier: 'transparent'
            }
        },
        {
            name: 'dark',
            context: {
                modifier: 'dark'
            }
        }
    ]
}
