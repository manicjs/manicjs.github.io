<script setup lang="ts">
import moment from 'moment';

const { t } = useI18n()
const { $ucfirst: ucfirst } = useNuxtApp()

definePageMeta({
  pageTransition: {
    name: 'slide-left',
    mode: 'out-in'
  }
})

useHead({
  title: t('get-started')
})
</script>

<template>
  <main>
    <ContentDoc v-slot="{ doc }" path="/get-started">
      <article>
        <header>
          <h1>{{ $t('get-started') }}</h1>
          <section id="article-timestamp">
            <i><b>{{ $t('created') }}</b></i> <time :datetime="doc.createdAt" :title="doc.createdAt">
              {{ moment(doc.createdAt).fromNow() }}
            </time><br class="bigScreen"/><span class="mobileScreen">, </span><i><b>{{ $t('updated') }}</b></i> <time :datetime="doc.updatedAt" :title="doc.updatedAt">
              {{ moment(doc.updatedAt).fromNow() }}
            </time>
          </section>
        </header>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </main>
</template>
