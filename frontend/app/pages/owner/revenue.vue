<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Left Sidebar — same as dashboard -->
    <div
      class="w-52 min-h-screen bg-white border-r border-gray-200 flex flex-col"
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
            <p class="text-xs text-gray-400">Business Suite</p>
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
          @click="navigateTo('/owner/dashboard')"
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
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          Overview
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Revenue
        </button>
        <button
          @click="navigateTo('/owner/staff')"
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Staff
        </button>
        <button
          @click="navigateTo('/owner/reviews')"
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
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          Reviews
        </button>
        <button
          @click="navigateTo('/owner/bookings')"
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
          Bookings List
        </button>
        <button
          @click="navigateTo('/owner/trends')"
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
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          Trends
        </button>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Bar -->
      <header
        class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between"
      >
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
            type="text"
            placeholder="Search transactions..."
            class="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
          />
        </div>
        <div class="flex items-center gap-3">
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            <svg
              class="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export CSV
          </button>
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition"
          >
            <svg
              class="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Generate Report
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
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-xs font-semibold">A</span>
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-800">Alex Sterling</p>
              <p class="text-xs text-gray-400">Owner</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-xl font-bold text-gray-900">Command Center</h1>
          <div class="flex items-center gap-2 mt-1">
            <div class="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                @click="dayFilter = 7"
                class="px-3 py-1.5 text-xs font-medium transition"
                :class="
                  dayFilter === 7
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:bg-gray-50'
                "
              >
                7 Days
              </button>
              <button
                @click="dayFilter = 30"
                class="px-3 py-1.5 text-xs font-medium transition"
                :class="
                  dayFilter === 30
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:bg-gray-50'
                "
              >
                30 Days
              </button>
            </div>
          </div>
        </div>

        <!-- Revenue Summary + Live Update -->
        <div class="flex gap-4 mb-6">
          <!-- Chart Section -->
          <div class="flex-1 bg-white border border-gray-200 rounded-xl p-5">
            <div class="mb-2">
              <p class="text-xs text-gray-500">Total Revenue This Week</p>
              <p class="text-3xl font-bold text-gray-900">
                ${{ totalRevenue.toLocaleString() }}
              </p>
              <p class="text-xs text-green-600 font-medium mt-0.5">
                ↑ +14.2% from last week
              </p>
            </div>

            <!-- Bar Chart -->
            <div class="flex items-end gap-2 h-36 mt-4">
              <div
                v-for="(bar, i) in chartData"
                :key="i"
                class="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  class="w-full flex flex-col justify-end"
                  style="height: 120px"
                >
                  <div
                    class="w-full bg-blue-200 rounded-t transition-all duration-500"
                    :style="{ height: (bar.value / maxChart) * 110 + 'px' }"
                  ></div>
                </div>
                <p class="text-xs text-gray-400">{{ bar.label }}</p>
              </div>
            </div>
          </div>

          <!-- Live Update Panel -->
          <div class="w-64 space-y-3">
            <div class="bg-blue-600 rounded-xl p-4 text-white">
              <div class="flex items-center justify-between mb-1">
                <p
                  class="text-xs font-semibold text-blue-200 uppercase tracking-wide"
                >
                  Live Update
                </p>
                <span
                  class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                ></span>
              </div>
              <p class="text-xs text-blue-200 mb-3">Total Completed</p>
              <p class="text-2xl font-bold">
                ${{ completed.toLocaleString() }}
              </p>
              <p class="text-xs text-blue-200 mt-1">
                {{ completedCount }} Transactions
              </p>
            </div>
            <div class="bg-white border border-gray-200 rounded-xl p-4">
              <p class="text-xs text-gray-500 mb-1">Total Pending</p>
              <p class="text-xl font-bold text-gray-900">
                ${{ pending.toLocaleString() }}
              </p>
              <p class="text-xs text-gray-400 mt-1">
                {{ pendingCount }} Transactions
              </p>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="bg-white border border-gray-200 rounded-xl mb-6">
          <div
            class="px-5 py-4 border-b border-gray-100 flex items-center justify-between"
          >
            <h3 class="text-sm font-bold text-gray-800">Recent Transactions</h3>
            <div class="flex items-center gap-2">
              <button
                class="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
              >
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                  />
                </svg>
                Filter
              </button>
              <button
                class="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                Newest First
              </button>
            </div>
          </div>
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-100">
                <th
                  class="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                >
                  Customer Name
                </th>
                <th
                  class="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                >
                  Service
                </th>
                <th
                  class="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                >
                  Date
                </th>
                <th
                  class="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                >
                  Status
                </th>
                <th
                  class="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="tx in transactions"
                :key="tx.id"
                class="border-b border-gray-50 hover:bg-gray-50 transition"
              >
                <td class="px-5 py-3">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center"
                    >
                      <span class="text-blue-600 text-xs font-semibold">{{
                        tx.customer[0]
                      }}</span>
                    </div>
                    <p class="text-xs font-medium text-gray-800">
                      {{ tx.customer }}
                    </p>
                  </div>
                </td>
                <td class="px-5 py-3">
                  <p class="text-xs text-gray-600">{{ tx.service }}</p>
                </td>
                <td class="px-5 py-3">
                  <p class="text-xs text-gray-600">{{ tx.date }}</p>
                </td>
                <td class="px-5 py-3">
                  <span
                    class="text-xs font-semibold px-2.5 py-1 rounded-full"
                    :class="{
                      'bg-green-100 text-green-700': tx.status === 'Completed',
                      'bg-orange-100 text-orange-700': tx.status === 'Pending',
                      'bg-red-100 text-red-700': tx.status === 'Failed',
                    }"
                  >
                    {{ tx.status }}
                  </span>
                </td>
                <td class="px-5 py-3">
                  <p class="text-xs font-semibold text-gray-800">
                    ${{ tx.amount.toLocaleString() }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="px-5 py-3 border-t border-gray-100">
            <p class="text-xs text-gray-400">Showing 5 of 152 transactions</p>
          </div>
        </div>

        <!-- Bottom Metrics -->
        <div class="grid grid-cols-4 gap-4">
          <div
            v-for="metric in bottomMetrics"
            :key="metric.label"
            class="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3"
          >
            <div
              class="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0"
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
                  :d="metric.icon"
                />
              </svg>
            </div>
            <div>
              <p class="text-base font-bold text-gray-900">
                {{ metric.value }}
              </p>
              <p class="text-xs text-gray-400">{{ metric.label }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

const dayFilter = ref(7);

const totalRevenue = ref(12845);
const completed = ref(9420);
const completedCount = ref(124);
const pending = ref(3425);
const pendingCount = ref(28);

const chartData = [
  { label: "Mon", value: 1200 },
  { label: "Tue", value: 1800 },
  { label: "Wed", value: 1500 },
  { label: "Thu", value: 900 },
  { label: "Fri", value: 2200 },
  { label: "Sat", value: 1700 },
  { label: "Sun", value: 800 },
];

const maxChart = computed(() => Math.max(...chartData.map((b) => b.value)));

const transactions = ref([
  {
    id: 1,
    customer: "Elena Salvatore",
    service: "Premium Consultation",
    date: "Oct 24, 2023",
    status: "Completed",
    amount: 450,
  },
  {
    id: 2,
    customer: "Marcus Johnson",
    service: "On-Site Workshop",
    date: "Oct 24, 2023",
    status: "Pending",
    amount: 1200,
  },
  {
    id: 3,
    customer: "Sarah Chen",
    service: "Quarterly Audit",
    date: "Oct 23, 2023",
    status: "Completed",
    amount: 850,
  },
  {
    id: 4,
    customer: "Tom Brooks",
    service: "Maintenance Plan",
    date: "Oct 23, 2023",
    status: "Failed",
    amount: 99,
  },
  {
    id: 5,
    customer: "Linda Watson",
    service: "Strategy Session",
    date: "Oct 22, 2023",
    status: "Pending",
    amount: 600,
  },
]);

const bottomMetrics = [
  {
    label: "Avg. Transaction",
    value: "$103.59",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    label: "Approval Time",
    value: "1.2 hrs",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    label: "Refund Rate",
    value: "0.8%",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
  {
    label: "Projection",
    value: "$15.2k",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];
</script>
