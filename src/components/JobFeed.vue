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
  <div class="job-feed">INPUT JOB FEED DESIGN HERE</div>
</template>
