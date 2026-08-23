<template>
  <div class="max-w-6xl mx-auto">

    <!-- Header -->
    <div class="mb-8">
      <button
        @click="navigateTo(`/customer/business/${businessId}`)"
        class="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
      >
        ← Back
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Book Appointment</h1>
      <p class="text-gray-600 mt-1">{{ business?.name }}</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">

      <!-- Left — Form -->
      <div class="flex-1">

        <!-- Progress Bar -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div class="flex items-center justify-between">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="flex items-center"
            >
              <!-- Step Circle -->
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors"
                :class="index + 1 < currentStep
                  ? 'bg-green-500 text-white'
                  : index + 1 === currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-400'"
              >
                <span v-if="index + 1 < currentStep">✓</span>
                <span v-else>{{ index + 1 }}</span>
              </div>

              <!-- Step Label -->
              <span
                class="ml-2 text-xs font-medium hidden sm:block"
                :class="index + 1 === currentStep ? 'text-blue-600' : 'text-gray-400'"
              >
                {{ step }}
              </span>

              <!-- Connector -->
              <div
                v-if="index < steps.length - 1"
                class="h-px flex-1 mx-3 hidden sm:block"
                :class="index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'"
              />
            </div>
          </div>
        </div>

        <!-- Step 1 — Select Location -->
        <div v-if="currentStep === 1" class="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Select Location</h2>

          <div class="space-y-3">
            <div
              v-for="branch in branches"
              :key="branch.id"
              @click="selectBranch(branch)"
              class="border-2 rounded-xl p-4 cursor-pointer transition-colors"
              :class="selectedBranch?.id === branch.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'"
            >
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium text-gray-900">{{ branch.name }}</div>
                  <div class="text-sm text-gray-500 mt-1">{{ branch.address }}</div>
                  <div class="text-sm text-gray-500">{{ branch.phone }}</div>
                </div>
                <div
                  v-if="selectedBranch?.id === branch.id"
                  class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white text-xs">✓</span>
                </div>
              </div>
            </div>
          </div>

          <p v-if="errors.branch" class="text-red-500 text-sm mt-3">
            {{ errors.branch }}
          </p>

          <button
            @click="nextStep"
            class="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Booking →
          </button>
        </div>

        <!-- Step 2 — Select Service -->
        <div v-if="currentStep === 2" class="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Select Service</h2>

          <div class="space-y-3">
            <div
              v-for="service in services"
              :key="service.id"
              @click="selectService(service)"
              class="border-2 rounded-xl p-4 cursor-pointer transition-colors"
              :class="selectedService?.id === service.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'"
            >
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium text-gray-900">{{ service.name }}</div>
                  <div class="text-sm text-gray-500 mt-1">
                    {{ service.duration }} mins
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-semibold text-gray-900">
                    KSh {{ service.price?.toLocaleString() }}
                  </div>
                  <div
                    v-if="selectedService?.id === service.id"
                    class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center ml-auto mt-1"
                  >
                    <span class="text-white text-xs">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p v-if="errors.service" class="text-red-500 text-sm mt-3">
            {{ errors.service }}
          </p>

          <div class="flex gap-4 mt-6">
            <button
              @click="currentStep--"
              class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
            <button
              @click="nextStep"
              class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Booking →
            </button>
          </div>
        </div>

        <!-- Step 3 — Date & Time -->
        <div v-if="currentStep === 3" class="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Select Date & Time</h2>

          <!-- Date Strip -->
          <div class="mb-6">
            <p class="text-sm font-medium text-gray-700 mb-3">Select Date</p>
            <div class="flex gap-2 overflow-x-auto pb-2">
              <div
                v-for="date in availableDates"
                :key="date.value"
                @click="date.available && selectDate(date)"
                class="flex-shrink-0 w-16 rounded-xl p-2 text-center cursor-pointer transition-colors border-2"
                :class="selectedDate === date.value
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : date.available
                  ? 'border-gray-200 hover:border-blue-300'
                  : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'"
              >
                <div class="text-xs font-medium">{{ date.day }}</div>
                <div class="text-lg font-bold">{{ date.date }}</div>
                <div class="text-xs">{{ date.month }}</div>
              </div>
            </div>
          </div>

          <!-- Time Slots -->
          <div v-if="selectedDate" class="mb-6">
            <p class="text-sm font-medium text-gray-700 mb-3">Select Time</p>
            <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
              <button
                v-for="slot in timeSlots"
                :key="slot.time"
                @click="slot.available && selectTime(slot.time)"
                class="py-2 px-3 rounded-xl text-sm font-medium border-2 transition-colors"
                :class="selectedTime === slot.time
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : slot.available
                  ? 'border-gray-200 hover:border-blue-300 text-gray-700'
                  : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'"
              >
                {{ slot.time }}
              </button>
            </div>
          </div>

          <p v-if="errors.datetime" class="text-red-500 text-sm mt-3">
            {{ errors.datetime }}
          </p>

          <div class="flex gap-4 mt-6">
            <button
              @click="currentStep--"
              class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
            <button
              @click="nextStep"
              class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Booking →
            </button>
          </div>
        </div>

        <!-- Step 4 — Provider & Notes -->
        <div v-if="currentStep === 4" class="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Provider & Notes</h2>

          <!-- Staff Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Preferred Staff
            </label>
            <select
              v-model="selectedStaff"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No Preference (Fastest Available)</option>
              <option
                v-for="staff in staffList"
                :key="staff.id"
                :value="staff.id"
              >
                {{ staff.full_name }} — {{ staff.role }}
              </option>
            </select>
          </div>

          <!-- Notes -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
              <span class="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              v-model="notes"
              rows="4"
              placeholder="Tell us anything specific about your booking..."
              class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div class="flex gap-4">
            <button
              @click="currentStep--"
              class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
            <button
              @click="nextStep"
              class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Booking →
            </button>
          </div>
        </div>

        <!-- Step 5 — Confirmation -->
        <div v-if="currentStep === 5" class="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Confirm Booking</h2>

          <!-- Summary -->
          <div class="space-y-4 mb-8">
            <div class="flex justify-between py-3 border-b border-gray-100">
              <span class="text-gray-500">Business</span>
              <span class="font-medium text-gray-900">{{ business?.name }}</span>
            </div>
            <div class="flex justify-between py-3 border-b border-gray-100">
              <span class="text-gray-500">Location</span>
              <span class="font-medium text-gray-900">{{ selectedBranch?.name }}</span>
            </div>
            <div class="flex justify-between py-3 border-b border-gray-100">
              <span class="text-gray-500">Service</span>
              <span class="font-medium text-gray-900">{{ selectedService?.name }}</span>
            </div>
            <div class="flex justify-between py-3 border-b border-gray-100">
              <span class="text-gray-500">Date</span>
              <span class="font-medium text-gray-900">{{ formatDate(selectedDate) }}</span>
            </div>
            <div class="flex justify-between py-3 border-b border-gray-100">
              <span class="text-gray-500">Time</span>
              <span class="font-medium text-gray-900">{{ selectedTime }}</span>
            </div>
            <div class="flex justify-between py-3 border-b border-gray-100">
              <span class="text-gray-500">Price</span>
              <span class="font-semibold text-gray-900">
                KSh {{ selectedService?.price?.toLocaleString() }}
              </span>
            </div>
            <div class="flex justify-between py-3">
              <span class="text-gray-500">Staff</span>
              <span class="font-medium text-gray-900">
                {{ selectedStaffName || 'No Preference' }}
              </span>
            </div>
          </div>

          <!-- Error -->
          <div v-if="bookingError" class="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p class="text-red-600 text-sm">{{ bookingError }}</p>
          </div>

          <div class="flex gap-4">
            <button
              @click="currentStep--"
              class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
            <button
              @click="confirmBooking"
              :disabled="bookingLoading"
              class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {{ bookingLoading ? 'Confirming...' : 'Confirm Booking' }}
            </button>
          </div>
        </div>

      </div>

      <!-- Right — Booking Summary Panel -->
      <div class="lg:w-80">
        <div class="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
          <h3 class="font-semibold text-gray-900 mb-4">Booking Summary</h3>

          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Business</span>
              <span class="font-medium text-gray-900 text-right">
                {{ business?.name || '—' }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Location</span>
              <span class="font-medium text-gray-900 text-right">
                {{ selectedBranch?.name || '—' }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Service</span>
              <span class="font-medium text-gray-900 text-right">
                {{ selectedService?.name || '—' }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Date</span>
              <span class="font-medium text-gray-900">
                {{ selectedDate ? formatDate(selectedDate) : '—' }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Time</span>
              <span class="font-medium text-gray-900">{{ selectedTime || '—' }}</span>
            </div>
            <div class="flex justify-between text-sm border-t border-gray-100 pt-3">
              <span class="text-gray-500">Price</span>
              <span class="font-bold text-gray-900">
                {{ selectedService ? `KSh ${selectedService.price?.toLocaleString()}` : '—' }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Specialist</span>
              <span class="font-medium text-gray-900">
                {{ selectedStaffName || 'No Preference' }}
              </span>
            </div>
          </div>

          <!-- Trust Badges -->
          <div class="space-y-2 pt-4 border-t border-gray-100">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span class="text-green-500">🔒</span>
              <span>Secure Payment</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span class="text-blue-500">🔄</span>
              <span>24h Rescheduling</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'customer' })

const route = useRoute()
const businessId = route.params.id

const business = ref(null)
const branches = ref([])
const services = ref([])
const staffList = ref([])

const currentStep = ref(1)
const steps = ['Location', 'Service', 'Date & Time', 'Provider', 'Confirm']

const selectedBranch = ref(null)
const selectedService = ref(null)
const selectedDate = ref('')
const selectedTime = ref('')
const selectedStaff = ref('')
const notes = ref('')

const bookingLoading = ref(false)
const bookingError = ref('')

const errors = reactive({
  branch: '',
  service: '',
  datetime: '',
})

// Generate available dates (next 14 days)
const availableDates = computed(() => {
  const dates = []
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  for (let i = 1; i <= 14; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    dates.push({
      value: date.toISOString().split('T')[0],
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
      available: date.getDay() !== 0, // Sundays unavailable
    })
  }
  return dates
})

// Time slots
const timeSlots = ref([
  { time: '08:00', available: true },
  { time: '09:00', available: true },
  { time: '10:00', available: true },
  { time: '11:00', available: true },
  { time: '12:00', available: true },
  { time: '13:00', available: false },
  { time: '14:00', available: true },
  { time: '15:00', available: true },
  { time: '16:00', available: true },
  { time: '17:00', available: true },
])

// Selected staff name
const selectedStaffName = computed(() => {
  if (!selectedStaff.value) return 'No Preference'
  const staff = staffList.value.find((s) => s.id === selectedStaff.value)
  return staff?.full_name || 'No Preference'
})

// Fetch business data
onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    navigateTo('/auth/login')
    return
  }

  try {
    // Fetch business
    const businessRes = await fetch(
      `http://localhost:3333/api/businesses/${businessId}`
    )
    const businessData = await businessRes.json()
    business.value = businessData.data

    // Fetch branches
    const branchRes = await fetch(
      `http://localhost:3333/api/businesses/${businessId}/branches`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const branchData = await branchRes.json()
    branches.value = branchData.data || []

    // Fetch services
    const serviceRes = await fetch(
      `http://localhost:3333/api/businesses/${businessId}/services`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const serviceData = await serviceRes.json()
    services.value = serviceData.data || []

    // Fetch staff
    const staffRes = await fetch(
      `http://localhost:3333/api/business/${businessId}/staff/available`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const staffData = await staffRes.json()
    staffList.value = staffData.staff || []
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
})

// Selection handlers
const selectBranch = (branch) => {
  selectedBranch.value = branch
  errors.branch = ''
}

const selectService = (service) => {
  selectedService.value = service
  errors.service = ''
}

const selectDate = (date) => {
  selectedDate.value = date.value
  selectedTime.value = ''
  errors.datetime = ''
}

const selectTime = (time) => {
  selectedTime.value = time
  errors.datetime = ''
}

// Next step validation
const nextStep = () => {
  if (currentStep.value === 1) {
    if (!selectedBranch.value) {
      errors.branch = 'Please select a location to continue'
      return
    }
  }

  if (currentStep.value === 2) {
    if (!selectedService.value) {
      errors.service = 'Please select a service to continue'
      return
    }
  }

  if (currentStep.value === 3) {
    if (!selectedDate.value || !selectedTime.value) {
      errors.datetime = 'Please select both a date and time to continue'
      return
    }
  }

  currentStep.value++
}

// Format date
const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-KE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Confirm booking
const confirmBooking = async () => {
  const token = localStorage.getItem('token')
  bookingLoading.value = true
  bookingError.value = ''

  try {
    const staffId = selectedStaff.value || staffList.value[0]?.id

    const response = await fetch('http://localhost:3333/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        service_id: selectedService.value.id,
        branch_id: selectedBranch.value.id,
        staff_id: staffId,
        date: selectedDate.value,
        time: selectedTime.value,
        notes: notes.value || undefined,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      // Redirect to bookings with success message
      navigateTo('/customer/bookings?booked=true')
    } else if (response.status === 409) {
      bookingError.value = 'This time slot is already booked. Please choose a different time.'
      currentStep.value = 3
    } else {
      bookingError.value = 'Something went wrong. Please try again.'
    }
  } catch (error) {
    bookingError.value = 'Unable to connect. Please check your internet connection.'
  } finally {
    bookingLoading.value = false
  }
}
</script>