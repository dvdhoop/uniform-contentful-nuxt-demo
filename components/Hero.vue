<template>
  <div class="pb-6">
    <div
      :class="
        background(uniformData) +
        ' dark:bg-gray-900 p-6 rounded border-gray-600 dark:border-gray-900 border'
      "
    >
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2">
          <h1 class="mb-2 text-3xl text-gray-800 dark:text-gray-500">
            {{ heading(uniformData) }}
          </h1>
          <div v-html="description(uniformData)"></div>
        </div>
        <div>
          <img
            :src="imgUrl(uniformData)"
            :alt="imgAlt(uniformData)"
            class="max-h-64"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
  methods: {
    heading(uniformData) {
      return (
        uniformData?.parameters?.entry?.value?.fields?.name ||
        uniformData?.parameters?.title?.value
      )
    },
    description(uniformData) {
      return (
        documentToHtmlString(
          uniformData?.parameters?.entry?.value?.fields?.description
        ) || uniformData?.parameters?.description?.value
      )
    },
    imgUrl(uniformData) {
      return uniformData?.parameters?.entry?.value?.fields?.image?.fields?.file
        ?.url
    },
    imgAlt(uniformData) {
      return uniformData?.parameters?.entry?.value?.fields?.image?.fields?.title
    },
    background(uniformData) {
      if (uniformData?.variant == 'blue') {
        return 'bg-blue-300'
      }
      if (uniformData?.variant == 'pink') {
        return 'bg-pink-300'
      }
      return 'bg-grey-300'
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
