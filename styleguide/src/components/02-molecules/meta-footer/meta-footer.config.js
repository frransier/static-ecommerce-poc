module.exports = {
    name: 'meta-footer',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        tableListContext: {
            customClasses: ['meta-footer__table-list'],
            items: [
                {
                    heading: 'SKRIVET:',
                    content: '2019-02-25'
                },
                {
                    heading: 'SKRIVET AV:',
                    content: 'Jaktia Pro Team'
                },
                {
                    heading: 'FOTO:',
                    content: 'Jaktia Pro Team'
                }
            ]
        },
        shareContext: {
            customClasses: ['meta-footer__share'],
            text: 'Dela reportage'
        }
    }
}
