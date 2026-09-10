<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Left Sidebar -->
    <div
      class="w-56 min-h-screen bg-white border-r border-gray-200 flex flex-col"
    >
      <!-- Logo -->
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
            <p class="text-xs text-gray-400">Daily Operations</p>
          </div>
        </div>
      </div>

      <!-- Nav Links -->
      <nav class="flex-1 p-3 space-y-1">
        <!-- Home — takes staff to business homepage -->
        <button
          @click="navigateTo('/customer/business/' + businessId)"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition"
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

        <!-- Schedule — active -->
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Schedule
        </button>

        <!-- Attendance -->
        <button
          @click="navigateTo('/staff/attendance')"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition"
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

        <!-- Walk-ins -->
        <button
          @click="navigateTo('/staff/walkins')"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition"
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

        <!-- Notifications with red dot -->
        <button
          @click="navigateTo('/staff/notifications')"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition relative"
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
            <!-- Red dot — shows when there are unread notifications -->
            <span
              v-if="hasUnreadNotifications"
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
        <h1 class="text-base font-bold text-gray-800">Daily Schedule</h1>
        <div class="flex items-center gap-3">
          <!-- Search -->
          <div class="relative">
            <svg
              class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
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
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search appointments..."
              class="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            />
          </div>
          <!-- Help -->
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
          <!-- Settings -->
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
          <!-- Avatar -->
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-xs font-semibold">S</span>
            </div>
            <div class="text-right">
              <p class="text-xs font-semibold text-gray-800">Sarah Jenkins</p>
              <p class="text-xs text-gray-400">Senior Specialist</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Schedule Content -->
      <div class="flex-1 flex gap-4 p-6">
        <!-- Left — Schedule Table -->
        <div
          class="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden"
        >
          <!-- Date Header -->
          <div
            class="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-bold text-gray-900">
                  {{ formattedDate }}
                </p>
                <p class="text-xs text-gray-400">
                  You have {{ filteredAppointments.length }} appointments today
                </p>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex items-center gap-2">
              <button
                @click="changeDay(-1)"
                class="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
              >
                <svg
                  class="w-3 h-3 text-gray-500"
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
              </button>
              <button
                @click="goToToday"
                class="px-3 py-1 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Today
              </button>
              <button
                @click="changeDay(1)"
                class="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
              >
                <svg
                  class="w-3 h-3 text-gray-500"
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
          </div>

          <!-- Table -->
          <!-- Loading state -->
          <tr v-if="isLoading">
            <td colspan="4" class="px-6 py-12 text-center">
              <div class="flex items-center justify-center gap-2 text-blue-600">
                <svg
                  class="w-5 h-5 animate-spin"
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
                <span class="text-sm">Loading schedule...</span>
              </div>
            </td>
          </tr>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-100">
                  <th
                    class="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                  >
                    Customer Name
                  </th>
                  <th
                    class="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                  >
                    Type of Service
                  </th>
                  <th
                    class="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                  >
                    Time
                  </th>
                  <th
                    class="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="appointment in filteredAppointments"
                  :key="appointment.id"
                  class="border-b border-gray-50 hover:bg-gray-50 transition"
                >
                  <!-- Customer Name -->
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                        :style="{
                          backgroundColor:
                            getAvatarColor(appointment.customerName) + '20',
                          color: getAvatarColor(appointment.customerName),
                        }"
                      >
                        {{ getInitials(appointment.customerName) }}
                      </div>
                      <span class="text-sm font-medium text-gray-800">{{
                        appointment.customerName
                      }}</span>
                    </div>
                  </td>

                  <!-- Service Type -->
                  <td class="px-6 py-4">
                    <span
                      class="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600"
                    >
                      {{ appointment.serviceType }}
                    </span>
                  </td>

                  <!-- Time -->
                  <td class="px-6 py-4">
                    <span class="text-sm text-gray-600">{{
                      appointment.time
                    }}</span>
                  </td>

                  <!-- Action -->
                  <td class="px-6 py-4">
                    <button
                      v-if="!appointment.completed"
                      @click="confirmMarkDone(appointment)"
                      class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                    >
                      Mark as Done
                    </button>
                    <span
                      v-else
                      class="text-xs font-semibold text-green-600 flex items-center gap-1"
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Completed
                    </span>
                  </td>
                </tr>

                <!-- Empty state -->
                <tr v-if="filteredAppointments.length === 0">
                  <td
                    colspan="4"
                    class="px-6 py-12 text-center text-sm text-gray-400"
                  >
                    No appointments for this day.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Bottom Bar -->
          <div
            class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-6"
          >
            <div>
              <p class="text-xs text-gray-400">Estimated Revenue</p>
              <p class="text-base font-bold text-blue-600">
                ${{ estimatedRevenue.toFixed(2) }}
              </p>
            </div>
            <div class="w-px h-8 bg-gray-200"></div>
            <div>
              <p class="text-xs text-gray-400">Completed</p>
              <p class="text-base font-bold text-gray-800">
                {{ completedCount }} / {{ appointments.length }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Panel -->
        <div class="w-56 space-y-4">
          <!-- Total Bookings Today -->
          <div class="bg-blue-600 rounded-xl p-4 text-white">
            <p
              class="text-xs font-medium text-blue-200 uppercase tracking-wide mb-1"
            >
              Total Bookings Today
            </p>
            <p class="text-3xl font-bold">{{ appointments.length }}</p>
            <p class="text-xs text-blue-200 mt-1">+2 from yesterday</p>
          </div>

          <!-- Staff Utilization -->
          <div class="bg-white border border-gray-200 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <p class="text-xs font-semibold text-gray-700">
                Staff Utilization
              </p>
              <svg
                class="w-4 h-4 text-gray-400"
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
            </div>
            <p class="text-2xl font-bold text-gray-800">
              {{ utilizationPercent }}%
            </p>
            <div class="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div
                class="bg-blue-600 h-1.5 rounded-full transition-all"
                :style="{ width: utilizationPercent + '%' }"
              ></div>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              {{ completedCount }}/{{ appointments.length }} hours booked
            </p>
          </div>

          <!-- Pending Walk-in Alert -->
          <div
            v-if="pendingWalkin"
            class="bg-teal-500 rounded-xl p-4 text-white"
          >
            <div class="flex items-center gap-2 mb-2">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <p class="text-xs font-bold uppercase tracking-wide">
                Pending Walk-in
              </p>
            </div>
            <p class="text-xs text-teal-100 mb-3">
              {{ pendingWalkin.name }} is waiting for a
              {{ pendingWalkin.service }} in the lobby.
            </p>
            <button
              @click="attendWalkin"
              class="w-full bg-white text-teal-600 text-xs font-bold py-2 rounded-lg hover:bg-teal-50 transition"
            >
              Attend Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mark as Done Confirmation Modal -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-6 w-80 shadow-xl">
        <h3 class="text-base font-bold text-gray-900 mb-2">Mark as Done?</h3>
        <p class="text-sm text-gray-500 mb-5">
          Are you sure you want to mark
          <span class="font-semibold text-gray-800"
            >{{ selectedAppointment?.customerName }}'s</span
          >
          appointment as completed?
        </p>
        <div class="flex gap-3">
          <button
            @click="showConfirmModal = false"
            class="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            @click="markAsDone"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
const api = useApi();
const isLoading = ref(false);

// Get the logged in staff member's ID from localStorage
const staffId = computed(() => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("auth_user") || "{}");
    return user.id || null;
  }
  return null;
});
// Business ID for Home button
const businessId = ref(1);

// Search
const searchQuery = ref("");

// Unread notifications
const hasUnreadNotifications = ref(true);

// Current date
const currentDate = ref(new Date());

// Formatted date string
const formattedDate = computed(() => {
  return currentDate.value.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Navigate between days
function changeDay(direction: number) {
  const d = new Date(currentDate.value);
  d.setDate(d.getDate() + direction);
  currentDate.value = d;
}

// Go back to today
function goToToday() {
  currentDate.value = new Date();
}

// Sample appointments — will be replaced by API data
const appointments = ref<
  {
    id: number;
    customerName: string;
    serviceType: string;
    time: string;
    price: number;
    completed: boolean;
    bookingId: number;
  }[]
>([]);

// Filtered appointments based on search
const filteredAppointments = computed(() => {
  if (!searchQuery.value) return appointments.value;
  const q = searchQuery.value.toLowerCase();
  return appointments.value.filter(
    (a) =>
      a.customerName.toLowerCase().includes(q) ||
      a.serviceType.toLowerCase().includes(q),
  );
});

// Completed count
const completedCount = computed(
  () => appointments.value.filter((a) => a.completed).length,
);

// Estimated revenue — sum of completed appointments
const estimatedRevenue = computed(() =>
  appointments.value
    .filter((a) => a.completed)
    .reduce((sum, a) => sum + a.price, 0),
);

// Staff utilization percentage
const utilizationPercent = computed(() => {
  if (appointments.value.length === 0) return 0;
  return Math.round((completedCount.value / appointments.value.length) * 100);
});

// Pending walk-in
const pendingWalkin = ref<{ name: string; service: string } | null>({
  name: "Gary V.",
  service: "Haircut",
});

// Attend walk-in — navigate to walk-ins with pre-filled details
function attendWalkin() {
  if (pendingWalkin.value) {
    localStorage.setItem("pending_walkin", JSON.stringify(pendingWalkin.value));
    navigateTo("/staff/walkins");
  }
}

// Confirmation modal
const showConfirmModal = ref(false);
const selectedAppointment = ref<(typeof appointments.value)[0] | null>(null);

// Show confirmation modal
function confirmMarkDone(appointment: (typeof appointments.value)[0]) {
  selectedAppointment.value = appointment;
  showConfirmModal.value = true;
}

// Mark appointment as done after confirmation
async function markAsDone() {
  if (!selectedAppointment.value) return;

  try {
    await api.put(
      `/bookings/${selectedAppointment.value.bookingId}/complete`,
      {},
    );
    selectedAppointment.value.completed = true;
  } catch (error) {
    console.error("Failed to mark as done:", error);
    // Still mark as done locally even if API fails
    selectedAppointment.value.completed = true;
  } finally {
    showConfirmModal.value = false;
    selectedAppointment.value = null;
  }
}

// Get initials for avatar
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Get avatar colour based on name
const colours = [
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];
function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % colours.length;
  return colours[index];
}
onMounted(async () => {
  if (!staffId.value) return;

  isLoading.value = true;
  try {
    const today = currentDate.value.toISOString().split("T")[0];
    const response = await api.get(`/bookings/staff/${staffId.value}`);

    if (response.data) {
      // Filter bookings for today only
      const todayBookings = response.data.filter((b: any) => b.date === today);

      appointments.value = todayBookings.map((b: any) => ({
        id: b.id,
        bookingId: b.id,
        customerName: b.customer_name || "Customer",
        serviceType: b.service_name || "Service",
        time: b.time,
        price: b.price || 0,
        completed: b.status === "completed",
      }));
    }
  } catch (error) {
    console.error("Failed to load schedule:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
