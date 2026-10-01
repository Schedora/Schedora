<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center py-32">
      <div
        class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <div v-else>
      <!-- Business Hero Banner -->
      <div
        class="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden"
      >
        <div class="absolute bottom-0 left-0 right-0 p-6">
          <div class="max-w-5xl mx-auto flex items-end gap-4">
            <div
              class="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
            >
              <svg
                class="w-7 h-7 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-white">{{ business?.name }}</h1>
              <p class="text-white/80 text-sm">{{ business?.category }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-5xl mx-auto px-6 py-8">
        <div class="flex gap-8">
          <!-- Left — Details -->
          <div class="flex-1">
            <!-- Back button -->
            <button
              @click="navigateTo('/customer/new-booking')"
              class="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm"
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
              Back
            </button>

            <!-- About -->
            <div class="bg-white border border-gray-200 rounded-xl p-5 mb-5">
              <h2 class="text-base font-bold text-gray-900 mb-2">About</h2>
              <p class="text-sm text-gray-600">
                {{ business?.description || "No description provided." }}
              </p>
            </div>

            <!-- Services -->
            <div class="bg-white border border-gray-200 rounded-xl p-5 mb-5">
              <h2 class="text-base font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <div v-if="services.length > 0" class="grid grid-cols-2 gap-3">
                <div
                  v-for="service in services"
                  :key="service.id"
                  class="border border-gray-100 rounded-xl p-4"
                >
                  <p class="text-sm font-semibold text-gray-800">
                    {{ service.name }}
                  </p>
                  <p class="text-xs text-gray-400 mt-0.5">
                    {{ service.category }}
                  </p>
                  <div class="flex items-center justify-between mt-3">
                    <span class="text-xs text-gray-400"
                      >{{ service.duration }} min</span
                    >
                    <span class="text-sm font-bold text-blue-600"
                      >KSh {{ service.price }}</span
                    >
                  </div>
                </div>
              </div>
              <p v-else class="text-sm text-gray-400">
                No services listed yet.
              </p>
            </div>

            <!-- Location -->
            <div class="bg-white border border-gray-200 rounded-xl p-5">
              <h2 class="text-base font-bold text-gray-900 mb-4">Locations</h2>
              <div v-if="branches.length > 0" class="space-y-3">
                <div
                  v-for="branch in branches"
                  :key="branch.id"
                  class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <svg
                    class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p class="text-sm font-semibold text-gray-800">
                      {{ branch.name }}
                    </p>
                    <p class="text-xs text-gray-500 mt-0.5">
                      {{ branch.address }}
                    </p>
                    <p v-if="branch.phone" class="text-xs text-blue-600 mt-1">
                      {{ branch.phone }}
                    </p>
                  </div>
                </div>
              </div>
              <p v-else class="text-sm text-gray-400">
                No locations listed yet.
              </p>
            </div>
          </div>

          <!-- Right — Book Now Card -->
          <div class="w-64 flex-shrink-0">
            <div
              class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm sticky top-6"
            >
              <h3 class="text-base font-bold text-gray-900 mb-2">
                Ready to book?
              </h3>
              <p class="text-sm text-gray-500 mb-5">
                Choose your service and confirm in seconds.
              </p>
              <button
                @click="startBooking"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
              >
                Book Appointment
              </button>
              <div class="mt-4 pt-4 border-t border-gray-100">
                <p class="text-xs text-gray-500 text-center">
                  Booking Policy:
                  <span class="font-semibold text-gray-700 capitalize">
                    {{ business?.bookingPolicy || "Instant" }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "customer" });

const route = useRoute();
const loading = ref(true);
const business = ref(null);
const services = ref([]);
const branches = ref([]);

onMounted(async () => {
  const token =
    localStorage.getItem("token") || localStorage.getItem("auth_token");

  if (!token) {
    navigateTo("/auth/login");
    return;
  }

  try {
    // Load business details
    const businessRes = await fetch(
      `http://localhost:3333/api/businesses/${route.params.id}`,
    );
    const businessData = await businessRes.json();
    if (businessData.data) {
      business.value = businessData.data;
    }

    // Load services — public endpoint
    const servicesRes = await fetch(
      `http://localhost:3333/api/businesses/${route.params.id}/services`,
    );
    const servicesData = await servicesRes.json();
    if (servicesData.data) {
      services.value = servicesData.data;
    }

    // Load branches — needs auth
    const branchesRes = await fetch(
      `http://localhost:3333/api/businesses/${route.params.id}/branches`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );
    const branchesData = await branchesRes.json();
    if (branchesData.data) {
      branches.value = branchesData.data;
    }
  } catch (error) {
    console.error("Failed to fetch business details:", error);
  } finally {
    loading.value = false;
  }
});

const startBooking = () => {
  navigateTo(`/customer/book/${route.params.id}`);
};
</script>
