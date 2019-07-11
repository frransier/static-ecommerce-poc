module.exports = {
    name: 'Hero',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        preHeading: 'Reportage',
        title: 'När jakt är en del av något större',
        intro: null,
        backgroundImage: 'https://source.unsplash.com/1920x800/?hunting',
        showButton: true,
        buttonIconContext: {
            text: 'Läs artikeln',
            buttonContext: {
                additionalModifiers: ['red', 'text-center']
            },
            iconContext: {
                modifier: 'xs',
                icon: 'double-chevron',
                srOnlyText: 'Go to the checkout'
            }
        }
    },
    variants: [
        {
            name: 'slim-with-image',
            context: {
                modifier: 'slim',
                preHeading: null,
                title: null,
                intro: '<p>Club Jaktia är Jaktias kundklubb. Som medlem får du ta del av exklusiva medlemserbjudanden och inbjudningar till centrala och lokala events. Just nu får du en värdecheck om 50 kr!</p>',
                backgroundImage: 'https://source.unsplash.com/1920x800/?hunting',
                image: '/content/assets/icons/club-jaktia.svg',
                buttonIconContext: {
                    text: 'Se kampanj',
                    buttonContext: {
                        additionalModifiers: ['cyan', 'text-center']
                    },
                    iconContext: {
                        modifier: 'xs',
                        icon: 'double-chevron',
                        srOnlyText: 'Go to the checkout'
                    }
                }
            }
        },
        {
            name: 'slim-with-headline',
            context: {
                modifier: 'slim',
                preHeading: null,
                title: 'När jakt är en del av något större',
                intro: '<p>Club Jaktia är Jaktias kundklubb. Som medlem får du ta del av exklusiva medlemserbjudanden och inbjudningar till centrala och lokala events. Just nu får du en värdecheck om 50 kr!</p>',
                backgroundImage: 'https://source.unsplash.com/1920x800/?hunting',
                buttonIconContext: {
                    text: 'Se kampanj',
                    buttonContext: {
                        additionalModifiers: ['cyan', 'text-center']
                    },
                    iconContext: {
                        modifier: 'xs',
                        icon: 'double-chevron',
                        srOnlyText: 'Go to the checkout'
                    }
                }
            }
        },
        {
            name: 'slim-with-headline2',
            context: {
                modifier: 'slim',
                additionalModifiers: ['headline2'],
                preHeading: null,
                title: 'När jakt är en del av något större',
                intro: '<p>Club Jaktia är Jaktias kundklubb. Som medlem får du ta del av exklusiva medlemserbjudanden och inbjudningar till centrala och lokala events. Just nu får du en värdecheck om 50 kr!</p>',
                backgroundImage: 'https://source.unsplash.com/1920x800/?hunting',
                buttonIconContext: {
                    text: 'Se kampanj',
                    buttonContext: {
                        additionalModifiers: ['cyan', 'text-center']
                    },
                    iconContext: {
                        modifier: 'xs',
                        icon: 'double-chevron',
                        srOnlyText: 'Go to the checkout'
                    }
                }
            }
        },
        {
            name: 'headline2',
            context: {
                modifier: 'headline2',
                preHeading: 'Sortiment',
                title: 'Sako 85 - helt utan kompromisser',
                buttonIconContext: {
                    text: 'Visa produkt'
                }
            }
        },
        {
            name: 'background-video-youtube',
            context: {
                backgroundVideo: {
                    isYoutube: true,
                    id: 'eGe98xvXcuQ'
                }
            }
        },
        {
            name: 'background-video-vimeo',
            context: {
                backgroundVideo: {
                    isVimeo: true,
                    id: '114025425'
                }
            }
        }
    ]
}
