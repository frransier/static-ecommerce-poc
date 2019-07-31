module.exports = {
    name: 'store-detail-template',
    status: 'ready',
    preview: '@master',
    context: {
        customClasses: [],
        customAttributes: [],
        sections: {
            map: {
                header: {}, // Only needed for Section to generate the header section
                storeDetailHeadingContext: {}
            },
            storeInfo: {
                sectionContext: {
                    modifier: 'full',
                    additionalModifiers: ['grey', 'no-padding']
                }
            },
            openingHours: {
                tableListContext: {
                    items: [
                        {
                            heading: 'Telefon:',
                            content: '000 - 12 34 56'
                        },
                        {
                            heading: 'Email:',
                            content: '<a href="mailto:#">ortnamn@jaktia.se</a>'
                        },
                        {
                            heading: 'Öppettider:',
                            content: 'Vardagar: 10-18<br>Lördag: 10-15<br>Söndag: <span class="h-color-danger">Stängt</span>'
                        },
                        {
                            heading: 'Besöksadress:',
                            content: 'Jaktiavägen 1, Ortsnamn'
                        }
                    ]
                }
            },
            events: {
                eventListContext: {
                    events: [
                        {},
                        {}
                    ]
                }
            },
            storeRelated: {
                eventListContext: {
                    events: [
                        {
                            modifier: 'no-tags',
                            additionalModifiers: ['responsive'],
                            showTags: false
                        },
                        {
                            modifier: 'no-tags',
                            additionalModifiers: ['responsive'],
                            showTags: false
                        }
                    ]
                }
            },
            employees: [
                {},
                {},
                {}
            ]
        }
    }
}
