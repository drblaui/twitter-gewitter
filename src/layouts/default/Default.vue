<script lang="ts" setup>
  import DefaultView from './View.vue'
</script>
<template>
  <v-app>
    <default-view />
  </v-app>
  <v-bottom-navigation>
    <a href="https://github.com/drblaui/twitter-gewitter" target="_blank" class="text-decoration-none" style="color: white">
      <v-btn>
        <v-icon>mdi-github</v-icon>
        <span>Source Code</span>
      </v-btn>
    </a>
  </v-bottom-navigation>
</template>

