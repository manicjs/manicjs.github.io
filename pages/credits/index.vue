<template>
  <div class="main-article two-thirds column">
    <div class="article-layer">
      <h1 id="main-title">
        <p>{{ credit.title }}</p>
      </h1>
      <p id="main-date" :title="[credit.createdAt, credit.updatedAt]">
        {{ $moment(credit.createdAt).fromNow() }},
        <strong>update:</strong>
        {{ $moment(credit.updatedAt).fromNow() }}
      </p>
      <p id="main-body">
        <nuxt-content :document="credit" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const credit = await $content('credits', 'index').fetch()
    return { credit }
  },
  head () {
    return {
      title: `${this.credit.title}`,
      meta: [
        { hid: 'description', name: 'description', content: this.credit.description }
      ]
    }
  }
}
</script>
