module.exports = {
    name: 'slide',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        spinnerContext: {
            modifier: 'is-own-element',
            additionalModifiers: ['inverted'],
            customClasses: ['slide__spinner']
        },
        heroContext: {
            customClasses: ['slide__hero'],
            backgroundImage: 'https://source.unsplash.com/2053x750/?hunting'
        }
    },
    variants: [
        {
            name: 'is-current',
            context: {
                modifier: 'is-current'
            }
        },
        {
            name: 'is-loading',
            context: {
                modifier: 'is-current',
                spinnerContext: {
                    additionalModifiers: ['is-visible', 'inverted']
                }
            }
        }
    ]
}
