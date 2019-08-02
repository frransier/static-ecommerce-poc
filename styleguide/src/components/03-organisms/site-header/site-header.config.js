module.exports = {
    name: 'site-header',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        sectionContext: {
            modifier: 'no-y-padding',
            customClasses: ['site-header__section']
        },
        miniCartContext: {
            miniCartContentContext: {}
        },
        icons: {
            menu: {
                buttonIconContext: {
                    buttonContext: {
                        modifier: 'transparent',
                        customClasses: ['site-header__menu-button'],
                        customAttributes: [
                            {
                                attribute: 'data-js',
                                value: 'master-menu-toggle'
                            }
                        ]
                    },
                    iconContext: {
                        icon: 'hamburger'
                    }
                }
            },
            logo: {
                buttonIconContext: {
                    buttonContext: {
                        modifier: 'transparent',
                        customClasses: ['h-padding-y-0', 'site-header__logo-button'],
                        customAttributes: [
                            {
                                attribute: 'data-js',
                                value: 'master-menu-toggle'
                            }
                        ],
                        url: '/'
                    },
                    iconContext: {
                        modifier: 'xl',
                        icon: 'logo'
                    }
                }
            },
            search: {
                buttonIconContext: {
                    buttonContext: {
                        modifier: 'transparent',
                        customClasses: ['h-padding-y-0', 'site-header__search-button'],
                        customAttributes: [
                            {
                                attribute: 'data-js',
                                value: 'master-search-toggle'
                            }
                        ]
                    },
                    iconContext: {
                        icon: 'search'
                    }
                }
            },
            cart: {
                buttonIconContext: {
                    buttonContext: {
                        modifier: 'transparent',
                        customClasses: ['h-padding-y-0', 'site-header__cart-button'],
                        customAttributes: [
                            {
                                attribute: 'data-js',
                                value: 'master-cart-toggle'
                            }
                        ]
                    },
                    iconContext: {
                        icon: 'cart'
                    }
                }
            }
        },
        searchContext: {
            modifier: 'site-header'
        }
    },
    variants: [
        {
            name: 'transparent',
            context: {
                modifier: 'transparent'
            }
        }
    ]
}
