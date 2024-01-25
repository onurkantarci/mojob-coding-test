<script setup lang="ts">
import BaseApi from '@/api-requests/api'
import type { IPage, JobListing, PositionFunction } from '@/models/models'
import { inject, onMounted, ref } from 'vue'
import type { AxiosStatic } from 'axios'
import JobFeed from '../components/JobFeed.vue'
import FunctionFilter from '../components/FunctionFilter.vue'
import PageFilter from '../components/PageFilter.vue'

const mojobApi = ref<BaseApi | null>(null)
const positionFunctionFilters = ref<PositionFunction[]>([])
const jobListings = ref<JobListing[]>([])
const axiosInstance = inject('axios') as AxiosStatic
const filteredJobListings = ref<JobListing[]>([])
const searchQuery = ref<string>('')
const loading = ref<boolean>(true)

const logError = (message: string, error: any) => {
  console.log(message)
  console.error(error)
}

const handlePageSizeChange = async (pageSize: number) => {
  mojobApi.value?.updatePageSize(pageSize.toString())
  await fetchJobListings()
}

const handleFunctionFilter = async (childName: string | undefined) => {
  if (childName) {
    searchQuery.value = childName
    await fetchFilteredJobListings()
  }
}

const resetFilters = async () => {
  await fetchJobListings()
}

const fetchJobListings = async () => {
  try {
    loading.value = true
    const responsePage: IPage<JobListing> | undefined = await mojobApi.value?.getJobListings()

    if (responsePage && responsePage.results) {
      jobListings.value = responsePage.results
      filteredJobListings.value = []
      loading.value = false
    } else {
      console.log('Failed loading job listings')
    }
  } catch (e) {
    logError('Failed loading job listings', e)
  }
}

const fetchFilteredJobListings = async () => {
  try {
    const responsePage = await mojobApi.value?.getFilteredJobListings(searchQuery.value)

    if (responsePage !== undefined && responsePage.results) {
      filteredJobListings.value = responsePage.results
    } else {
      console.log('Failed loading filtered job listings')
    }
  } catch (e) {
    logError('Failed loading filtered job listings', e)
  }
}

onMounted(async () => {
  mojobApi.value = new BaseApi('https://test-api.mojob.io/public/', axiosInstance)

  try {
    const positionFunctionFiltersResponsePage: IPage<PositionFunction> =
      await mojobApi.value.getPositionFunctions()

    if (positionFunctionFiltersResponsePage.results) {
      positionFunctionFilters.value = positionFunctionFiltersResponsePage.results
    } else {
      console.log('Failed loading position function filters')
    }
  } catch (e) {
    logError('Failed loading position function filters', e)
  }

  await fetchJobListings()
})
</script>

<template>
  <div class="home">
    <div class="mojob-logo-container">
      <img src="../assets/mojob_logo_on_white.png" alt="mojob-logo" />
    </div>
    <page-filter @pageSizeChanged="handlePageSizeChange" />
    <function-filter
      :job-listings="jobListings"
      :position-functions="positionFunctionFilters"
      @button-clicked="handleFunctionFilter"
      @resetFilters="resetFilters"
    />
    <job-feed
      :job-listings="jobListings"
      :position-functions="positionFunctionFilters"
      :filtered-job-listings="filteredJobListings"
    />
    <div v-if="loading" class="spinner-container">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<style>
body {
  background-color: rgb(250, 253, 253);
  margin: 0;
}
.mojob-logo-container {
  background-color: white;
  width: 100%;
  left: 0px;
  margin-bottom: 16px;
}

.mojob-logo-container img {
  margin-left: 8px;
  display: block;
  width: 125px;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 4px solid rgb(70, 187, 189);
  border-radius: 50%;
  border-top: 4px solid rgb(250, 253, 253);
  width: 35px;
  height: 35px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  .mojob-logo-container img {
    width: 100px;
  }
}

@media only screen and (max-width: 768px) {
  .spinner-container {
    margin-top: 50px;
  }
}
</style>
