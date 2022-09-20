<template>
  <div>
    <Header />
    <div id="wrapper">
      <div class="container">
        <div id="list">
          <Nuxt />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/layouts/sections/Header.vue'
import Footer from '@/layouts/sections/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>
