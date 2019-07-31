export default {
    data () {
        return {
            lightboxDisplayMedia: null
        }
    },
    methods: {
        openLightbox (mediaIndex) {
            this.lightboxDisplayMedia = mediaIndex
        },
        resetLightboxDisplayMedia () {
            this.lightboxDisplayMedia = null
        }
    }
}
