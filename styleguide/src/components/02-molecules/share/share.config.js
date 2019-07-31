module.exports = {
    name: 'share',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        text: 'Dela',
        icons: [
            {
                buttonContext: {
                    modifier: 'is-link',
                    additionalModifiers: ['transparent'],
                    customClasses: ['h-padding-0', 'share__button'],
                    customAttributes: [
                        {
                            attribute: 'data-copy',
                            value: 'copy-link'
                        },
                        {
                            attribute: 'data-js',
                            value: 'toast'
                        },
                        {
                            attribute: 'data-toast-message',
                            value: 'Länk kopierad!'
                        },
                        {
                            attribute: 'data-toast-type',
                            value: 'info'
                        }
                    ]
                },
                iconContext: {
                    modifier: 'sm',
                    icon: 'share-link'
                }
            },
            {
                buttonContext: {
                    modifier: 'is-link',
                    additionalModifiers: ['transparent'],
                    customClasses: ['h-padding-0', 'share__button']
                },
                iconContext: {
                    modifier: 'sm',
                    icon: 'facebook'
                }
            },
            {
                buttonContext: {
                    modifier: 'is-link',
                    additionalModifiers: ['transparent'],
                    customClasses: ['h-padding-0', 'share__button']
                },
                iconContext: {
                    modifier: 'sm',
                    icon: 'twitter'
                }
            }
        ]
    }
}
