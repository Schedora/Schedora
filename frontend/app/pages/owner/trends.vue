<template>
  <div class="p-6 max-w-7xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <p class="text-sm text-gray-500 mb-1">
          Dashboard › <span class="text-gray-700">Trends</span>
        </p>
        <h1 class="text-2xl font-bold text-gray-900">Revenue Trends</h1>
        <p class="text-gray-600 mt-1">
          Track revenue performance and identify growth opportunities
        </p>
      </div>
      <div class="flex items-center gap-3">
        <!-- Notification Bell -->
        <button class="relative w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
          🔔
          <span class="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button
          @click="exportCSV"
          class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          📥 Export CSV
        </button>
        <button
          @click="generateReport"
          class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          📊 Generate Report
        </button>
      </div>
    </div>

    <!-- Period Toggle + Date Picker -->
    <div class="flex flex-wrap items-center gap-4 mb-8">
      <div class="flex items-center bg-gray-100 rounded-xl p-1">
        <button
          @click="period = 'weekly'"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="period === 'weekly'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'"
        >
          Weekly
        </button>
        <button
          @click="period = 'monthly'"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="period === 'monthly'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'"
        >
          Monthly
        </button>
      </div>

      <!-- Custom Date Picker -->
      <div class="flex items-center gap-2">
        <input
          v-model="dateFrom"
          type="date"
          class="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span class="text-gray-400">to</span>
        <input
          v-model="dateTo"
          type="date"
          class="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="applyDateRange"
          class="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Apply
        </button>
      </div>
    </div>

    <!-- Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      <!-- Total Revenue -->
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-3">
          <p class="text-sm text-gray-500">Total Revenue</p>
          <span class="text-green-500 text-sm font-medium">↑ 12%</span>
        </div>
        <p class="text-2xl font-bold text-gray-900">
          KSh {{ totalRevenue.toLocaleString() }}
        </p>
        <p class="text-xs text-gray-400 mt-1">vs last {{ period === 'weekly' ? 'week' : 'month' }}</p>
      </div>

      <!-- Completed Revenue -->
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-3">
          <p class="text-sm text-gray-500">Completed</p>
          <span class="text-green-500 text-sm font-medium">↑ 8%</span>
        </div>
        <p class="text-2xl font-bold text-gray-900">
          KSh {{ completedRevenue.toLocaleString() }}
        </p>
        <p class="text-xs text-gray-400 mt-1">From completed bookings</p>
      </div>

      <!-- Pending Revenue -->
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-3">
          <p class="text-sm text-gray-500">Pending</p>
          <span
            class="text-sm font-medium"
            :class="pendingRevenue > 0 ? 'text-orange-500' : 'text-gray-400'"
          >
            {{ pendingRevenue > 0 ? '⚠️' : '—' }}
          </span>
        </div>
        <p
          class="text-2xl font-bold"
          :class="pendingRevenue > 0 ? 'text-orange-600' : 'text-gray-900'"
        >
          KSh {{ pendingRevenue.toLocaleString() }}
        </p>
        <p class="text-xs text-gray-400 mt-1">Awaiting completion</p>
      </div>

      <!-- Total Bookings -->
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-3">
          <p class="text-sm text-gray-500">Total Bookings</p>
          <span class="text-green-500 text-sm font-medium">↑ 5%</span>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ totalBookings }}</p>
        <p class="text-xs text-gray-400 mt-1">This {{ period === 'weekly' ? 'week' : 'month' }}</p>
      </div>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

      <!-- Revenue Performance Chart -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-semibold text-gray-900">Revenue Performance</h3>
          <select
            v-model="chartRange"
            class="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="14">Last 14 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>

        <!-- Legend -->
        <div class="flex items-center gap-6 mb-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span class="text-xs text-gray-500">Completed</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span class="text-xs text-gray-500">Pending</span>
          </div>
        </div>

        <!-- Simple Bar Chart -->
        <div class="flex items-end justify-between gap-2 h-40">
          <div
            v-for="(day, index) in chartData"
            :key="index"
            class="flex-1 flex flex-col items-center gap-1"
          >
            <div class="w-full flex flex-col items-center gap-0.5">
              <div
                class="w-full bg-blue-600 rounded-t-sm transition-all"
                :style="{ height: `${day.completedHeight}px` }"
              />
              <div
                class="w-full bg-orange-400 rounded-b-sm transition-all"
                :style="{ height: `${day.pendingHeight}px` }"
              />
            </div>
            <span class="text-xs text-gray-400">{{ day.label }}</span>
          </div>
        </div>
      </div>

      <!-- Revenue by Service -->
      <div class="bg-white rounded-2xl border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-semibold text-gray-900">Revenue by Service</h3>
        </div>

        <div class="space-y-4">
          <div
            v-for="service in revenueByService"
            :key="service.name"
          >
            <div class="flex justify-between items-center mb-1">
              <span class="text-sm text-gray-700">{{ service.name }}</span>
              <span class="text-sm font-semibold text-gray-900">
                KSh {{ service.revenue.toLocaleString() }}
              </span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-blue-600 h-2 rounded-full transition-all"
                :style="{ width: `${service.percentage}%` }"
              />
            </div>
            <p class="text-xs text-gray-400 mt-1">{{ service.percentage }}% of total</p>
          </div>
        </div>

        <button class="w-full mt-6 text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
          View Full Breakdown →
        </button>
      </div>

    </div>

    <!-- Recent Performance Data Table -->
    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div class="flex items-center justify-between p-6 border-b border-gray-100">
        <h3 class="font-semibold text-gray-900">Recent Performance Data</h3>
        <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View History →
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Date</th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Service</th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Bookings</th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Completed Revenue</th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Pending Revenue</th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Trend</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr
              v-for="row in performanceData"
              :key="row.date + row.service"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm text-gray-700">{{ row.date }}</td>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ row.service }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ row.bookings }}</td>
              <td class="px-6 py-4 text-sm font-semibold text-green-700">
                KSh {{ row.completedRevenue.toLocaleString() }}
              </td>
              <td class="px-6 py-4">
                <span
                  class="text-sm font-semibold"
                  :class="row.pendingRevenue > 0 ? 'text-orange-600' : 'text-gray-400'"
                >
                  {{ row.pendingRevenue > 0 ? `KSh ${row.pendingRevenue.toLocaleString()}` : '—' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span
                  class="text-sm font-semibold"
                  :class="row.trend === 'up' ? 'text-green-600' : 'text-red-500'"
                >
                  {{ row.trend === 'up' ? '↑' : '↓' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
const period = ref('weekly')
const dateFrom = ref('')
const dateTo = ref('')
const chartRange = ref('7')

// Fetch data
onMounted(async () => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!token || user.role !== 'owner') {
    navigateTo('/auth/login')
    return
  }
})

// Metric cards - mock data for now
const totalRevenue = computed(() => period.value === 'weekly' ? 45000 : 180000)
const completedRevenue = computed(() => period.value === 'weekly' ? 38000 : 152000)
const pendingRevenue = computed(() => period.value === 'weekly' ? 7000 : 28000)
const totalBookings = computed(() => period.value === 'weekly' ? 24 : 96)

// Chart data
const chartData = computed(() => {
  const days = period.value === 'weekly'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['W1', 'W2', 'W3', 'W4']

  return days.map((label) => ({
    label,
    completedHeight: Math.floor(Math.random() * 80) + 20,
    pendingHeight: Math.floor(Math.random() * 30) + 5,
  }))
})

// Revenue by service
const revenueByService = ref([
  { name: 'Hair Cut', revenue: 18000, percentage: 40 },
  { name: 'Colour Treatment', revenue: 13500, percentage: 30 },
  { name: 'Manicure', revenue: 9000, percentage: 20 },
  { name: 'Other Services', revenue: 4500, percentage: 10 },
])

// Performance table data
const performanceData = ref([
  { date: 'Mon, Aug 25', service: 'Hair Cut', bookings: 6, completedRevenue: 9000, pendingRevenue: 0, trend: 'up' },
  { date: 'Tue, Aug 26', service: 'Colour Treatment', bookings: 4, completedRevenue: 8000, pendingRevenue: 2000, trend: 'up' },
  { date: 'Wed, Aug 27', service: 'Manicure', bookings: 3, completedRevenue: 4500, pendingRevenue: 1500, trend: 'down' },
  { date: 'Thu, Aug 28', service: 'Hair Cut', bookings: 5, completedRevenue: 7500, pendingRevenue: 0, trend: 'up' },
  { date: 'Fri, Aug 29', service: 'Colour Treatment', bookings: 6, completedRevenue: 9000, pendingRevenue: 3500, trend: 'down' },
])

const applyDateRange = () => {
  if (!dateFrom.value || !dateTo.value) return
  // Filter logic would go here
  alert(`Showing data from ${dateFrom.value} to ${dateTo.value}`)
}

// Export CSV
const exportCSV = () => {
  const headers = ['Date', 'Service', 'Bookings', 'Completed Revenue', 'Pending Revenue', 'Trend']
  const rows = performanceData.value.map((r) => [
    r.date,
    r.service,
    r.bookings,
    r.completedRevenue,
    r.pendingRevenue,
    r.trend,
  ])

  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'trends.csv'
  a.click()
}

const generateReport = () => {
  alert('Report generation coming soon!')
}
</script>