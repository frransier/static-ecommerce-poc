module.exports = {
    name: 'search',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        inputSearchContext: {
            customClasses: ['search__field-input'],
            customAttributes: [
                {
                    attribute: 'tabindex',
                    value: '-1'
                }
            ],
            name: 'searchfield',
            placeholder: 'Sökord'
        },
        searchResultContext: {
            customClasses: [],
            customAttributes: [],
            articles: []
        },
        buttons: {
            search: {
                buttonContext: {
                    modifier: 'red',
                    customClasses: ['search__button'],
                    customAttributes: [
                        {
                            attribute: 'tabindex',
                            value: '-1'
                        }
                    ],
                    text: 'Sök'
                }
            },
            viewResults: {
                buttonIconContext: {
                    text: 'Visa sökresultat',
                    url: '#',
                    buttonContext: {
                        modifier: 'red',
                        additionalModifiers: ['text-center'],
                        customAttributes: [
                            {
                                attribute: 'tabindex',
                                value: '-1'
                            }
                        ]
                    },
                    iconContext: {
                        modifier: 'xs',
                        icon: 'double-chevron'
                    }
                }
            }
        }
    },
    variants: [
        {
            name: 'is-open',
            context: {
                modifier: 'is-open',
                showResult: true
            }
        }
    ]
}
