module.exports = {
    name: 'contact-card',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        name: 'Namn Namnsson',
        title: 'Butikschef',
        tableListContext: {
            modifier: 'no-row-spacing',
            items: [
                {
                    heading: 'Telefon:',
                    content: '000 - 12 34 56'
                },
                {
                    heading: 'Email:',
                    content: '<a href="mailto:#">namn.namnsson@jaktia.se</a>'
                }
            ]
        }
    }
}
