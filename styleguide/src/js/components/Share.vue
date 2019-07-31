<template>
    <div class="share">
        <div class="share__heading">
            {{ $getDictionaryValue('Site.Share', 'Dela') }}
        </div>
        <div class="share__icons">
            <Btn
                v-toast="$getDictionaryValue('Site.Share.Link.Message', 'URL kopierad!')"
                :isTransparent="true"
                :icon="{
                    icon: 'share-link',
                    size: 'sm',
                    srOnlyText: $getDictionaryValue('Site.Share.Link', 'Kopiera sidans URL')
                }"
                class="h-padding-0 share__button"
                @click.native="copyUrl"
            />
            <Btn
                :isLink="true"
                :url="facebookUrl"
                :isTransparent="true"
                :icon="{
                    icon: 'facebook',
                    size: 'sm',
                    srOnlyText: $getDictionaryValue('Site.Share.Facebook', 'Dela på Facebook')
                }"
                class="h-padding-0 share__button"
            />
            <Btn
                :isLink="true"
                :url="twitterUrl"
                :isTransparent="true"
                :icon="{
                    icon: 'twitter',
                    size: 'sm',
                    srOnlyText: $getDictionaryValue('Site.Share.Twitter', 'Dela på Twitter')
                }"
                class="h-padding-0 share__button"
            />
            <textarea
                ref="toCopy"
                v-model="pageUrl"
                class="share__hidden-copy-holder"
                spellcheck="false"
                type="hidden"
                readonly
            ></textarea>
        </div>
    </div>
</template>

<script>
import Button from '@/components/Button'

export default {
    name: 'Share',
    components: {
        Btn: Button
    },
    computed: {
        pageUrl () {
            return window.location.origin + this.$route.fullPath
        },
        facebookUrl () {
            return `http://www.facebook.com/sharer.php?${this.pageUrl}`
        },
        twitterUrl () {
            return `https://twitter.com/intent/tweet?url=${this.pageUrl}`
        }
    },
    methods: {
        copyUrl () {
            // Note: This function is copied from the Share component in the styleguide (share.js)
            const element = this.$refs.toCopy

            if (navigator.userAgent.match(/ipad|iphone/i)) {
                // iOS is a little bit.. special. This is how we select text for those devices:
                const range = document.createRange()
                range.selectNodeContents(element)

                const selection = window.getSelection()
                selection.removeAllRanges()
                selection.addRange(range)

                element.setSelectionRange(0, 999999)
            } else {
                // If regular device, just select:
                element.select()
            }

            document.execCommand('copy')
        }
    }
}
</script>
