<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Notifications</h1>
      <p class="text-gray-600 mt-1">Stay updated with your appointments</p>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 min-h-64 flex items-center justify-center">
      <div class="text-center">
        <div class="text-5xl mb-4">🔔</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
        <p class="text-gray-500">You'll be notified about your bookings here</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'customer' })
</script>