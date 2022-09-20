<template>
  <div>
    <Header />
    <div id="wrapper">
      <div class="container">
        <div id="detail" class="row section content">
          <Aside />
          <Nuxt />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/layouts/sections/Header.vue'
import Aside from '@/layouts/sections/Aside.vue'
import Footer from '@/layouts/sections/Footer.vue'
export default {
  components: {
    Aside,
    Header,
    Footer
  }
}
</script>
