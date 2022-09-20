<template>
  <div class="main-article two-thirds column">
    <div class="article-layer">
      <h1 id="main-title">
        <p>{{ changelog.title }}</p>
      </h1>
      <p id="main-date" :title="[changelog.createdAt, changelog.updatedAt]">
        {{ $moment(changelog.createdAt).fromNow() }},
        <strong>update:</strong>
        {{ $moment(changelog.updatedAt).fromNow() }}
      </p>
      <p id="main-body">
        <nuxt-content :document="changelog" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const changelog = await $content('changelogs', params.slug).without(['excerpt'])
      .fetch()
    return { changelog }
  },
  head () {
    return {
      title: `Changelog: ${this.changelog.title}`,
      meta: [
        { hid: 'description', name: 'description', content: this.changelog.description }
      ]
    }
  }
}
</script>
