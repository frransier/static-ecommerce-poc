module.exports = {
    name: 'site-footer',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        accordions: {
            first: {
                accordionContext: {
                    customClasses: ['site-footer__accordion'],
                    collapsibles: [
                        {
                            title: 'Om oss',
                            content: 'Something'
                        },
                        {
                            title: 'Varumärken',
                            content: 'Something'
                        },
                        {
                            title: 'Kontakt',
                            content: 'Something'
                        }
                    ]
                }
            },
            second: {
                accordionContext: {
                    customClasses: ['site-footer__accordion'],
                    collapsibles: [
                        {
                            title: 'Jaktia-kortet',
                            content: 'Something'
                        },
                        {
                            title: 'Club Jaktia',
                            content: 'Something'
                        },
                        {
                            title: 'Sociala medier',
                            content: 'Something'
                        }
                    ]
                }
            }
        },
        lists: {
            submenu: {
                ulListContext: {
                    modifier: 'unstyled',
                    customClasses: ['h-padding-top-lg'],
                    items: [
                        {
                            listItemContext: {
                                modifier: 'no-padding'
                            },
                            linkText: 'Köp- och leveransvillkor'
                        },
                        {
                            listItemContext: {
                                modifier: 'no-padding'
                            },
                            linkText: 'Garantier'
                        },
                        {
                            listItemContext: {
                                modifier: 'no-padding'
                            },
                            linkText: 'Integritetspolicy'
                        },
                        {
                            listItemContext: {
                                modifier: 'no-padding'
                            },
                            linkText: 'Nyhetsbrev'
                        }
                    ]
                }
            },
            socialMedia: {
                ulListContext: {
                    modifier: 'unstyled',
                    additionalModifiers: ['horizontal'],
                    customClasses: ['site-footer__icon-list'],
                    items: [
                        {
                            listItemContext: {
                                customClasses: ['site-footer__icon-list-item']
                            },
                            text: 'Följ oss:'
                        },
                        {
                            listItemContext: {
                                customClasses: ['site-footer__icon-list-item']
                            },
                            iconContext: {
                                modifier: 'fill',
                                icon: 'youtube-white'
                            }
                        },
                        {
                            listItemContext: {
                                customClasses: ['site-footer__icon-list-item']
                            },
                            iconContext: {
                                modifier: 'fill',
                                icon: 'facebook-white'
                            }
                        },
                        {
                            listItemContext: {
                                customClasses: ['site-footer__icon-list-item']
                            },
                            iconContext: {
                                modifier: 'fill',
                                icon: 'instagram-white'
                            }
                        }
                    ]
                }
            },
            payments: {
                ulListContext: {
                    modifier: 'unstyled',
                    additionalModifiers: ['horizontal'],
                    customClasses: ['site-footer__icon-list'],
                    items: [
                        {
                            listItemContext: {
                                customClasses: ['site-footer__icon-list-item']
                            },
                            iconContext: {
                                modifier: 'fill',
                                additionalModifiers: ['lg'],
                                icon: 'visa'
                            }
                        },
                        {
                            listItemContext: {
                                customClasses: ['site-footer__icon-list-item']
                            },
                            iconContext: {
                                modifier: 'fill',
                                additionalModifiers: ['lg'],
                                icon: 'mastercard'
                            }
                        },
                        {
                            listItemContext: {
                                customClasses: ['site-footer__icon-list-item']
                            },
                            iconContext: {
                                modifier: 'fill',
                                additionalModifiers: ['lg'],
                                icon: 'amex'
                            }
                        },
                        {
                            listItemContext: {
                                customClasses: ['site-footer__icon-list-item']
                            },
                            iconContext: {
                                modifier: 'fill',
                                additionalModifiers: ['xl'],
                                icon: 'https'
                            }
                        }
                    ]
                }
            },
            flags: {
                ulListContext: {
                    modifier: 'unstyled',
                    additionalModifiers: ['horizontal'],
                    customClasses: ['site-footer__icon-list'],
                    items: [
                        {
                            listItemContext: {
                                customClasses: ['site-footer__icon-list-item']
                            },
                            iconContext: {
                                modifier: 'fill',
                                icon: 'flag-se'
                            }
                        },
                        {
                            listItemContext: {
                                customClasses: ['site-footer__icon-list-item']
                            },
                            iconContext: {
                                modifier: 'fill',
                                icon: 'flag-dk'
                            }
                        },
                        {
                            listItemContext: {
                                customClasses: ['site-footer__icon-list-item']
                            },
                            iconContext: {
                                modifier: 'fill',
                                icon: 'flag-no'
                            }
                        }
                    ]
                }
            }
        },
        footerText: '© Copyright | Jaktia 2018 <br />Den här webbplatsen använder cookies|Alla priser gäller så långt lagret räcker och kan inte kombineras med andra erbjudanden|Sortimentet kan variera från butik till butik |Med reservation för eventuella valutaförändringar, avvikelser och tryckfel',
        vatIndicatorContext: {
            vatStatus: true
        }
    }
}
