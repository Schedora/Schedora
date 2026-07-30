<template>
  <section id="solutions" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Why Choose Schedora?
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to run a modern service business — in one platform.
        </p>
      </div>

      <!-- Carousel -->
      <div class="relative">
        
        <!-- Cards -->
        <div class="overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <!-- Card 1 — Centralized Scheduling -->
            <div class="min-w-full px-4">
              <div class="bg-white rounded-2xl p-10 shadow-md text-center max-w-2xl mx-auto">
                <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span class="text-3xl">📅</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">
                  Centralized Scheduling
                </h3>
                <p class="text-gray-600 text-lg">
                  Every booking, across all channels, in one single view.
                </p>
              </div>
            </div>

            <!-- Card 2 — Reduced Double Bookings -->
            <div class="min-w-full px-4">
              <div class="bg-white rounded-2xl p-10 shadow-md text-center max-w-2xl mx-auto">
                <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span class="text-3xl">🚫</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">
                  Reduced Double Bookings
                </h3>
                <p class="text-gray-600 text-lg mb-6">
                  Our intelligent conflict detection algorithm prevents scheduling overlaps before they happen.
                </p>
                <div class="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ Conflict Prevented!
                </div>
              </div>
            </div>

            <!-- Card 3 — Easy Coordination -->
            <div class="min-w-full px-4">
              <div class="bg-white rounded-2xl p-10 shadow-md text-center max-w-2xl mx-auto">
                <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span class="text-3xl">🤝</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">
                  Easy Coordination
                </h3>
                <p class="text-gray-600 text-lg">
                  Automated shift management and instant staff notifications via mobile keep your team in sync.
                </p>
              </div>
            </div>

            <!-- Card 4 — Customer Delight -->
            <div class="min-w-full px-4">
              <div class="bg-white rounded-2xl p-10 shadow-md text-center max-w-2xl mx-auto">
                <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span class="text-3xl">⭐</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">
                  Customer Delight
                </h3>
                <p class="text-gray-600 text-lg">
                  A seamless booking experience designed to encourage repeat visits and build lasting loyalty.
                </p>
              </div>
            </div>

          </div>
        </div>

        <!-- Navigation Dots -->
        <div class="flex justify-center gap-3 mt-8">
          <button
            v-for="(_, index) in 4"
            :key="index"
            @click="currentSlide = index"
            class="w-3 h-3 rounded-full transition-colors duration-300"
            :class="currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'"
          />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const currentSlide = ref(0)

// Auto-advance carousel every 4 seconds
onMounted(() => {
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % 4
  }, 4000)
})
</script>