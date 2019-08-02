module.exports = {
    name: 'master',
    status: 'ready',
    preview: null,
    context: {
        customClasses: [],
        customAttributes: [],
        aside: {
            toggleButtons: {
                menu: {
                    buttonIconContext: {
                        text: null,
                        buttonContext: {
                            modifier: 'transparent',
                            text: '',
                            customClasses: ['h-padding-0'],
                            customAttributes: [
                                {
                                    attribute: 'data-js',
                                    value: 'master-menu-toggle'
                                }
                            ]
                        },
                        iconContext: {
                            icon: 'remove',
                            srOnlyText: 'Close menu'
                        }
                    }
                },
                cart: {
                    buttonIconContext: {
                        text: null,
                        buttonContext: {
                            modifier: 'transparent',
                            customClasses: ['h-padding-0'],
                            customAttributes: [
                                {
                                    attribute: 'data-js',
                                    value: 'master-cart-toggle'
                                }
                            ]
                        },
                        iconContext: {
                            icon: 'remove',
                            srOnlyText: 'Close mini cart'
                        }
                    }
                }
            }
        },
        overlayContext: {
            modifier: 'dark',
            customClasses: ['master__overlay']
        }
    },
    variants: [
        {
            name: 'menu-is-visible',
            context: {
                modifier: 'menu-is-visible',
                isOffset: false,
                siteHeaderContext: {
                    modifier: 'transparent'
                }
            }
        },
        {
            name: 'offset',
            context: {
                isOffset: true,
                siteHeaderContext: {
                    modifier: 'transparent'
                }
            }
        }
    ]
}
