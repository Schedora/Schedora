<template>
  <div>
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p class="text-gray-600 mt-1">
          Manage and track all your appointments
        </p>
      </div>
    </div>

    <!-- Booking Statistics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      <!-- Total -->
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
            📅
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Total Bookings
            </p>
            <p class="text-2xl font-bold text-gray-900 mt-1">0</p>
          </div>
        </div>
      </div>

      <!-- Completed -->
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-xl">
            ✓
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Completed
            </p>
            <p class="text-2xl font-bold text-gray-900 mt-1">0</p>
          </div>
        </div>
      </div>

      <!-- Pending -->
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 bg-yellow-50 rounded-xl flex items-center justify-center text-xl">
            ⏳
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Pending
            </p>
            <p class="text-2xl font-bold text-gray-900 mt-1">0</p>
          </div>
        </div>
      </div>

      <!-- Cancelled -->
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center text-xl">
            ×
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Cancelled
            </p>
            <p class="text-2xl font-bold text-gray-900 mt-1">0</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Empty Booking State -->
    <div class="bg-white rounded-2xl border border-gray-100 min-h-[420px] flex items-center justify-center">
      <div class="text-center max-w-md px-6">

        <div class="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span class="text-4xl">📅</span>
        </div>

        <h2 class="text-xl font-semibold text-gray-900 mb-2">
          No bookings yet
        </h2>

        <p class="text-gray-500 mb-6">
          You haven't made any bookings yet. Start by finding a business!
        </p>

        <NuxtLink
          to="/customer/new-booking"
          class="inline-flex items-center justify-center bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Book Now
        </NuxtLink>

      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'customer'
})

onMounted(() => {
  const token = localStorage.getItem('token')

  if (!token) {
    navigateTo('/auth/login')
  }
})
</script>