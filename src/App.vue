<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <div id="nav"><router-link to="/"></router-link></div>
    <router-view />
  </div>
</template>
