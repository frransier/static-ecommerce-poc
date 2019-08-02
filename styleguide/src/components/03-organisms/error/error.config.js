module.exports = {
    name: 'error',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        isFullscreen: false,
        heading: '404',
        subHeading: 'Oj, det har blivit fel vi kan inte hitta sidan du letar efter.',
        message: '<p>Det verkar som att den kan ha blivit borttagen, ändrad eller är temporärt otillgänglig</p>',
        buttonIconContext: {
            text: 'Till startsidan',
            buttonContext: {
                additionalModifiers: ['responsive', 'text-center']
            },
            iconContext: {
                modifier: 'xs',
                icon: 'double-chevron-black',
                srOnlyText: 'Till startsidan'
            }
        }
    }
}
