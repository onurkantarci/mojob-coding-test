<script setup lang="ts">
import type { PositionFunction } from '@/models/models'
import { computed, ref } from 'vue'

export interface Props {
  positionFunctions: PositionFunction[]
}

const props = withDefaults(defineProps<Props>(), {
  positionFunctions: () => []
})

const searchTerm = ref('')

const filteredPositionFunctions = computed(() => {
  const filtered = props.positionFunctions.filter((position) =>
    (position.name_en?.toLowerCase() ?? '').includes(searchTerm.value.toLowerCase())
  )

  const sorted = filtered.slice().sort((a, b) => {
    const nameA = a.name_en ?? ''
    const nameB = b.name_en ?? ''
    return nameA.localeCompare(nameB)
  })
  return sorted
})

const showDropdown = ref(false)
const showResetButton = ref(false)
const emit = defineEmits(['buttonClicked', 'resetFilters'])

const resetFilters = () => {
  searchTerm.value = ''
  showResetButton.value = false

  props.positionFunctions.forEach((position) => {
    position.showChildren = false
  })

  emit('resetFilters')
}

const toggleChildren = (position: PositionFunction) => {
  position.showChildren = !position.showChildren
}

const handleButtonClicked = (childName: string | undefined) => {
  emit('buttonClicked', childName)
  showResetButton.value = true
}
</script>

<template>
  <div class="function-filter">
    <div class="custom-dropdown">
      <input
        type="checkbox"
        id="filter-by-position"
        v-model="showDropdown"
        class="dropdown-toggle"
      />
      <label for="filter-by-position" class="dropdown-label">FILTER BY POSITION ▼</label>
      <div v-if="showDropdown" class="dropdown-list">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Find a position..."
          class="search-input"
        />
        <button v-if="showResetButton" class="reset-filters" @click="resetFilters">
          reset filters
        </button>
        <div v-for="position in filteredPositionFunctions" :key="position.id" class="dropdown-item">
          <div class="position-item">
            <input
              type="checkbox"
              :id="'position-' + position.id"
              v-model="position.showChildren"
              :value="position.id"
              class="position-checkbox"
              @click="toggleChildren(position)"
            />
            <label :for="'position-' + position.id">
              {{ position.name_en }}
            </label>
            <div
              v-if="position.showChildren && position.children && position.children.length"
              class="sub-dropdown-list"
            >
              <div v-for="child in position.children" :key="child.id" class="sub-dropdown">
                <input
                  type="checkbox"
                  :id="'position-' + child.id"
                  :value="child.id"
                  class="position-checkbox"
                  @click="handleButtonClicked(child.name_en)"
                />
                <label :for="'position-' + child.id">{{ child.name_en }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reset-filters {
  margin-left: 5px;
  border: none;
  padding: 5px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 10px;
  text-decoration: underline;
  background-color: white;
  cursor: pointer;
  background-color: rgba(232, 178, 178, 0.3);
}

.reset-filters:hover {
  outline: none;
  transition: background-color 0.3s;
  background-color: rgba(232, 178, 178, 0.7);
}
.search-input {
  background-color: rgb(178, 232, 229, 0.4);
  border-radius: 4px;
  border: none;
  height: 10px;
  border-bottom: 2px solid rgb(178, 232, 229);
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 5px;
  width: 352px;
}

.search-input:focus {
  outline: none;
  transition: background-color 0.4s;
  background-color: rgb(178, 232, 229, 0.7);
}

.position-item {
  padding: 5px;
  width: 100%;
}
.position-item:hover {
  background-color: rgb(178, 232, 229);
  transition: background-color 0.2s;
  border-radius: 3px;
}
.sub-dropdown {
  margin-left: 20px;
}
.function-filter {
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
  margin-left: 170px;
}

.custom-dropdown {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
}

.dropdown-toggle {
  display: none;
}

.dropdown-label {
  font-size: 15px;
  cursor: pointer;
  padding: 10px;
}
.dropdown-label:hover {
  box-shadow: 0px 1px 1px rgb(70, 187, 189);
  transition: box-shadow 0.4s;
  border-radius: 4px;
}

.dropdown-list {
  box-shadow: 0.5px 4px 12px rgb(121, 121, 121);
  border-radius: 4px;
  position: absolute;
  top: 27px;
  left: 0;
  z-index: 1;
  background-color: #fff;
  padding: 5px;
  width: 380px;
  max-height: 426px;
  overflow-y: auto;
}
.dropdown-list::-webkit-scrollbar {
  width: 8px;
}
.dropdown-list::-webkit-scrollbar-thumb {
  background-color: rgba(70, 187, 189, 0.7);
  border-radius: 6px;
}
.dropdown-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(70, 187, 189, 1);
}
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 4px;
}

.dropdown-item label {
  margin-left: 5px;
}

.default-filter {
  font-family: Arial, Helvetica, sans-serif;
}

.position-checkbox {
  accent-color: rgb(248, 106, 39);
}

@media only screen and (max-width: 768px) {
  .function-filter {
    margin-left: 0;
    flex-direction: column;
    align-items: center;
  }

  .custom-dropdown {
    width: 100%;
  }

  .dropdown-list {
    width: 100%;
    max-width: none;
    left: 0;
  }

  .reset-filters {
    margin-left: 0;
  }

  .search-input {
    width: 100%;
  }
}
</style>
