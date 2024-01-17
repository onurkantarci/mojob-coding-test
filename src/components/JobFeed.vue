<script setup lang="ts">
import type { JobListing, PositionFunction } from '@/models/models'

export interface Props {
  jobListings: JobListing[]
  positionFunctions: PositionFunction[]
}
const props = withDefaults(defineProps<Props>(), {
  jobListings: () => [],
  positionFunctions: () => []
})
</script>

<template>
  <div class="mojob-logo-container">
    <img src="../assets/mojob_logo_on_white.png" alt="mojob-logo" />
  </div>
  <div class="job-feed"></div>
</template>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
}
.mojob-logo-container {
  background-color: white;
  width: 100%;
  left: 0px;
}

.mojob-logo-container img {
  margin-left: 8px;
  display: block;
  width: 125px;
}
</style>
