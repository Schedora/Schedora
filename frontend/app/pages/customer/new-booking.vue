<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">
        Start New Booking
      </h1>

      <p class="text-gray-600 mt-1">
        Find and schedule your next appointment in just a few clicks
      </p>
    </div>

    <!-- Booking Card -->
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">

        <!-- Business Category -->
        <div class="mb-7">
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            Select Business Category
          </label>

          <select
            v-model="selectedCategory"
            @change="onCategoryChange"
            class="w-full border rounded-xl px-4 py-4 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            :class="
              errors.category
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200'
            "
          >
            <option value="">
              Choose a category...
            </option>

            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>

          <p
            v-if="errors.category"
            class="text-red-500 text-sm mt-2"
          >
            {{ errors.category }}
          </p>
        </div>

        <!-- Select Business -->
        <div class="mb-8">
          <label class="block text-sm font-semibold text-gray-700 mb-3">
            Select Business
          </label>

          <select
            v-model="selectedBusiness"
            :disabled="!selectedCategory || loadingBusinesses"
            class="w-full border rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            :class="[
              errors.business
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200',

              !selectedCategory || loadingBusinesses
                ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                : 'bg-white'
            ]"
          >
            <option value="">
              {{
                !selectedCategory
                  ? 'Choose a category first...'
                  : loadingBusinesses
                    ? 'Loading businesses...'
                    : businesses.length === 0
                      ? 'No businesses available in this category'
                      : 'Choose a business...'
              }}
            </option>

            <option
              v-for="business in businesses"
              :key="business.id"
              :value="business.id"
            >
              {{ business.name }}
            </option>
          </select>

          <p
            v-if="errors.business"
            class="text-red-500 text-sm mt-2"
          >
            {{ errors.business }}
          </p>

          <!-- No Businesses -->
          <p
            v-if="
              selectedCategory &&
              !loadingBusinesses &&
              businesses.length === 0
            "
            class="text-amber-600 text-sm mt-2"
          >
            No businesses available in this category yet.
          </p>
        </div>

        <!-- Next Button -->
        <button
          type="button"
          @click="handleNext"
          :disabled="
            !selectedCategory ||
            !selectedBusiness ||
            businesses.length === 0
          "
          class="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'customer'
})

// Check if user is logged in
onMounted(() => {
  const token = localStorage.getItem('token')

  if (!token) {
    navigateTo('/auth/login')
  }
})

// Categories
const categories = [
  'Beauty & Personal Care',
  'Health & Fitness',
  'Medical & Wellness',
  'Pet Services',
  'Home Services',
  'Professional Services',
  'Tech Services',
]

const selectedCategory = ref('')
const selectedBusiness = ref('')

const businesses = ref([])
const loadingBusinesses = ref(false)

const errors = reactive({
  category: '',
  business: '',
})

// When category changes
const onCategoryChange = async () => {
  selectedBusiness.value = ''
  businesses.value = []

  errors.category = ''
  errors.business = ''

  if (!selectedCategory.value) {
    return
  }

  loadingBusinesses.value = true

  try {
    const response = await fetch(
      `http://localhost:3333/api/businesses?category=${encodeURIComponent(
        selectedCategory.value
      )}`
    )

    const data = await response.json()

    businesses.value = data.data || []
  } catch (error) {
    console.error('Failed to fetch businesses:', error)

    businesses.value = []
  } finally {
    loadingBusinesses.value = false
  }
}

// Next button
const handleNext = () => {
  errors.category = ''
  errors.business = ''

  if (!selectedCategory.value) {
    errors.category = 'Please select a business category'
    return
  }

  if (!selectedBusiness.value) {
    errors.business = 'Please select a business'
    return
  }

  // Go to selected business landing page
  navigateTo(
    `/customer/business/${selectedBusiness.value}`
  )
}
</script>