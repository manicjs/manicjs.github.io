<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import moment from 'moment';

// route.name needs to be passed to routeName to lose binging because as
// the route changes, route.name becomes not reachable and renders the
// header literlaly as `slug`. Therefore is  
// const route = useRoute()
// @todo router.js:12 [nuxt] Calling `useRoute` within middleware may lead
//       to misleading results. Instead, use the (to, from) arguments
//       passed to the middleware to access the new and old routes.
const { name: routeName } = useRoute()
const { t } = useI18n()
const { $ucfirst: ucfirst } = useNuxtApp()
const query: QueryBuilderParams = {
  path: '/changelogs',
  sort: [{ position: -1 }]
}

const breakWord = (str, limit = 80) => {
  const nString = `${str.substring(0, limit)}${str.substring(limit, limit + 10).split(' ')[0]}`
  const l = nString.length
  return l < limit ?
    str :
    `${nString}...`
}

definePageMeta({
  pageTransition: {
    name: 'slide-left',
    mode: 'out-in'
  }
})

useHead({
  title: 'Changelogs'
})
</script>

<template>
  <main>
    <ContentList :query="query" v-slot="{ list }">
      <section id="article-list">
        <header>
          <h1>Changelogs</h1>
        </header>
        <ul>
          <li
            v-for="change in list"
            :key="change._id"
          >
            {{ change }}
            <h2 style="padding-left:0;"><NuxtLink :to="change._path">title</NuxtLink></h2>
            <section class="listitem-timestamp">
              <i><b>{{ $t('created') }}</b></i> <time :datetime="change.createdAt" :title="change.createdAt">
                {{ moment(change.createdAt).fromNow() }}
              </time>,
              <i><b>{{ $t('updated') }}</b></i> <time :datetime="change.updatedAt" :title="change.updatedAt">
                {{ typeof change.updatedAt==='string' ? moment(change.updatedAt).fromNow() : moment(change.updatedAt[change.updatedAt.length-1]).fromNow() }}
              </time>
            </section>
            <p>{{ breakWord(change.description) }}</p>
          </li>
        </ul>
      </section>
    </ContentList>
  </main>
</template>
