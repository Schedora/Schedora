<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <OnboardingSidebar :current-step="3" @finish-later="handleFinishLater" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navigation -->
      <header
        class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between"
      >
        <h2 class="text-lg font-semibold text-gray-800">Schedora Business</h2>
        <div class="flex items-center gap-4">
          <button class="text-gray-400 hover:text-gray-600">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button class="text-gray-400 hover:text-gray-600">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <div
            class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-xs font-semibold">O</span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Service Catalog</h1>
        <p class="text-gray-500 mb-8">
          Define the services you offer, their duration, and pricing to help
          clients book the right session.
        </p>

        <div class="flex gap-6">
          <!-- Add New Service Form -->
          <div
            class="bg-white border border-gray-200 rounded-xl p-6 w-80 flex-shrink-0"
          >
            <h3 class="text-base font-semibold text-blue-600 mb-5">
              Add New Service
            </h3>

            <div class="space-y-4">
              <!-- Service Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Service Name</label
                >
                <input
                  v-model="newService.name"
                  type="text"
                  placeholder="e.g., Hair Styling"
                  class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  :class="
                    serviceErrors.name ? 'border-red-400' : 'border-gray-300'
                  "
                />
                <p v-if="serviceErrors.name" class="text-red-500 text-xs mt-1">
                  {{ serviceErrors.name }}
                </p>
              </div>

              <!-- Duration and Price -->
              <div class="flex gap-3">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Duration (Min)</label
                  >
                  <input
                    v-model.number="newService.duration"
                    type="number"
                    placeholder="45"
                    min="5"
                    max="480"
                    class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    :class="
                      serviceErrors.duration
                        ? 'border-red-400'
                        : 'border-gray-300'
                    "
                  />
                  <p
                    v-if="serviceErrors.duration"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ serviceErrors.duration }}
                  </p>
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Price ($)</label
                  >
                  <input
                    v-model.number="newService.price"
                    type="number"
                    placeholder="60.00"
                    min="1"
                    class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    :class="
                      serviceErrors.price ? 'border-red-400' : 'border-gray-300'
                    "
                  />
                  <p
                    v-if="serviceErrors.price"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ serviceErrors.price }}
                  </p>
                </div>
              </div>

              <!-- Category -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Category</label
                >
                <select
                  v-model="newService.category"
                  class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  :class="
                    serviceErrors.category
                      ? 'border-red-400'
                      : 'border-gray-300'
                  "
                >
                  <option value="">Select a category</option>
                  <option value="Haircare">Haircare</option>
                  <option value="Nail Design">Nail Design</option>
                  <option value="Skincare">Skincare</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Medical">Medical</option>
                  <option value="Pet Care">Pet Care</option>
                  <option value="Home Repair">Home Repair</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Other">Other</option>
                </select>
                <p
                  v-if="serviceErrors.category"
                  class="text-red-500 text-xs mt-1"
                >
                  {{ serviceErrors.category }}
                </p>
              </div>

              <!-- Add to Catalog Button -->
              <button
                type="button"
                @click="addService"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add to Catalog
              </button>
            </div>
          </div>

          <!-- Service Summary -->
          <div class="flex-1">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-semibold text-gray-800">
                Service Summary ({{ services.length }})
              </h3>
              <div class="flex gap-2">
                <!-- Filter icon -->
                <button class="text-gray-400 hover:text-gray-600">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                    />
                  </svg>
                </button>
                <!-- Search icon -->
                <button class="text-gray-400 hover:text-gray-600">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Service Cards Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="(service, index) in services"
                :key="index"
                class="bg-white border border-gray-200 rounded-xl p-4 relative"
              >
                <!-- Category tag -->
                <span
                  class="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600"
                >
                  {{ service.category }}
                </span>

                <!-- Service icon -->
                <div
                  class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3"
                >
                  <svg
                    class="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
                    />
                  </svg>
                </div>

                <h4 class="font-semibold text-gray-800 text-sm pr-16">
                  {{ service.name }}
                </h4>

                <div class="flex items-center gap-3 mt-2">
                  <!-- Duration -->
                  <span class="flex items-center gap-1 text-xs text-gray-500">
                    <svg
                      class="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {{ service.duration }} Min
                  </span>
                  <!-- Price -->
                  <span class="flex items-center gap-1 text-xs text-gray-500">
                    <svg
                      class="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    ${{ service.price }}
                  </span>
                </div>

                <!-- Delete button -->
                <button
                  @click="deleteService(index)"
                  class="absolute bottom-3 right-3 text-gray-300 hover:text-red-500 transition"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              <!-- Add more card -->
              <div
                class="bg-white border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-6 min-h-32"
              >
                <svg
                  class="w-6 h-6 text-gray-300 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p class="text-xs text-gray-400 text-center">
                  Add more services to build your catalog
                </p>
              </div>
            </div>

            <!-- No services message -->
            <p v-if="noServiceError" class="text-red-500 text-sm mt-4">
              {{ noServiceError }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-between mt-8">
          <button
            type="button"
            @click="navigateTo('/onboarding/location')"
            class="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium"
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
            Previous Step
          </button>
          <button
            type="button"
            @click="handleContinue"
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2"
          >
            Continue to Staff
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </main>

      <!-- Footer -->
      <footer
        class="border-t border-gray-200 px-8 py-4 flex justify-between items-center"
      >
        <p class="text-xs text-gray-400">
          © Schedora. Professional Booking Solutions.
        </p>
        <div class="flex gap-4">
          <a href="#" class="text-xs text-gray-400 hover:text-gray-600"
            >Privacy Policy</a
          >
          <a href="#" class="text-xs text-gray-400 hover:text-gray-600"
            >Terms of Service</a
          >
          <a href="#" class="text-xs text-gray-400 hover:text-gray-600"
            >Onboarding Guide</a
          >
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

// New service form
const newService = reactive({
  name: "",
  duration: null as number | null,
  price: null as number | null,
  category: "",
});

// Validation errors
const serviceErrors = reactive({
  name: "",
  duration: "",
  price: "",
  category: "",
});

// No service error
const noServiceError = ref("");

// List of saved services
const services = ref<
  { name: string; duration: number; price: number; category: string }[]
>([]);

// Validate the service form
function validateService() {
  let valid = true;

  if (!newService.name.trim()) {
    serviceErrors.name = "Service name is required";
    valid = false;
  } else {
    serviceErrors.name = "";
  }

  if (!newService.duration || newService.duration < 5) {
    serviceErrors.duration = "Min 5 minutes";
    valid = false;
  } else {
    serviceErrors.duration = "";
  }

  if (!newService.price || newService.price < 1) {
    serviceErrors.price = "Min price is 1";
    valid = false;
  } else {
    serviceErrors.price = "";
  }

  if (!newService.category) {
    serviceErrors.category = "Please select a category";
    valid = false;
  } else {
    serviceErrors.category = "";
  }

  return valid;
}

// Add service to catalog
function addService() {
  if (!validateService()) return;

  services.value.push({
    name: newService.name,
    duration: newService.duration!,
    price: newService.price!,
    category: newService.category,
  });

  // Clear form
  newService.name = "";
  newService.duration = null;
  newService.price = null;
  newService.category = "";

  // Save to localStorage
  localStorage.setItem("onboarding_services", JSON.stringify(services.value));
  noServiceError.value = "";
}

// Delete a service
function deleteService(index: number) {
  services.value.splice(index, 1);
  localStorage.setItem("onboarding_services", JSON.stringify(services.value));
}

// Continue to Staff
function handleContinue() {
  if (services.value.length === 0) {
    noServiceError.value = "Please add at least one service before continuing";
    return;
  }
  localStorage.setItem("onboarding_services", JSON.stringify(services.value));
  navigateTo("/onboarding/staff");
}

// Finish Later
function handleFinishLater() {
  localStorage.setItem("onboarding_services", JSON.stringify(services.value));
  navigateTo("/");
}

// Restore saved data on page load
onMounted(() => {
  const saved = localStorage.getItem("onboarding_services");
  if (saved) {
    services.value = JSON.parse(saved);
  }
});
</script>
