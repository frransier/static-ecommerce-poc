module.exports = {
    name: 'Card',
    status: 'ready',
    context: {
        additionalModifiers: ['has-background-cover'],
        customClasses: [],
        customAttributes: [],
        image: 'https://source.unsplash.com/800x450/?hunting',
        imageSquare: 'https://source.unsplash.com/320x320/?hunting',
        preHeading: 'Jaktia pro team',
        heading: 'Rubrik som kan sträcka sig över två rader',
        introText: 'Alla Jaktias butiker säljer begagnade vapen och kikarsikten. Här finner du allt samlat på ett ställe. Du kan söka vapen i just din butik eller i alla Jaktiabutiker.',
        ctaText: 'Läs nu',
        timeStamp: '2017 / 05 / 01',
        backgroundImage: 'https://source.unsplash.com/800x450/?hunting',
        buttonIconContext: {
            text: 'Läs mer',
            buttonContext: {
                additionalModifiers: ['transparent', 'text-center'],
                customClasses: ['h-padding-0']
            },
            iconContext: {
                modifier: 'xs',
                icon: 'double-chevron',
                srOnlyText: 'Go to the checkout'
            }
        },
        showBackgroundImage: true,
        showImage: false,
        showCta: true,
        showCtaAsButton: true,
        showIntroText: false,
        showTag: true
    },
    variants: [
        {
            name: 'with-intro-text',
            context: {
                modifier: 'with-intro-text',
                additionalModifiers: ['slim', 'has-background-cover'],
                showIntroText: true,
                showCta: true,
                showTag: false,
                backgroundImage: 'https://source.unsplash.com/610x310/?hunting'
            }
        },
        {
            name: 'slim',
            context: {
                modifier: 'slim',
                backgroundImage: 'https://source.unsplash.com/610x300/?hunting'
            }
        },
        {
            name: 'image-with-text',
            context: {
                modifier: 'image-with-text',
                additionalModifiers: [],
                showTag: true,
                showBackgroundImage: false,
                showImage: true,
                showCta: true,
                buttonIconContext: {
                    text: 'Se evenemang',
                    buttonContext: {
                        additionalModifiers: ['red', 'full-width'],
                        customClasses: []
                    }
                }
            }
        }
    ]
}
