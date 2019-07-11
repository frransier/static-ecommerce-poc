module.exports = {
    name: 'label',
    status: 'wip',
    context: {
        customClasses: [],
        customAttributes: [],
        text: 'Label text',
        for: 'some-element',
        isRequired: true,
        requiredText: 'required'
    },
    variants: [
        {
            name: 'bordered',
            context: {
                modifier: 'bordered'
            }
        },
        {
            name: 'color-black',
            context: {
                modifier: 'color-black'
            }
        }
    ]
}
