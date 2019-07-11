module.exports = {
    name: 'input',
    status: 'wip',
    context: {
        customClasses: [],
        customAttributes: [],
        id: '',
        name: '',
        value: '',
        placeholder: '',
        isRequired: false
    },
    default: 'text',
    variants: [
        {
            name: 'text',
            status: 'ready'
        },
        {
            name: 'radio',
            context: {
                isChecked: false
            }
        },
        {
            name: 'checkbox',
            context: {
                isChecked: false
            }
        },
        {
            name: 'select',
            status: 'ready',
            context: {
                headline: 'Choose something...',
                options: [
                    {
                        value: 'option-one-value',
                        text: 'Option one',
                        isSelected: false
                    },
                    {
                        value: 'option-two-value',
                        text: 'Option two',
                        isSelected: false
                    }
                ]
            }
        },
        {
            name: 'textarea',
            status: 'ready'
        },
        {
            name: 'grey',
            status: 'ready',
            context: {
                modifier: 'grey'
            }
        },
        {
            name: 'inline',
            status: 'ready',
            context: {
                modifier: 'inline'
            }
        },
        {
            name: 'email',
            status: 'ready'
        },
        {
            name: 'number',
            status: 'ready'
        },
        {
            name: 'password',
            status: 'ready'
        },
        {
            name: 'search',
            status: 'ready'
        }
    ]
}
