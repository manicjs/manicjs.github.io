<template>
  <div>
    <div
      v-for="(changelog, index) in changelogs"
      :key="index"
      class="short-article one-third column"
    >
      <h3>
        <NuxtLink :to="changelog.path">
          {{ changelog.title }}
        </NuxtLink>
      </h3>
      <p>{{ changelog.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'list',
  async asyncData ({ $content }) {
    const changelogs = await $content('changelogs')
      .sortBy('position', 'desc')
      .fetch()
    return { changelogs }
  },
  head () {
    return {
      title: 'Changelog list',
      meta: [
        { hid: 'description', name: 'description', content: 'A list of changelogs.' }
      ]
    }
  }
}
</script>
