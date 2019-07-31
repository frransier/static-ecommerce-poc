module.exports = {
    name: 'product-images',
    status: 'wip',
    context: {
        customClasses: [],
        customAttributes: [],
        currentImage: 'https://source.unsplash.com/800x450/?hunting', // Note: Use currentImage OR currentVideo
        // currentVideo: 'https://www.youtube.com/embed/-Hs12Aujq54',
        thumbnails: [
            {
                image: 'https://source.unsplash.com/100x100/?hunting',
                isVideo: false
            },
            {
                image: 'https://source.unsplash.com/100x100/?hunting',
                isVideo: true
            },
            {
                image: 'https://source.unsplash.com/100x100/?hunting',
                isVideo: false
            }
        ],
        currentImageIndex: '1',
        totalImages: '3',
        tags: {
            isDiscounted: true,
            isNew: true
        },
        navigation: {
            previous: {
                buttonIconContext: {
                    buttonContext: {
                        modifier: 'transparent',
                        customClasses: ['button-icon', 'product-images__nav-button', 'product-images__nav-button--prev']
                    },
                    iconContext: {
                        icon: 'arrow-left-grey',
                        srOnlyText: 'Previous image'
                    }
                }
            },
            next: {
                buttonIconContext: {
                    buttonContext: {
                        modifier: 'transparent',
                        customClasses: ['button-icon', 'product-images__nav-button', 'product-images__nav-button--next']
                    },
                    iconContext: {
                        icon: 'arrow-right',
                        srOnlyText: 'Next image'
                    }
                }
            }
        }
    },
    variants: [
        {
            name: 'wide',
            context: {
                modifier: 'wide',
                currentImage: 'https://source.unsplash.com/1500x850/?hunting'
            }
        }
    ]
}
