module.exports = {
    name: 'content-filter',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        totalsText: '24 evenemang',
        filters: [
            {
                customClasses: ['content-filter__select'],
                name: 'event-type',
                headline: 'Typ av event',
                options: [
                    {
                        value: 'education',
                        text: 'Utbildning',
                        isSelected: true
                    },
                    {
                        value: 'demonstration',
                        text: 'Produktdemo',
                        isSelected: false
                    }
                ]
            },
            {
                customClasses: ['content-filter__select'],
                name: 'location',
                headline: 'Region',
                options: [
                    {
                        value: 'south',
                        text: 'Södra Sverige',
                        isSelected: false
                    },
                    {
                        value: 'north',
                        text: 'Norra Sverige',
                        isSelected: false
                    }
                ]
            }
        ]
    }
}
