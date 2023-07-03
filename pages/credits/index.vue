<script setup lang="ts">
import moment from 'moment';

const { locale } = useI18n()
const { $ucfirst: ucfirst } = useNuxtApp()

definePageMeta({
  pageTransition: {
    name: 'slide-left',
    mode: 'out-in'
  }
})
</script>

<template>
  <main>
    <ContentDoc v-slot="{ doc }" path="/credits">
      <article>
        <header>
          <h1>{{ doc.title }}</h1>
          <section id="article-timestamp">
            <i><b>{{ ('created') }}</b></i> <time :datetime="doc.createdAt" :title="doc.createdAt">
              {{ moment(doc.createdAt).fromNow() }}
            </time><br class="bigScreen"/><span class="mobileScreen">, </span><i><b>{{ $t('updated')}}</b></i> <time :datetime="doc.updatedAt" :title="doc.updatedAt">
              {{ typeof doc.updatedAt==='string' ? moment(doc.updatedAt).fromNow() : moment(doc.updatedAt[doc.updatedAt.length-1]).fromNow() }}
            </time>
          </section>
        </header>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </main>
</template>
