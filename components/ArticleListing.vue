<template>
  <div class="bg-white dark:bg-gray-900 p-6 rounded border-gray-300 dark:border-gray-900 border">
    <h2 class="mb-2 text-3xl text-gray-800 dark:text-gray-500">{{ heading(uniformData.parameters.category) }}</h2>
    <div v-if="articles(uniformData).length > 0">
      <div v-for="article in articles(uniformData)"><NuxtLink :to="'/articles/' + article.sys.id">{{ article.fields.title }}</NuxtLink></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    articles(uniformData) {
      return uniformData?.data?.articles || []
    },
    heading(category) {
      if(category?.value?.fields?.name) {
        return category.value.fields.name + ' articles'
      }
      return 'Articles'
    } 
  },
  props: {
    uniformData: {
      type: Object,
      required: true,
    },
  },
}
</script>
