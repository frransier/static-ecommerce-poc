export default {
    config: {
        videoElements: [ ...document.querySelectorAll('[data-js-background-video]') ]
    },
    init () {
        // YouTube videos can not autoplay on iOS devices, therefore just return if so is the case
        const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
        if (iOS) {
            return
        }

        const videoElements = this.config.videoElements

        if (videoElements.length) {
            var tag = document.createElement('script')
            tag.src = 'https://www.youtube.com/iframe_api'
            var firstScriptTag = document.getElementsByTagName('script')[0]
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

            window.onYouTubeIframeAPIReady = () => {
                videoElements.forEach(element => {
                    const videoId = element.dataset.jsBackgroundVideo

                    if (typeof videoId !== 'undefined' && videoId.length > 0) {
                        new YT.Player(element, { // eslint-disable-line
                            height: '390',
                            width: '640',
                            videoId: videoId,
                            playerVars: {
                                autoplay: 1,
                                mute: 1,
                                controls: 0,
                                disablekb: 1,
                                loop: 1,
                                modestbranding: 0,
                                enablejsapi: 1,
                                origin: window.location.origin,
                                playlist: videoId,
                                autohide: 0,
                                fs: 0,
                                rel: 0
                            },
                            events: {
                                onReady: 'onPlayerReady'
                            }
                        })
                    }
                })
            }

            window.onPlayerReady = (event) => {
                event.target.playVideo()
                event.target.mute()
            }
        }
    }
}
