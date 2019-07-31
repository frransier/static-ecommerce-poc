module.exports = {
    name: 'event-detail-template',
    status: 'ready',
    preview: '@master--offset',
    context: {
        customClasses: [],
        customAttributes: [],
        heroContext: {
            preHeading: 'Evenemang',
            title: 'Titel på evenemanget',
            showButton: false
        },
        tableListContext: {
            items: [
                {
                    heading: 'Plats:',
                    content: 'Jaktia Ortsnamn'
                },
                {
                    heading: 'Tid:',
                    content: '17:00'
                },
                {
                    heading: 'Datum:',
                    content: '24/2'
                }
            ]
        },
        content: '<p>Det är viktigt att hålla ditt vapen i gott skick med god vapenvård. Om ditt vapen är smutsigt kan precisionen minska och fukt kan skada ditt vapen. Totte Zetterdal är medlem i Jaktia Pro Team och nedan kan du läsa om hur han rengör sitt vapen.</p><p>Välkommen till Jaktia Kållered den 24/2 klockan 17.00. Dessutom kommer vi ha satt ihop ett exklusivt rengöringskit, som säljs till specialpris.</p>',
        gridItemContext: {
            customClasses: ['h-border-bottom', 'h-padding-bottom-sm']
        },
        buttonIconContext: {
            text: 'Extern länk',
            buttonContext: {
                modifier: 'red',
                text: null
            },
            iconContext: {
                modifier: 'xs',
                icon: 'double-chevron'
            }
        },
        shareContext: {},
        cards: {
            additionalModifiers: ['grey', 'full', 'no-padding']
        }
    }
}
