module.exports = {
    name: 'store-listing-template',
    status: 'ready',
    preview: '@master',
    context: {
        customClasses: [],
        customAttributes: [],
        sections: {
            search: {
                header: {
                    h1: 'Jaktias butiker'
                },
                form: {
                    gridItemContext: {
                        customClasses: ['h-flex']
                    }
                }
            },
            listing: {
                header: {
                    h2: 'Alla butiker'
                }
            }
        },
        inputSearchContext: {
            modifier: 'grey',
            customClasses: ['h-flex-grow'],
            placeholder: 'Sök ort eller postnummer'
        },
        buttons: {
            locateClosestStore: {
                text: 'Se närmsta butik',
                buttonContext: {
                    modifier: 'transparent',
                    additionalModifiers: ['underline'],
                    customClasses: ['button-icon', 'h-font-size-xs', 'h-text-transform-none'] // Note: button-icon needs to be added since this overwrites the customClasses property used in Button icon
                },
                iconContext: {
                    icon: 'locator'
                }
            },
            search: {
                modifier: 'red',
                text: 'Sök'
            },
            letterFilter: {
                additionalModifiers: ['transparent'],
                customClasses: ['h-no-y-padding', 'h-padding-x-xxs']
            }
        },
        lists: {
            letterFilter: {
                listTag: 'ul',
                modifier: 'horizontal',
                additionalModifiers: ['unstyled', 'transparent'],
                customClasses: ['h-hide-at-max-lg'],
                letters: [
                    { letter: 'a', hasStores: true },
                    { letter: 'b', hasStores: false },
                    { letter: 'c', hasStores: false },
                    { letter: 'd', hasStores: true },
                    { letter: 'e', hasStores: false },
                    { letter: 'f', hasStores: true },
                    { letter: 'g', hasStores: false },
                    { letter: 'h', hasStores: true },
                    { letter: 'i', hasStores: false },
                    { letter: 'j', hasStores: false },
                    { letter: 'k', hasStores: true },
                    { letter: 'l', hasStores: false },
                    { letter: 'm', hasStores: true },
                    { letter: 'n', hasStores: true },
                    { letter: 'o', hasStores: false },
                    { letter: 'p', hasStores: true },
                    { letter: 'q', hasStores: false },
                    { letter: 'r', hasStores: false },
                    { letter: 's', hasStores: true },
                    { letter: 't', hasStores: false },
                    { letter: 'u', hasStores: true },
                    { letter: 'v', hasStores: false },
                    { letter: 'x', hasStores: false },
                    { letter: 'y', hasStores: true },
                    { letter: 'z', hasStores: false },
                    { letter: 'å', hasStores: true },
                    { letter: 'ä', hasStores: false },
                    { letter: 'ö', hasStores: true }
                ]
            }
        }
    }
}
