<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">

        <!-- Logo -->
        <div class="flex items-center">
          <span class="text-2xl font-bold text-blue-600">Schedora</span>
        </div>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#services" class="text-gray-600 hover:text-blue-600 font-medium">Services</a>
          <a href="#solutions" class="text-gray-600 hover:text-blue-600 font-medium">Solutions</a>
          <a href="#pricing" class="text-gray-600 hover:text-blue-600 font-medium">Pricing</a>
          <a href="#about" class="text-gray-600 hover:text-blue-600 font-medium">About</a>
        </div>

        <!-- Desktop Download Button -->
        <div class="hidden md:block">
          <a
            href="https://play.google.com/store"
            target="_blank"
            class="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Download Now
          </a>
        </div>

        <!-- Mobile Hamburger Button -->
        <button
          @click="isOpen = !isOpen"
          class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <!-- Hamburger Icon -->
          <div v-if="!isOpen" class="space-y-1.5">
            <span class="block w-6 h-0.5 bg-gray-600"></span>
            <span class="block w-6 h-0.5 bg-gray-600"></span>
            <span class="block w-6 h-0.5 bg-gray-600"></span>
          </div>
          <!-- Close Icon -->
          <div v-else class="w-6 h-6 flex items-center justify-center">
            <span class="text-xl font-bold">✕</span>
          </div>
        </button>

      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isOpen"
      class="md:hidden bg-white border-t border-gray-100 shadow-lg"
    >
      <div class="max-w-7xl mx-auto px-4 py-4 space-y-4">
        <a
          href="#services"
          @click="isOpen = false"
          class="block text-gray-600 hover:text-blue-600 font-medium py-2"
        >
          Services
        </a>
        <a
          href="#solutions"
          @click="isOpen = false"
          class="block text-gray-600 hover:text-blue-600 font-medium py-2"
        >
          Solutions
        </a>
        <a
          href="#pricing"
          @click="isOpen = false"
          class="block text-gray-600 hover:text-blue-600 font-medium py-2"
        >
          Pricing
        </a>
        <a
          href="#about"
          @click="isOpen = false"
          class="block text-gray-600 hover:text-blue-600 font-medium py-2"
        >
          About
        </a>
        <a
          href="https://play.google.com/store"
          target="_blank"
          class="block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors text-center"
        >
          Download Now
        </a>
      </div>
    </div>

  </nav>
</template>

<script setup>
const isOpen = ref(false)
</script>