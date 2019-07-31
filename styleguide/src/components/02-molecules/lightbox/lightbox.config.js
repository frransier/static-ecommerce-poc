module.exports = {
    name: 'lightbox',
    status: 'ready',
    preview: '@master',
    context: {
        customClasses: [],
        customAttributes: [],
        image: 'https://source.unsplash.com/2000x1250/?hunting',
        buttons: {
            close: {
                buttonIconContext: {
                    buttonContext: {
                        modifier: 'unstyled',
                        additionalModifiers: ['transparent'],
                        customClasses: ['lightbox__close']
                    },
                    iconContext: {
                        icon: 'remove',
                        modifier: 'lg'
                    }
                }
            },
            prev: {
                buttonIconContext: {
                    buttonContext: {
                        modifier: 'unstyled',
                        additionalModifiers: ['transparent'],
                        customClasses: ['lightbox__prev']
                    },
                    iconContext: {
                        icon: 'arrow-left',
                        modifier: 'lg'
                    }
                }
            },
            next: {
                buttonIconContext: {
                    buttonContext: {
                        modifier: 'unstyled',
                        additionalModifiers: ['transparent'],
                        customClasses: ['lightbox__next']
                    },
                    iconContext: {
                        icon: 'arrow-right',
                        modifier: 'lg'
                    }
                }
            }
        }
    },
    variants: [
        {
            name: 'is-open',
            context: {
                modifier: 'is-open'
            }
        }
    ]
}
