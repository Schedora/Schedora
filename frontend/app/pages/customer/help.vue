<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Help Center</h1>
      <p class="text-gray-600 mt-1">How can we help you?</p>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 p-8">
      <div class="space-y-4">
        <div class="border border-gray-100 rounded-xl p-4">
          <h3 class="font-semibold text-gray-900 mb-2">How do I make a booking?</h3>
          <p class="text-gray-600 text-sm">Click "Book Now" in the sidebar, select a category and business, then follow the 5-step booking process.</p>
        </div>
        <div class="border border-gray-100 rounded-xl p-4">
          <h3 class="font-semibold text-gray-900 mb-2">How do I cancel a booking?</h3>
          <p class="text-gray-600 text-sm">Go to My Bookings, find your booking, click the 3-dot menu and select Cancel.</p>
        </div>
        <div class="border border-gray-100 rounded-xl p-4">
          <h3 class="font-semibold text-gray-900 mb-2">How do I reschedule?</h3>
          <p class="text-gray-600 text-sm">Go to My Bookings, find your booking, click the 3-dot menu and select Reschedule.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'customer' })
</script>