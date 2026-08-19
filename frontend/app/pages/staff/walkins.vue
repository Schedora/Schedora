<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Left Sidebar -->
    <div
      class="w-56 min-h-screen bg-white border-r border-gray-200 flex flex-col"
    >
      <div class="p-5 border-b border-gray-200">
        <div class="flex items-center gap-2">
          <div
            class="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-blue-600">Schedora</p>
            <p class="text-xs text-gray-400">Schedora Staff</p>
          </div>
        </div>
      </div>
      <nav class="flex-1 p-3 space-y-1">
        <button
          @click="navigateTo('/customer/business/1')"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </button>
        <button
          @click="navigateTo('/staff/schedule')"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Schedule
        </button>
        <button
          @click="navigateTo('/staff/attendance')"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          Attendance
        </button>
        <button
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white"
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Walk-ins
        </button>
        <button
          @click="navigateTo('/staff/notifications')"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
        >
          <div class="relative">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
            ></span>
          </div>
          Notifications
        </button>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navigation -->
      <header
        class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between"
      >
        <h1 class="text-base font-bold text-blue-600">Walk-ins Registry</h1>
        <div class="flex items-center gap-3">
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <div
            class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-4 h-4 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 flex gap-6 p-6">
        <!-- Left — Register Walk-in Form -->
        <div class="flex-1">
          <div class="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h2 class="text-base font-bold text-gray-900 mb-1">
              Register Walk-in
            </h2>
            <p class="text-sm text-gray-500 mb-5">
              Fill in the customer details below to instantly add them to
              today's queue.
            </p>

            <div class="space-y-4">
              <!-- Customer Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Customer Name</label
                >
                <input
                  v-model="form.customerName"
                  type="text"
                  placeholder="e.g. Jonathan Doe"
                  class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  :class="
                    errors.customerName ? 'border-red-400' : 'border-gray-300'
                  "
                />
                <p v-if="errors.customerName" class="text-red-500 text-xs mt-1">
                  {{ errors.customerName }}
                </p>
              </div>

              <!-- Service Type — pulled from business service catalog -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Service Type</label
                >
                <select
                  v-model="form.serviceType"
                  class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  :class="
                    errors.serviceType ? 'border-red-400' : 'border-gray-300'
                  "
                >
                  <option value="">Select a service...</option>
                  <option
                    v-for="service in availableServices"
                    :key="service"
                    :value="service"
                  >
                    {{ service }}
                  </option>
                </select>
                <p v-if="errors.serviceType" class="text-red-500 text-xs mt-1">
                  {{ errors.serviceType }}
                </p>
              </div>

              <!-- Date and Time -->
              <div class="flex gap-3">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Date</label
                  >
                  <input
                    v-model="form.date"
                    type="date"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Time</label
                  >
                  <input
                    v-model="form.time"
                    type="time"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <!-- Sync note -->
              <div
                class="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-start gap-2"
              >
                <svg
                  class="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <p class="text-xs text-blue-600">
                  Submissions automatically sync to the global schedule and
                  notify available staff.
                </p>
              </div>

              <!-- Submit Button -->
              <button
                @click="logWalkin"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2"
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
                Log Walk-in Entry
              </button>
            </div>
          </div>

          <!-- Recent Submissions -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-bold text-gray-800">
                Recent Submissions
              </h3>
              <button
                class="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View Full Log
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
            </div>

            <!-- Submission cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div
                v-for="(submission, index) in recentSubmissions"
                :key="index"
                class="bg-white border border-gray-200 rounded-xl p-3"
              >
                <p class="text-xs font-semibold text-gray-800 truncate">
                  {{ submission.customerName }}
                </p>
                <p class="text-xs text-gray-400 mt-0.5">
                  {{ submission.serviceType }}
                </p>
                <p class="text-xs text-gray-400">{{ submission.time }}</p>
                <div class="mt-2">
                  <span
                    class="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full"
                  >
                    SYNCED
                  </span>
                </div>
              </div>

              <!-- Empty state -->
              <div
                v-if="recentSubmissions.length === 0"
                class="col-span-4 text-center py-6"
              >
                <p class="text-sm text-gray-400">
                  No walk-ins logged yet today.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel -->
        <div class="w-64 space-y-4">
          <!-- Live Queue -->
          <div class="bg-blue-600 rounded-xl p-5 text-white">
            <h3 class="text-sm font-bold mb-1">Live Queue</h3>
            <p class="text-xs text-blue-200 mb-4">
              Currently {{ liveQueue.waiting }} walk-ins waiting.
            </p>
            <div class="flex gap-4">
              <div>
                <p class="text-2xl font-bold">{{ liveQueue.totalToday }}</p>
                <p class="text-xs text-blue-200">TOTAL TODAY</p>
              </div>
              <div class="w-px bg-blue-500"></div>
              <div>
                <p class="text-2xl font-bold">{{ liveQueue.avgWait }}m</p>
                <p class="text-xs text-blue-200">AVG. WAIT</p>
              </div>
            </div>
          </div>

          <!-- Staff Availability -->
          <div class="bg-white border border-gray-200 rounded-xl p-5">
            <div class="flex items-center gap-2 mb-2">
              <div
                class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-bold text-gray-800">
                  Staff Availability
                </p>
                <p class="text-xs text-gray-500">
                  {{ staffAvailability.available }} practitioners available for
                  walk-ins.
                </p>
              </div>
            </div>
          </div>

          <!-- Efficiency Card -->
          <div class="bg-teal-600 rounded-xl p-5 text-white">
            <h3 class="text-sm font-bold mb-1">Efficiency First</h3>
            <p class="text-xs text-teal-100">
              Streamlined logging reduces clerical errors by up to 40%.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

// Form state
const form = reactive({
  customerName: "",
  serviceType: "",
  date: new Date().toISOString().split("T")[0], // Defaults to today
  time: new Date().toTimeString().slice(0, 5),
});

// Validation errors
const errors = reactive({
  customerName: "",
  serviceType: "",
});

// Available services — pulled from business service catalog saved during onboarding
const availableServices = ref<string[]>([]);

// Recent submissions
const recentSubmissions = ref<
  {
    customerName: string;
    serviceType: string;
    time: string;
  }[]
>([]);

// Live Queue data
const liveQueue = reactive({
  waiting: 4,
  totalToday: 12,
  avgWait: 18,
});

// Staff availability
const staffAvailability = reactive({
  available: 3,
});

// Validate form
function validate() {
  let valid = true;
  if (!form.customerName.trim()) {
    errors.customerName = "Customer name is required";
    valid = false;
  } else {
    errors.customerName = "";
  }
  if (!form.serviceType) {
    errors.serviceType = "Please select a service";
    valid = false;
  } else {
    errors.serviceType = "";
  }
  return valid;
}

// Log walk-in entry
function logWalkin() {
  if (!validate()) return;

  // Add to recent submissions with SYNCED badge
  recentSubmissions.value.unshift({
    customerName: form.customerName,
    serviceType: form.serviceType,
    time: form.time,
  });

  // Update live queue
  liveQueue.totalToday++;
  liveQueue.waiting++;

  // Reset form but keep today's date
  form.customerName = "";
  form.serviceType = "";
  form.time = new Date().toTimeString().slice(0, 5);

  // In production this calls POST /api/bookings/walkin
}

// Load services from localStorage (saved during onboarding)
onMounted(() => {
  // Check if pre-filled from Attend Now button on schedule page
  const pending = localStorage.getItem("pending_walkin");
  if (pending) {
    const data = JSON.parse(pending);
    form.customerName = data.name || "";
    form.serviceType = data.service || "";
    localStorage.removeItem("pending_walkin");
  }

  // Load services from onboarding
  const savedServices = localStorage.getItem("onboarding_services");
  if (savedServices) {
    const services = JSON.parse(savedServices);
    availableServices.value = services.map((s: { name: string }) => s.name);
  } else {
    // Fallback sample services
    availableServices.value = [
      "Haircut & Styling",
      "Full Spa Treatment",
      "Massage Therapy",
      "Skin Consultation",
      "Facial & Grooming",
      "Nail Care",
    ];
  }

  // Load existing submissions for today
  const savedSubmissions = localStorage.getItem("walkin_submissions");
  if (savedSubmissions) {
    recentSubmissions.value = JSON.parse(savedSubmissions);
  }
});
</script>
