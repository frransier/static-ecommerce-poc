<template>
    <div class="grid grid--col-xs-1 grid--col-sm-2 grid--col-md-2 grid--col-lg-3 grid--col-xl-4">
        <div
            v-for="(story, index) in stories"
            :key="index"
            class="grid__item"
        >
            <Card
                :heading="story.heading"
                :url="story.url"
                :publishDate="story.publishDate"
                :author="story.author"
                :tags="story.tags"
                :imageUrl="story.imageUrl"
            />
        </div>
    </div>
</template>

<script>
import Card from '@/components/Card'

export default {
    name: 'StoryList',
    components: {
        Card
    },
    props: {
        stories: {
            type: Array,
            required: false,
            default () { return [] }
        }
    }
}
</script>
