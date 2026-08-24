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
            <p class="text-xs text-gray-400">Staff Dashboard</p>
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
          @click="navigateTo('/staff/walkins')"
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Walk-ins
        </button>
        <button
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white"
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
              v-if="hasUnread"
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
        <h1 class="text-base font-bold text-gray-800">Notifications</h1>
        <div class="flex items-center gap-3">
          <!-- Search bar -->
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
              placeholder="Search activities..."
              class="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            />
          </div>
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
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-xs font-semibold">A</span>
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-800">Alex Rivera</p>
              <p class="text-xs text-gray-400">Operations Lead</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Activity Stream -->
      <main class="flex-1 p-6 max-w-4xl">
        <!-- Page title and actions -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-900">Activity Stream</h2>
            <p class="text-sm text-gray-500 mt-0.5">
              Stay updated with customer bookings and schedule changes.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <!-- Filter button -->
            <button
              @click="showFilter = !showFilter"
              class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
              Filter
            </button>
            <!-- Mark All Read -->
            <button
              @click="markAllRead"
              class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
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
              Mark All Read
            </button>
          </div>
        </div>

        <!-- Filter dropdown -->
        <div
          v-if="showFilter"
          class="bg-white border border-gray-200 rounded-xl p-4 mb-4 flex gap-3"
        >
          <button
            v-for="type in filterTypes"
            :key="type.value"
            @click="activeFilter = type.value"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition"
            :class="
              activeFilter === type.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            "
          >
            {{ type.label }}
          </button>
        </div>

        <!-- TODAY Section -->
        <div v-if="todayNotifications.length > 0" class="mb-6">
          <p
            class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3"
          >
            Today
          </p>
          <div class="space-y-3">
            <div
              v-for="notification in todayNotifications"
              :key="notification.id"
              class="bg-white border rounded-xl p-4 flex items-start gap-4 transition"
              :class="notification.read ? 'border-gray-200' : 'border-blue-200'"
            >
              <!-- Icon -->
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                :class="getIconBg(notification.type)"
              >
                <svg
                  class="w-5 h-5"
                  :class="getIconColor(notification.type)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="getIconPath(notification.type)"
                  />
                </svg>
              </div>

              <!-- Content -->
              <div class="flex-1">
                <div class="flex items-center justify-between mb-1">
                  <p
                    class="text-xs font-bold text-gray-700 uppercase tracking-wide"
                  >
                    {{ notification.title }}
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ notification.timeAgo }}
                  </p>
                </div>
                <p class="text-sm text-gray-800">
                  <span class="font-semibold">{{
                    notification.customerName
                  }}</span>
                  {{ notification.message }}
                </p>
                <!-- SLOT FREED UP tag for cancellations -->
                <div v-if="notification.type === 'cancelled'" class="mt-2">
                  <span
                    class="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full"
                  >
                    SLOT FREED UP
                  </span>
                </div>
                <!-- View Details button for new bookings -->
                <div v-if="notification.type === 'confirmed'" class="mt-2">
                  <button
                    class="text-xs font-medium text-blue-600 border border-blue-200 px-3 py-1 rounded-lg hover:bg-blue-50 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- YESTERDAY Section -->
        <div v-if="yesterdayNotifications.length > 0" class="mb-6">
          <p
            class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3"
          >
            Yesterday
          </p>
          <div class="space-y-3">
            <div
              v-for="notification in yesterdayNotifications"
              :key="notification.id"
              class="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-4"
            >
              <!-- Icon -->
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                :class="getIconBg(notification.type)"
              >
                <svg
                  class="w-5 h-5"
                  :class="getIconColor(notification.type)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="getIconPath(notification.type)"
                  />
                </svg>
              </div>

              <!-- Content -->
              <div class="flex-1">
                <div class="flex items-center justify-between mb-1">
                  <p
                    class="text-xs font-bold text-gray-700 uppercase tracking-wide"
                  >
                    {{ notification.title }}
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ notification.timeAgo }}
                  </p>
                </div>
                <p class="text-sm text-gray-800">
                  <span class="font-semibold">{{
                    notification.customerName
                  }}</span>
                  {{ notification.message }}
                </p>
                <div v-if="notification.type === 'cancelled'" class="mt-2">
                  <span
                    class="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full"
                  >
                    SLOT FREED UP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load older notifications -->
        <div
          class="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center"
        >
          <svg
            class="w-8 h-8 text-gray-300 mx-auto mb-2"
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
          <p class="text-sm text-gray-400 mb-2">
            Showing activities from the last 7 days
          </p>
          <button
            @click="loadOlderNotifications"
            class="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Load older notifications
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

// Search
const searchQuery = ref("");

// Filter
const showFilter = ref(false);
const activeFilter = ref("all");
const filterTypes = [
  { label: "All", value: "all" },
  { label: "New Bookings", value: "confirmed" },
  { label: "Rescheduled", value: "rescheduled" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Recurring", value: "recurring" },
];

// Unread state
const hasUnread = ref(true);

// Mark all as read
function markAllRead() {
  notifications.value.forEach((n) => (n.read = true));
  hasUnread.value = false;
}

// All notifications
const notifications = ref([
  {
    id: 1,
    type: "confirmed",
    title: "New Appointment Confirmed",
    customerName: "Jordan Smith",
    message: 'booked a "Standard Grooming" session for July 24 at 10:00 AM.',
    timeAgo: "2 mins ago",
    day: "today",
    read: false,
  },
  {
    id: 2,
    type: "rescheduled",
    title: "Appointment Rescheduled",
    customerName: "Elena Rodriguez",
    message: 'moved her "Consultation" from 2:00 PM to 4:30 PM today.',
    timeAgo: "15 mins ago",
    day: "today",
    read: false,
  },
  {
    id: 3,
    type: "cancelled",
    title: "Booking Cancelled",
    customerName: "Marcus Chen",
    message: 'cancelled the "Deep Cleaning" service scheduled for tomorrow.',
    timeAgo: "Yesterday, 5:42 PM",
    day: "yesterday",
    read: true,
  },
  {
    id: 4,
    type: "recurring",
    title: "Appointment Confirmed",
    customerName: "Sarah Jenkins",
    message: 'booked a recurring weekly "Tutoring Session".',
    timeAgo: "Yesterday, 2:15 PM",
    day: "yesterday",
    read: true,
  },
]);

// Filter notifications by search and active filter
const filteredNotifications = computed(() => {
  return notifications.value.filter((n) => {
    const matchesFilter =
      activeFilter.value === "all" || n.type === activeFilter.value;
    const matchesSearch =
      !searchQuery.value ||
      n.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesFilter && matchesSearch;
  });
});

// Today's notifications
const todayNotifications = computed(() =>
  filteredNotifications.value.filter((n) => n.day === "today"),
);

// Yesterday's notifications
const yesterdayNotifications = computed(() =>
  filteredNotifications.value.filter((n) => n.day === "yesterday"),
);

// Load older notifications
function loadOlderNotifications() {
  // In production this calls GET /api/notifications/staff/:id with pagination
  alert("Loading older notifications...");
}

// Icon helpers
function getIconBg(type: string) {
  const map: Record<string, string> = {
    confirmed: "bg-teal-100",
    rescheduled: "bg-blue-100",
    cancelled: "bg-red-100",
    recurring: "bg-teal-100",
  };
  return map[type] || "bg-gray-100";
}

function getIconColor(type: string) {
  const map: Record<string, string> = {
    confirmed: "text-teal-600",
    rescheduled: "text-blue-600",
    cancelled: "text-red-500",
    recurring: "text-teal-600",
  };
  return map[type] || "text-gray-500";
}

function getIconPath(type: string) {
  const map: Record<string, string> = {
    confirmed: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    rescheduled:
      "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    cancelled:
      "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    recurring: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  };
  return (
    map[type] ||
    "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
  );
}
</script>
