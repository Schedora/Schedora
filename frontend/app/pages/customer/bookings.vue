<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Appointment History</h1>
      <p class="text-gray-600 mt-1">
        View and manage your past and upcoming scheduled services
      </p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
            📅
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Bookings</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ filteredBookings.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-xl">
            ✅
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Completed</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">
              {{ filteredBookings.filter(b => b.status === 'completed').length }}
            </p>
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
            <p class="text-2xl font-bold text-gray-900 mt-1">
              {{ filteredBookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center text-xl">
            ❌
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Cancelled</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">
              {{ filteredBookings.filter(b => b.status === 'cancelled').length }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!loading && bookings.length === 0"
      class="bg-white rounded-2xl border border-gray-100 min-h-64 flex items-center justify-center"
    >
      <div class="text-center">
        <div class="text-5xl mb-4">📅</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
        <p class="text-gray-500 mb-6">You haven't made any bookings yet!</p>
        <NuxtLink
          to="/customer/new-booking"
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Book Now
        </NuxtLink>
      </div>
    </div>

    <!-- Bookings Table -->
    <div v-else class="bg-white rounded-2xl border border-gray-100 overflow-hidden">

      <!-- Search -->
      <div class="p-4 border-b border-gray-100">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search appointments..."
          class="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Loading -->
      <div v-if="loading" class="p-16 text-center">
        <div class="text-4xl mb-4">⏳</div>
        <p class="text-gray-500">Loading your bookings...</p>
      </div>

      <!-- No search results -->
      <div
        v-else-if="filteredBookings.length === 0 && searchQuery"
        class="p-16 text-center"
      >
        <div class="text-4xl mb-4">🔍</div>
        <p class="text-gray-500">No appointments found for "{{ searchQuery }}"</p>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Service
              </th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Business Name
              </th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Date & Time
              </th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Status
              </th>
              <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr
              v-for="booking in paginatedBookings"
              :key="booking.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <!-- Service -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-lg">
                    ✂️
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">
                      {{ booking.service_name || 'Service' }}
                    </div>
                    <div class="text-xs text-gray-500">
                      Ref: {{ booking.branch_name || 'Main Branch' }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Business Name -->
              <td class="px-6 py-4">
                <span class="text-gray-700">{{ booking.business_name || '—' }}</span>
              </td>

              <!-- Date & Time -->
              <td class="px-6 py-4">
                <div class="text-gray-900 font-medium">{{ formatDate(booking.date) }}</div>
                <div class="text-gray-500 text-sm">{{ booking.time }}</div>
              </td>

              <!-- Status Badge -->
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
                    class="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors font-bold text-lg"
                  >
                    ⋮
                  </button>

                  <!-- Dropdown Menu -->
                  <div
                    v-if="activeMenu === booking.id"
                    class="absolute right-0 top-8 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10 min-w-36"
                  >
                    <button
                      @click="viewDetails(booking)"
                      class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      👁️ View Details
                    </button>
                    <button
                      v-if="booking.status !== 'completed' && booking.status !== 'cancelled'"
                      @click="reschedule(booking)"
                      class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      📅 Reschedule
                    </button>
                    <button
                      v-if="booking.status !== 'completed' && booking.status !== 'cancelled'"
                      @click="cancelBooking(booking)"
                      class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      ❌ Cancel
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
            Showing {{ paginationStart }} to {{ paginationEnd }} of {{ filteredBookings.length }} entries
          </p>
          <div class="flex items-center gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            <span class="text-sm text-gray-700 px-2">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
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
        <p class="text-gray-600 mb-6">
          Are you sure you want to cancel this booking?
          This action cannot be undone.
        </p>
        <div class="flex gap-4">
          <button
            @click="showCancelModal = false"
            class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Keep Booking
          </button>
          <button
            @click="confirmCancel"
            class="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'customer'
})

const bookings = ref([])
const loading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const perPage = 10
const activeMenu = ref(null)
const showCancelModal = ref(false)
const bookingToCancel = ref(null)

// Fetch bookings
onMounted(async () => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!token) {
    navigateTo('/auth/login')
    return
  }

  try {
    const response = await fetch(
      `http://localhost:3333/api/bookings/customer/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json()
    bookings.value = data.bookings || []
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
  } finally {
    loading.value = false
  }
})

// Filtered bookings based on search
const filteredBookings = computed(() => {
  if (!searchQuery.value) return bookings.value
  const query = searchQuery.value.toLowerCase()
  return bookings.value.filter(
    (b) =>
      b.service_name?.toLowerCase().includes(query) ||
      b.reference_number?.toLowerCase().includes(query) ||
      b.status?.toLowerCase().includes(query)
  )
})

// Pagination
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredBookings.value.length / perPage))
)

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredBookings.value.slice(start, start + perPage)
})

const paginationStart = computed(() =>
  filteredBookings.value.length === 0
    ? 0
    : (currentPage.value - 1) * perPage + 1
)

const paginationEnd = computed(() =>
  Math.min(currentPage.value * perPage, filteredBookings.value.length)
)

// Reset page when search changes
watch(searchQuery, () => {
  currentPage.value = 1
})

// Status helpers
const statusClass = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-700'
    case 'cancelled': return 'bg-red-100 text-red-700'
    case 'pending': return 'bg-blue-100 text-blue-700'
    case 'confirmed': return 'bg-blue-100 text-blue-700'
    case 'rescheduled': return 'bg-purple-100 text-purple-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const statusLabel = (status) => {
  switch (status) {
    case 'completed': return 'Done'
    case 'cancelled': return 'Canceled'
    case 'pending': return 'Pending'
    case 'confirmed': return 'Confirmed'
    case 'rescheduled': return 'Rescheduled'
    default: return status
  }
}

// Format date
const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-KE', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Action menu
const toggleMenu = (id) => {
  activeMenu.value = activeMenu.value === id ? null : id
}

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      activeMenu.value = null
    }
  })
})

const viewDetails = (booking) => {
  activeMenu.value = null
  alert(`Booking Details:\nRef: ${booking.reference_number}\nStatus: ${booking.status}`)
}

const reschedule = (booking) => {
  activeMenu.value = null
  navigateTo(`/customer/reschedule/${booking.id}`)
}

const cancelBooking = (booking) => {
  activeMenu.value = null
  bookingToCancel.value = booking
  showCancelModal.value = true
}

const confirmCancel = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(
      `http://localhost:3333/api/bookings/${bookingToCancel.value.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: 'Customer cancelled' }),
      }
    )

    if (response.ok) {
      // Update booking status locally
      const index = bookings.value.findIndex(
        (b) => b.id === bookingToCancel.value.id
      )
      if (index !== -1) {
        bookings.value[index].status = 'cancelled'
      }
    }
  } catch (error) {
    console.error('Failed to cancel booking:', error)
  } finally {
    showCancelModal.value = false
    bookingToCancel.value = null
  }
}
</script>