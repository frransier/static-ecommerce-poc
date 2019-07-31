module.exports = {
    name: 'scrollable-row',
    status: 'wip',
    context: {
        customClasses: [],
        customAttributes: [],
        buttons: [
            {
                buttonContext: {
                    modifier: 'orange',
                    text: 'Produkter (12)'
                }
            },
            {
                buttonContext: {
                    text: 'Reportage (1)'
                }
            },
            {
                buttonContext: {
                    modifier: 'disabled',
                    text: 'Guider (0)'
                }
            },
            {
                buttonContext: {
                    modifier: 'disabled',
                    text: 'Recension (0)'
                }
            }
        ]
    },          
    variants: [
        {
            name: 'with-gutter',
            context: {
                modifier: 'with-gutter'
            }
        }
    ]
}
