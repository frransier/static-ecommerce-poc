module.exports = {
    name: 'list',
    default: 'ul',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        listTag: 'ul',
        subListTag: 'ul',
        items: [
            {
                listItemContext: {
                    modifier: '',
                    content: 'One'
                },
                sublistItems: []
            },
            {
                listItemContext: {
                    modifier: '',
                    content: 'Two'
                },
                sublistItems: []
            },
            {
                listItemContext: {
                    modifier: '',
                    content: 'Three'
                },
                sublistItems: [
                    {
                        listItemContext: {
                            content: 'Sublist item 1'
                        }
                    },
                    {
                        listItemContext: {
                            content: 'Sublist item 2'
                        }
                    },
                    {
                        listItemContext: {
                            content: 'Sublist item 3'
                        }
                    },
                    {
                        listItemContext: {
                            content: 'Sublist item 4'
                        }
                    }
                ]
            },
            {
                listItemContext: {
                    modifier: '',
                    content: 'Four'
                },
                sublistItems: [
                    {
                        listItemContext: {
                            content: 'Sublist item 1'
                        }
                    },
                    {
                        listItemContext: {
                            content: 'Sublist item 2'
                        }
                    }
                ]
            },
            {
                listItemContext: {
                    modifier: '',
                    content: 'Five'
                },
                sublistItems: []
            }
        ]
    },
    variants: [
        {
            name: 'ul'
        },
        {
            name: 'ol',
            context: {
                listTag: 'ol',
                subListTag: 'ol'
            }
        },
        {
            name: 'unstyled',
            context: {
                modifier: 'unstyled',
                text: 'No bullets or padding.'
            }
        },
        {
            name: 'sublistItems',
            context: {
                modifier: 'sublistItems',
                text: 'A list in a list item.'
            }
        },
        {
            name: 'horizontal',
            context: {
                modifier: 'horizontal',
                additionalModifiers: ['unstyled'],
                text: 'List items are placed horizontally. Preferably used with list--unstyled modifier.'
            }
        }
    ]
}
