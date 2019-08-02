<template>
    <a v-lozad:backgroundImage="`${imageUrl}?preset=card--slim`" :href="url" class="card card--slim card--has-background-cover">
        <div class="card__body">
            <div class="card__tags">
                <Tag
                    v-for="tag in tags"
                    :key="tag"
                    :definedTag="tag"
                    :isFilled="true"
                    :hoverText="tag"
                >
                    {{ tag }}
                </Tag>
            </div>
            <div class="card__pre-heading">
                {{ author }}
                <time class="card__timestamp">{{ publishDate }}</time>
            </div>
            <h2 class="card__heading">{{ heading }}</h2>
            <div class="card__footer">
                <Btn
                    :isTransparent="true"
                    :isTextCenter="true"
                    :icon="{
                        icon: 'double-chevron',
                        size: 'xs',
                        srOnlyText: $getDictionaryValue('Site.Card.ReadMore', 'Läs mer')
                    }"
                    :text="$getDictionaryValue('Site.Card.ReadMore', 'Läs mer')"
                    class="h-padding-0"
                />
            </div>
        </div>
    </a>
</template>

<script>
import Button from '@/components/Button'
import Tag from '@/components/Tag'

export default {
    name: 'Card',
    components: {
        Btn: Button,
        Tag
    },
    props: {
        imageUrl: {
            type: String,
            required: false,
            default: null
        },
        tags: {
            type: Array,
            required: false,
            default () { return [] }
        },
        author: {
            type: String,
            required: false,
            default: null
        },
        publishDate: {
            type: String,
            required: false,
            default: null
        },
        heading: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
}
</script>
