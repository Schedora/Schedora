<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-3xl mx-auto px-6 py-10">
      <button
        @click="navigateTo(backTo)"
        class="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {{ backLabel }}
      </button>

      <h1 class="text-2xl font-bold text-gray-900">Help Center</h1>
      <p class="text-gray-600 mt-1 mb-8">{{ subtitle }}</p>

      <div class="bg-white rounded-2xl border border-gray-100 p-8 space-y-4">
        <div
          v-for="item in items"
          :key="item.q"
          class="border border-gray-100 rounded-xl p-4"
        >
          <h3 class="font-semibold text-gray-900 mb-2">{{ item.q }}</h3>
          <p class="text-gray-600 text-sm">{{ item.a }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  subtitle: string;
  backTo: string;
  backLabel: string;
  items: { q: string; a: string }[];
}>();
</script>
