module.exports = {
    name: 'grid',
    status: 'wip',
    context: {
        customClasses: [],
        customAttributes: [],
        columnsXs: null,
        columnsSm: null,
        columnsMd: null,
        columnsLg: null,
        columnsXl: null,
        columns: []
    },
    variants: [
        {
            name: 'no-gutter-xs',
            context: {
                modifier: 'no-gutter-xs'
            }
        },
        {
            name: 'no-gutter-sm',
            context: {
                modifier: 'no-gutter-sm'
            }
        },
        {
            name: 'gutter-fixed-xs',
            context: {
                modifier: 'gutter-fixed-xs'
            }
        },
        {
            name: 'gutter-fixed-sm',
            context: {
                modifier: 'gutter-fixed-sm'
            }
        },
        {
            name: 'gutter-fixed-md',
            context: {
                modifier: 'gutter-fixed-md'
            }
        },
        {
            name: 'equal-row-height',
            context: {
                modifier: 'equal-row-height'
            }
        }
    ]
}
