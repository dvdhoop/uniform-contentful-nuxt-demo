<template>
  <div>
    <h2 class="mb-2 text-3xl text-gray-800 dark:text-gray-500">Categories</h2>
    <ul>
      <li v-for="category in uniformData.parameters.categories.value"><NuxtLink :to="'/categories/' + category.fields.name.toLowerCase()">{{ category.fields.name }}</NuxtLink></li>
    </ul>
    <!-- <pre>{{ uniformData }}</pre> -->
  </div>
</template>

<script>
export default {
  props: {
    uniformData: {
      type: Object,
      required: true,
    },
  },
}
</script>
