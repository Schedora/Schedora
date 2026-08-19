<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Calendar</h1>
      <p class="text-gray-600 mt-1">View your upcoming appointments</p>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 min-h-64 flex items-center justify-center">
      <div class="text-center">
        <div class="text-5xl mb-4">📆</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No upcoming appointments</h3>
        <p class="text-gray-500 mb-6">Your scheduled appointments will appear here</p>
        <NuxtLink
          to="/customer/new-booking"
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Book Now
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'customer' })
</script>