<script setup lang="ts">
import { ref, computed } from 'vue'

interface PageSizeOption {
  value: number | string
  label: string
}

const pageSizeOptions: PageSizeOption[] = [
  { value: 5, label: '5 per page' },
  { value: 25, label: '25 per page' },
  { value: 'all', label: 'Display All' }
]

const filteredOptions = computed(() => {
  return pageSizeOptions.filter((option) => option.value !== selectedOption.value.value)
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectOption = (option: PageSizeOption) => {
  selectedOption.value = option
  showDropdown.value = false
  emit('pageSizeChanged', option.value)
}

const selectedOption = ref<PageSizeOption>(pageSizeOptions[0])
const showDropdown = ref(false)

const emit = defineEmits(['pageSizeChanged'])
</script>

<template>
  <div class="page-filter">
    <div class="custom-dropdown">
      <div class="dropdown-toggle" @click="toggleDropdown">
        {{ selectedOption.label.toUpperCase() }}
        <span class="arrow">&#9660;</span>
      </div>
      <div v-if="showDropdown" class="dropdown-list">
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          @click="selectOption(option)"
          class="page-item"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-filter {
  display: flex;
  justify-content: right;
  margin-bottom: 0px;
  margin-right: 170px;
}

.custom-dropdown {
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  margin-bottom: -29px;
  margin-right: 10px;
  display: inline-block;
}
.dropdown-toggle {
  font-size: 15px;
  padding: 10px;
  background-color: rgb(250, 253, 253);
  border: none;
  cursor: pointer;
}

.dropdown-toggle:hover {
  box-shadow: 0px 1px 1px rgb(70, 187, 189);
  transition: box-shadow 0.4s;
  border-radius: 4px;
}

.arrow {
  margin-left: 5px;
}

.dropdown-list {
  box-shadow: 0.5px 4px 12px rgb(121, 121, 121);
  border-radius: 4px;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: #fff;
  padding: 5px;
  width: 150px;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-list div {
  padding: 10px;
  cursor: pointer;
}

.selection-page-size:focus {
  outline: none;
}

.page-item:hover {
  background-color: rgb(178, 232, 229);
  transition: background-color 0.2s;
  border-radius: 3px;
}

@media only screen and (max-width: 768px) {
  .page-filter {
    justify-content: center;
    margin-right: 0;
  }

  .custom-dropdown {
    margin-bottom: 0;
    margin-right: 0;
    text-align: center;
  }

  .dropdown-list {
    top: 100%;
    width: 100%;
    max-width: none;
  }

  .page-item {
    width: 100%;
    box-sizing: border-box;
  }

  .dropdown-toggle {
    width: 100%;
  }
}
</style>
