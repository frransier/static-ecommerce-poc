const bundleListContext = {
    customClasses: ['product-detail__bundle-list'],
    items: [
        {
            term: '1st 100024',
            value: '<a href="#">Shimano Tranx 301A</a>'
        },
        {
            term: '1st 210359',
            value: '<a href="#">Lexa HD 300Hl Ltd 6,3:1 Left</a>'
        },
        {
            term: '1st 210906',
            value: '<a href="#">Spöserie Daiwa Prorex Ags Spinn/Haspel Ex. 8" 10-30g</a>'
        },
        {
            term: '1st 50806',
            value: '<a href="#">Savage Gear Pro Tele Folding Rubber XL 50806</a>'
        }
    ]
}

module.exports = {
    name: 'product-detail',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        lightboxContext: {
            // modifier: 'is-open'
        },
        gridItemContext: {
            customClasses: ['product-detail__grid-item']
        },
        descriptionText: `<p>Woodline Dogkeeper Väst är en specialutrustad hundförarväst. Den rena orangea signalfärgen syns tydligt i terrängen.</p>
                          <p>Västen bygger på ett slitstarkt canvasliknande tyg som är laminerat med M-Tec-membran. Västen är något längre än standard och utrustad med separata GPS-hållare på båda sidor, radiofickor och stora frontala bälgfickor. Genomgående ryggficka som öppnas med vertikala dragkedjor ger ytterligare förvaringsplats vid behov.</p>
                          <p>Västen är fodrad med ett tunt nätfoder som motverkar kondensbildning mot kroppen. Medföljande bälte har bl a fäste för hunduppkoppling.</p>
                          <p>För bästa säkerhet är västen försedd med diskreta reflexdetaljer bak och fram.</p>`,
        brandText: '<p>For us at Woodline, it’s clear that respect for nature is a fundamental aspect of Swedish hunting tradition; part of our core values that have been handed down from generation to generation.</p>',
        brandItemContext: {
            additionalModifiers: ['background-white', 'inline']
        },
        productNameContext: {
            showMeta: true
        },
        productPriceContext: {
            clubJaktia: {
                modifier: 'big',
                isClubPrice: true,
                discountedPrice: 625,
                regularPrice: null
            },
            regular: {
                modifier: 'big'
            }
        },
        labelContext: {
            select: {
                text: 'Välj färg',
                isRequired: false,
                for: 'variant-select'
            },
            radio: {
                text: 'Välj storlek',
                isRequired: false,
                for: 'size-select'
            }
        },
        selectContext: {
            modifier: 'select',
            additionalModifiers: ['grey'],
            id: 'variant-select',
            name: 'variant-select'
        },
        buttons: {
            buyButton: {
                text: 'Lägg till i varukorgen',
                buttonContext: {
                    customClasses: ['button-icon', 'h-flex-justify-center'],
                    additionalModifiers: ['red', 'full-width']
                },
                iconContext: {
                    modifier: 'xs'
                }
            },
            locateClosestStore: {
                text: 'Se lager i närmsta butik',
                buttonContext: {
                    modifier: 'transparent',
                    additionalModifiers: ['underline'],
                    customClasses: ['button-icon', 'h-font-size-xs', 'h-text-transform-none', 'h-padding-left-0', 'h-padding-top-xxs', 'h-font-weight-400'] // Note: button-icon needs to be added since this overwrites the customClasses property used in Button icon
                },
                iconContext: {
                    modifier: 'sm',
                    icon: 'locator'
                }
            }
        }
    },
    variants: [
        {
            name: 'wide',
            context: {
                sections: {
                    productImages: {
                        modifier: 'full',
                        additionalModifiers: ['no-x-padding', 'no-bottom-padding'],
                        customClasses: ['h-border-bottom']
                    }
                }
            }
        },
        {
            name: 'Product bundle default',
            context: {
                productBundle: {
                    isProductBundle: true,
                    heading: 'Inkluderade produkter',
                    descListContext: bundleListContext // defined in variable above
                },
                productPriceContext: {
                    clubJaktia: {
                        customClasses: ['h-margin-0']
                    },
                    regular: {
                        customClasses: ['h-margin-0']
                    }
                }
            }
        },
        {
            name: 'product-bundle-wide',
            context: {
                sections: {
                    productImages: {
                        modifier: 'full',
                        additionalModifiers: ['no-x-padding', 'no-bottom-padding'],
                        customClasses: ['h-border-bottom']
                    }
                },
                productBundle: {
                    isProductBundle: true,
                    heading: 'Inkluderade produkter',
                    descListContext: bundleListContext // defined in variable above
                },
                productPriceContext: {
                    clubJaktia: {
                        customClasses: ['h-margin-0']
                    },
                    regular: {
                        customClasses: ['h-margin-0']
                    }
                }
            }
        }
    ]
}
