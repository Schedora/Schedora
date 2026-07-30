<template>
  <div
    class="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col"
  >
    <!-- Logo -->
    <div class="p-6 border-b border-gray-200">
      <h1 class="text-xl font-bold text-blue-600">Schedora Business</h1>
    </div>

    <!-- Progress -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center gap-3 mb-3">
        <div
          class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
        >
          <svg
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-800">Setup Progress</p>
          <p class="text-xs text-gray-500">
            {{ progressPercentage }}% Completed
          </p>
        </div>
      </div>
      <!-- Progress bar -->
      <div class="w-full bg-gray-200 rounded-full h-1.5">
        <div
          class="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>

    <!-- Steps -->
    <nav class="flex-1 p-4">
      <ul class="space-y-1">
        <li v-for="step in steps" :key="step.id">
          <div
            class="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors"
            :class="getStepClass(step)"
          >
            <!-- Step icon -->
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              :class="getIconClass(step)"
            >
              <!-- Completed checkmark -->
              <svg
                v-if="step.id < currentStep"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <!-- Step icon -->
              <svg
                v-else
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="step.icon"
                />
              </svg>
            </div>
            <span class="text-sm font-medium">{{ step.name }}</span>
          </div>
        </li>
      </ul>
    </nav>

    <!-- Finish Later -->
    <div class="p-6 border-t border-gray-200">
      <button
        @click="$emit('finish-later')"
        class="text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        Finish Later
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props passed in from the parent page
const props = defineProps<{
  currentStep: number;
}>();

// Emit events to the parent page
defineEmits(["finish-later"]);

// The 5 onboarding steps
const steps = [
  {
    id: 1,
    name: "Business Info",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    id: 2,
    name: "Location",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    id: 3,
    name: "Services",
    icon: "M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z",
  },
  {
    id: 4,
    name: "Staff",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    id: 5,
    name: "Images",
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
];

// Calculate progress percentage based on current step
const progressPercentage = computed(() => {
  return Math.round(((props.currentStep - 1) / steps.length) * 100);
});

// Get the CSS classes for each step row
function getStepClass(step: { id: number }) {
  if (step.id === props.currentStep) {
    return "bg-blue-600 text-white";
  } else if (step.id < props.currentStep) {
    return "text-gray-700 hover:bg-gray-100";
  } else {
    return "text-gray-400";
  }
}

// Get the CSS classes for each step icon box
function getIconClass(step: { id: number }) {
  if (step.id === props.currentStep) {
    return "bg-white/20";
  } else if (step.id < props.currentStep) {
    return "bg-green-100 text-green-600";
  } else {
    return "bg-gray-100 text-gray-400";
  }
}
</script>
