<template>
  <div id="header">
    <div class="container">
      <div class="three columns">
        <div class="logo">
          <p>
            <NuxtLink :to="menu.logo.url">
              {{ menu.logo.title }}
            </NuxtLink>
          </p>
        </div>
      </div>
      <div
        class="nine columns"
        :class="{ 'show-menu': !show }"
      >
        <div class="navbar-spacer" />
        <nav
          id="navbar"
          class="navbar"
        >
          <ul>
            <li
              v-for="(item, index) in menu.navigation"
              :key="index"
            >
              <NuxtLink :to="item.url">
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="mob nine columns u-pull-right">
        <a
          id="menu-bar"
          class="menu-bar u-pull-right"
          @click="showMenu()"
        >
          <span class="bar bar1" />
          <span class="bar bar2" />
          <span class="bar bar3" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { siteNavigation } from '@/config'

export default {
  name: 'Header',
  data () {
    return {
      show: true,
      menu: siteNavigation
    }
  },
  methods: {
    showMenu () {
      this.show = !this.show
    }
  }
}
</script>
