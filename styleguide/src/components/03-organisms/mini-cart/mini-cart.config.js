module.exports = {
    name: 'mini-cart',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        articles: [
            {},
            {},
            {},
            {
                removeArticle: true
            },
            {},
            {},
            {},
            {},
            {},
            {}
        ],
        footer: {
            totalSumText: 'Totalsumma:',
            totalPrice: '10.666:-',
            buttonIconContext: {
                text: 'Till kassan',
                buttonContext: {
                    additionalModifiers: ['red', 'full-width', 'text-center']
                },
                iconContext: {
                    modifier: 'xs',
                    icon: 'double-chevron',
                    srOnlyText: 'Go to the checkout'
                }
            }
        }
    }
}
