<template>
  <div class="pb-6">
    <div
      class="bg-white dark:bg-gray-900 p-6 rounded border-gray-600 dark:border-gray-900 border"
    >
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2">
          <h1 class="mb-2 text-3xl text-gray-800 dark:text-gray-500">
            {{ heading(uniformData) }}
          </h1>
          <h2 class="mb-2 text-xl text-gray-800 dark:text-gray-500">{{ subTitle(uniformData) }}</h2>
          <h3 class="mb-2 text-base text-gray-800 dark:text-gray-500">Published {{ publishDate(uniformData) }}</h3>
          <div v-html="body(uniformData)"></div>
        </div>
        <div>
          <h1 class="mb-2 text-3xl text-gray-800 dark:text-gray-500">{{author(uniformData)}}</h1>
          <img
            :src="imgUrl(uniformData)"
            :alt="imgAlt(uniformData)"
            class="max-h-64"
          />
          <div v-html="bio(uniformData)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
  methods: {
    article(uniformData) {
      return (
        uniformData?.data?.article ||
        uniformData?.parameters?.article?.value
      )
    },
    heading(uniformData) {
      return this.article(uniformData)?.fields?.title
    },
    subTitle(uniformData) {
      return this.article(uniformData)?.fields?.subTitle
    },
    body(uniformData) {
      return documentToHtmlString(this.article(uniformData)?.fields?.body)
    },
    author(uniformData) {
      return  this.article(uniformData)?.fields?.author?.fields?.name
    },
    bio(uniformData) {
      return documentToHtmlString(this.article(uniformData)?.fields?.author?.fields?.bio)
    },
    imgUrl(uniformData) {
      return  this.article(uniformData)?.fields?.author?.fields?.photo?.fields?.file
        ?.url
    },
    imgAlt(uniformData) {
      return  this.article(uniformData)?.fields?.author?.fields?.photo?.fields?.title
    },
    publishDate(uniformData) {
      return this.article(uniformData)?.fields?.publishDate
    },
  },
  props: {
    uniformData: {
      type: Object,
      required: true,
    },
  },
}
</script>
