module.exports = {
    name: 'filter-option',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        items: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        buttonIconContext: {
            text: 'Varumärke',
            buttonContext: {
                modifier: 'transparent',
                additionalModifiers: ['full-width'],
                customClasses: [
                    'button-icon',
                    'button-icon--text-left',
                    'button-icon--space-between',    
                    'filter-option__button'
                ],
                text: null
            },
            iconContext: {
                modifier: 'xs',
                icon: 'arrow-down'
            }
        },
        listContext: {
            modifier: 'unstyled',
            customClasses: ['filter-option__list']
        }
    },
    variants: [
        {
            name: 'is-open',
            context: {
                buttonIconContext: {
                    buttonContext: {
                        customClasses: [
                            'button-icon',
                            'button-icon--text-left',
                            'button-icon--space-between',    
                            'filter-option__button',
                            'filter-option__button--is-active'
                        ]
                    }
                },
                listContext: {
                    customClasses: ['filter-option__list', 'filter-option__list--is-open']
                }
            }
        }
    ]
}
