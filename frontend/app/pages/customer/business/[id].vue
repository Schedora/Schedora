<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <button
        @click="navigateTo('/customer/new-booking')"
        class="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
      >
        ← Back
      </button>
      <h1 class="text-2xl font-bold text-gray-900">{{ business?.name }}</h1>
      <p class="text-gray-600 mt-1">{{ business?.category }}</p>
    </div>

    <!-- Book Now Button -->
    <div class="mb-8">
      <button
        @click="startBooking"
        class="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
      >
        Book Appointment
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'customer' })

const route = useRoute()
const business = ref(null)

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    navigateTo('/auth/login')
    return
  }

  try {
    const response = await fetch(
      `http://localhost:3333/api/businesses/${route.params.id}`
    )
    const data = await response.json()
    business.value = data.data
  } catch (error) {
    console.error('Failed to fetch business:', error)
  }
})

const startBooking = () => {
  navigateTo(`/customer/book/${route.params.id}`)
}
</script>