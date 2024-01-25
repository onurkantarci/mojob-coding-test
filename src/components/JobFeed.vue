<script setup lang="ts">
import type { JobListing, PositionFunction } from '@/models/models'
import { computed } from 'vue'

export interface Props {
  jobListings: JobListing[]
  filteredJobListings: PositionFunction[]
}
const props = withDefaults(defineProps<Props>(), {
  jobListings: () => [],
  filteredJobListings: () => []
})

const getLeafNodes = (categories: PositionFunction[]): PositionFunction[] => {
  let result: PositionFunction[] = []

  for (const category of categories) {
    if (category.children && category.children.length > 0) {
      result = result.concat(getLeafNodes(category.children))
    } else {
      result.push(category)
    }
  }

  return result
}

const flattenedFilters = computed(() => {
  return getLeafNodes(props.filteredJobListings)
})

const filteredJobs = computed(() => {
  if (flattenedFilters.value.length > 0) {
    return props.jobListings.filter((job) => {
      return flattenedFilters.value.some(
        (filter) => job.job?.position_function?.name_en === filter.name_en
      )
    })
  } else {
    return props.jobListings
  }
})
</script>

<template>
  <div class="job-feed">
    <div v-for="job in filteredJobs" :key="job.id" class="job-container">
      <div class="logo-container">
        <img :src="job.job?.unit?.logo_url" alt="Company Logo" class="logo" />
      </div>
      <div class="details-container">
        <div class="job-title">{{ job.job?.title }}</div>
        <div class="job-details">
          {{ job.job?.unit?.name }}
          •
          {{ job.job?.position_function?.name_en }}
          •
          {{ job.job?.due_date }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.job-feed {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.job-container {
  box-shadow: 0px 2px 4px #c9cbcb;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
  display: flex;
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 16px;
}

.job-container:hover {
  background-color: rgb(178, 232, 229, 0.3);
  transition: background-color 0.3s;
  border-radius: 10px;
}

.logo-container {
  margin-right: 10px;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.job-title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-weight: bold;
}

.details-container {
  display: flex;
  flex-direction: column;
  margin-top: 4px;
}
.job-details {
  font-family: Arial, Helvetica, sans-serif;
  color: #bababa;
  margin-top: 8px;
  font-size: 14px;
}

@media only screen and (max-width: 768px) {
  .job-feed {
    align-items: flex-start;
  }

  .job-container {
    flex-direction: column;
    align-items: center;
  }

  .logo-container {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .logo {
    width: 100%;
    height: auto;
  }

  .details-container {
    text-align: center;
  }

  .job-details {
    margin-top: 5px;
  }
}
</style>
