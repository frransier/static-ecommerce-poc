module.exports = {
    name: 'product-detail-template',
    status: 'ready',
    preview: '@master',
    context: {
        customClasses: [],
        customAttributes: [],
        sections: {
            accessories: {
                header: {
                    h2: 'Tillbehör'
                }
            },
            related: {
                header: {
                    header: {
                        h2: 'Relaterade produkter'
                    }
                },
                products: {
                    modifier: 'no-x-padding-xs',
                    additionalModifiers: ['padding-bottom-xl']
                }
            }
        }
    }
}
