module.exports = {
    name: 'button-icon',
    status: 'ready',
    context: {
        text: 'Button with icon',
        buttonContext: {
            modifier: '',
            additionalModifiers: [],
            customClasses: ['button-icon'],
            customAttributes: [],
            text: null
        },
        iconContext: {
            modifier: '',
            additionalModifiers: [],
            customClasses: ['button-icon__icon'],
            customAttributes: [],
            icon: 'double-chevron'
        }
    },
    variants: [
        {
            name: 'text-left',
            context: {
                buttonContext: {
                    customClasses: ['button-icon', 'button-icon--text-left']
                }
            }
        },
        {
            name: 'space-between',
            context: {
                buttonContext: {
                    customClasses: ['button-icon', 'button-icon--space-between']
                }
            }
        },
        {
            name: 'is-link',
            context: {
                buttonContext: {
                    customClasses: ['button-icon']
                }
            }
        }
    ]
}
