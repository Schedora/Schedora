<template>
  <div class="p-6 max-w-7xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Bookings</h1>
        <p class="text-gray-600 mt-1">Manage all your appointments in one place</p>
      </div>
      <div class="flex items-center gap-3">
        <!-- Export CSV -->
        <button
          @click="exportCSV"
          class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          📥 Export CSV
        </button>
        <!-- Generate Report -->
        <button
          @click="generateReport"
          class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          📊 Generate Report
        </button>
      </div>
    </div>

    <!-- Mini Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
            📅
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Today's Bookings</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ todaysBookings }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 bg-yellow-50 rounded-xl flex items-center justify-center text-xl">
            ⏳
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ pendingBookings }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">

      <!-- Search Bar -->
      <div class="p-4 border-b border-gray-100">
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by reference, customer name or service..."
            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex border-b border-gray-100">
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          @click="activeFilter = tab.value"
          class="px-6 py-3 text-sm font-medium transition-colors border-b-2"
          :class="activeFilter === tab.value
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'"
        >
          {{ tab.label }}
          <span
            class="ml-2 px-2 py-0.5 rounded-full text-xs"
            :class="activeFilter === tab.value
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-500'"
          >
            {{ getTabCount(tab.value) }}
          </span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="p-16 text-center">
        <div class="text-4xl mb-4">⏳</div>
        <p class="text-gray-500">Loading bookings...</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="filteredBookings.length === 0"
        class="p-16 text-center"
      >
        <div class="text-4xl mb-4">📅</div>
        <p class="text-gray-500">
          {{ searchQuery ? `No bookings found for "${searchQuery}"` : 'No bookings yet' }}
        </p>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Reference</th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Customer</th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Service</th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Staff</th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Date & Time</th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr
              v-for="booking in paginatedBookings"
              :key="booking.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <!-- Reference -->
              <td class="px-6 py-4">
                <span class="text-sm font-mono font-medium text-blue-600">
                  {{ booking.reference_number }}
                </span>
              </td>

              <!-- Customer -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                    {{ getInitials(booking.customer_name) }}
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{ booking.customer_name }}</span>
                </div>
              </td>

              <!-- Service -->
              <td class="px-6 py-4">
                <span class="text-sm text-gray-700">{{ booking.service_name }}</span>
              </td>

              <!-- Staff -->
              <td class="px-6 py-4">
                <span class="text-sm text-gray-700">{{ booking.staff_name || '—' }}</span>
              </td>

              <!-- Date & Time -->
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ formatDate(booking.date) }}</div>
                <div class="text-xs text-gray-500">{{ booking.time }}</div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                  :class="statusClass(booking.status)"
                >
                  {{ statusLabel(booking.status) }}
                </span>
              </td>

              <!-- Action Menu -->
              <td class="px-6 py-4">
                <div class="relative">
                  <button
                    @click.stop="toggleMenu(booking.id)"
                    class="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors font-bold text-xl"
                  >
                    ⋮
                  </button>
                  <div
                    v-if="activeMenu === booking.id"
                    class="absolute right-0 top-8 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10 min-w-40"
                  >
                    <button
                      @click="viewDetails(booking)"
                      class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      👁️ View Details
                    </button>
                    <button
                      v-if="booking.status !== 'completed' && booking.status !== 'cancelled'"
                      @click="confirmBooking(booking)"
                      class="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                    >
                      ✅ Confirm
                    </button>
                    <button
                      v-if="booking.status !== 'completed' && booking.status !== 'cancelled'"
                      @click="cancelBooking(booking)"
                      class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      ❌ Cancel
                    </button>
                    <button
                      v-if="booking.status !== 'completed' && booking.status !== 'cancelled'"
                      @click="completeBooking(booking)"
                      class="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                    >
                      🎯 Mark Complete
                    </button>
                  </div>
                </div>
              </td>

            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p class="text-sm text-gray-500">
            Page {{ currentPage }} of {{ totalPages }}
          </p>
          <div class="flex items-center gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Floating + Button -->
    <button
      @click="showCreateModal = true"
      class="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-2xl"
    >
      +
    </button>

    <!-- Create Booking Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-gray-900 mb-6">Create Manual Booking</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
            <input
              v-model="newBooking.customer_name"
              type="text"
              placeholder="Enter customer name"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer Phone</label>
            <input
              v-model="newBooking.customer_phone"
              type="text"
              placeholder="Enter customer phone"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              v-model="newBooking.date"
              type="date"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input
              v-model="newBooking.time"
              type="time"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div class="flex gap-4 mt-6">
          <button
            @click="showCreateModal = false"
            class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="createWalkIn"
            class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
          >
            Create Booking
          </button>
        </div>
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div
      v-if="showCancelModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-gray-900 mb-2">Cancel Booking</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to cancel this booking?</p>
        <div class="flex gap-4">
          <button
            @click="showCancelModal = false"
            class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50"
          >
            Keep Booking
          </button>
          <button
            @click="confirmCancel"
            class="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const bookings = ref([])
const loading = ref(true)
const searchQuery = ref('')
const activeFilter = ref('all')
const currentPage = ref(1)
const perPage = ref(10)
const activeMenu = ref(null)
const showCreateModal = ref(false)
const showCancelModal = ref(false)
const bookingToCancel = ref(null)

const newBooking = reactive({
  customer_name: '',
  customer_phone: '',
  date: '',
  time: '',
})

const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Pending', value: 'pending' },
]

// Fetch bookings
onMounted(async () => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!token || user.role !== 'owner') {
    navigateTo('/auth/login')
    return
  }

  try {
    const response = await fetch('http://localhost:3333/api/bookings', {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    bookings.value = data.bookings || []
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
  } finally {
    loading.value = false
  }
})

// Today's bookings
const todaysBookings = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return bookings.value.filter((b) => b.date?.startsWith(today)).length
})

// Pending bookings
const pendingBookings = computed(() => {
  return bookings.value.filter((b) => b.status === 'pending').length
})

// Tab counts
const getTabCount = (filter) => {
  if (filter === 'all') return bookings.value.length
  return bookings.value.filter((b) => b.status === filter).length
}

// Filtered bookings
const filteredBookings = computed(() => {
  let list = bookings.value

  // Filter by tab
  if (activeFilter.value !== 'all') {
    list = list.filter((b) => b.status === activeFilter.value)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(
      (b) =>
        b.reference_number?.toLowerCase().includes(query) ||
        b.customer_name?.toLowerCase().includes(query) ||
        b.service_name?.toLowerCase().includes(query)
    )
  }

  return list
})

// Pagination
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredBookings.value.length / perPage.value))
)

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredBookings.value.slice(start, start + perPage.value)
})

// Reset page on filter/search change
watch([searchQuery, activeFilter], () => {
  currentPage.value = 1
})

// Status helpers
const statusClass = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-700'
    case 'cancelled': return 'bg-red-100 text-red-700'
    case 'confirmed': return 'bg-blue-100 text-blue-700'
    case 'pending': return 'bg-yellow-100 text-yellow-700'
    case 'rescheduled': return 'bg-purple-100 text-purple-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const statusLabel = (status) => {
  switch (status) {
    case 'completed': return 'Done'
    case 'cancelled': return 'Cancelled'
    case 'confirmed': return 'Confirmed'
    case 'pending': return 'Pending'
    case 'rescheduled': return 'Rescheduled'
    default: return status
  }
}

// Format date
const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-KE', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

// Get initials
const getInitials = (name) => {
  if (!name) return '?'
  const parts = name.split(' ')
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  return name[0].toUpperCase()
}

// Toggle action menu
const toggleMenu = (id) => {
  activeMenu.value = activeMenu.value === id ? null : id
}

// Close menu on outside click
onMounted(() => {
  document.addEventListener('click', () => {
    activeMenu.value = null
  })
})

// Actions
const viewDetails = (booking) => {
  activeMenu.value = null
  alert(`Booking Details:\nRef: ${booking.reference_number}\nCustomer: ${booking.customer_name}\nService: ${booking.service_name}\nStatus: ${booking.status}`)
}

const confirmBooking = async (booking) => {
  activeMenu.value = null
  const token = localStorage.getItem('token')
  try {
    await fetch(`http://localhost:3333/api/bookings/${booking.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'confirmed' }),
    })
    const index = bookings.value.findIndex((b) => b.id === booking.id)
    if (index !== -1) bookings.value[index].status = 'confirmed'
  } catch (error) {
    console.error('Failed to confirm booking:', error)
  }
}

const cancelBooking = (booking) => {
  activeMenu.value = null
  bookingToCancel.value = booking
  showCancelModal.value = true
}

const confirmCancel = async () => {
  const token = localStorage.getItem('token')
  try {
    await fetch(`http://localhost:3333/api/bookings/${bookingToCancel.value.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason: 'Cancelled by owner' }),
    })
    const index = bookings.value.findIndex((b) => b.id === bookingToCancel.value.id)
    if (index !== -1) bookings.value[index].status = 'cancelled'
  } catch (error) {
    console.error('Failed to cancel booking:', error)
  } finally {
    showCancelModal.value = false
    bookingToCancel.value = null
  }
}

const completeBooking = async (booking) => {
  activeMenu.value = null
  const token = localStorage.getItem('token')
  try {
    await fetch(`http://localhost:3333/api/bookings/${booking.id}/complete`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    })
    const index = bookings.value.findIndex((b) => b.id === booking.id)
    if (index !== -1) bookings.value[index].status = 'completed'
  } catch (error) {
    console.error('Failed to complete booking:', error)
  }
}

// Create walk-in
const createWalkIn = async () => {
  const token = localStorage.getItem('token')
  try {
    await fetch('http://localhost:3333/api/bookings/walkin', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newBooking,
        staff_id: 1,
        service_id: 1,
        business_id: 1,
      }),
    })
    showCreateModal.value = false
    // Refresh bookings
    location.reload()
  } catch (error) {
    console.error('Failed to create walk-in:', error)
  }
}

// Export CSV
const exportCSV = () => {
  const headers = ['Reference', 'Customer', 'Service', 'Staff', 'Date', 'Time', 'Status']
  const rows = filteredBookings.value.map((b) => [
    b.reference_number,
    b.customer_name,
    b.service_name,
    b.staff_name || '—',
    formatDate(b.date),
    b.time,
    b.status,
  ])

  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'bookings.csv'
  a.click()
}

// Generate Report
const generateReport = () => {
  alert('Report generation coming soon!')
}
</script>