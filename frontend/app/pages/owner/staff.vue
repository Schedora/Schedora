<template>
  <div class="p-6 max-w-7xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <p class="text-sm text-gray-500 mb-1">
          Dashboard › <span class="text-gray-700">Staff</span>
        </p>
        <h1 class="text-2xl font-bold text-gray-900">Staff Management</h1>
        <p class="text-gray-600 mt-1">Monitor your team's availability and performance</p>
      </div>
      <div class="flex items-center gap-3">
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

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
            👥
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Active</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ totalActive }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-100 p-5">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-xl">
            🟢
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">On Duty</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ onDuty }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and View Toggle -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <!-- Department Filter -->
        <select
          v-model="selectedDepartment"
          class="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Departments</option>
          <option value="stylist">Stylist</option>
          <option value="barber">Barber</option>
          <option value="technician">Technician</option>
          <option value="receptionist">Receptionist</option>
        </select>

        <!-- Filter Button -->
        <button
          @click="applyFilter"
          class="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Filter
        </button>

        <!-- Clear -->
        <button
          v-if="selectedDepartment"
          @click="selectedDepartment = ''"
          class="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors"
        >
          ✕ Clear
        </button>
      </div>

      <!-- View Toggle -->
      <div class="flex items-center bg-gray-100 rounded-xl p-1">
        <button
          @click="viewMode = 'grid'"
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="viewMode === 'grid'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'"
        >
          ⊞ Grid
        </button>
        <button
          @click="viewMode = 'list'"
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="viewMode === 'list'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'"
        >
          ☰ List
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-16">
      <div class="text-4xl mb-4">⏳</div>
      <p class="text-gray-500">Loading staff...</p>
    </div>

    <!-- Grid View -->
    <div
      v-else-if="viewMode === 'grid'"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <!-- Staff Cards -->
      <div
        v-for="member in filteredStaff"
        :key="member.id"
        class="bg-white rounded-2xl border border-gray-100 p-5 relative"
      >
        <!-- 3-dot Menu -->
        <div class="absolute top-4 right-4">
          <button
            @click.stop="toggleMenu(member.id)"
            class="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg text-xl font-bold"
          >
            ⋮
          </button>
          <div
            v-if="activeMenu === member.id"
            class="absolute right-0 top-8 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10 min-w-36"
          >
            <button
              @click="viewProfile(member)"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              👁️ View Profile
            </button>
            <button
              @click="editStaff(member)"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              ✏️ Edit
            </button>
            <button
              @click="removeStaff(member)"
              class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              🗑️ Remove
            </button>
          </div>
        </div>

        <!-- Avatar -->
        <div class="flex flex-col items-center mb-4">
          <div class="relative mb-3">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
              {{ getInitials(member.full_name) }}
            </div>
            <!-- Availability Dot -->
            <div
              class="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white"
              :class="availabilityDot(member.status)"
            />
          </div>
          <h3 class="font-semibold text-gray-900 text-center">{{ member.full_name }}</h3>
          <p class="text-sm text-gray-500 capitalize">{{ member.role }}</p>
        </div>

        <!-- Rating -->
        <div class="flex justify-center text-yellow-400 text-sm mb-4">
          ★★★★★
          <span class="text-gray-500 ml-1 text-xs">({{ member.rating || '4.8' }})</span>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="bg-green-50 rounded-xl p-3 text-center">
            <p class="text-lg font-bold text-green-700">{{ member.completed || 0 }}</p>
            <p class="text-xs text-green-600">Completed</p>
          </div>
          <div class="bg-yellow-50 rounded-xl p-3 text-center">
            <p class="text-lg font-bold text-yellow-700">{{ member.pending || 0 }}</p>
            <p class="text-xs text-yellow-600">Pending</p>
          </div>
        </div>

        <!-- Availability Status -->
        <div
          class="text-center text-xs font-medium py-2 rounded-xl"
          :class="availabilityBadge(member.status)"
        >
          {{ availabilityLabel(member.status) }}
        </div>

        <!-- View Profile Link -->
        <button
          @click="viewProfile(member)"
          class="w-full mt-3 text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View Profile →
        </button>
      </div>

      <!-- Add New Staff Card -->
      <div
        @click="addNewStaff"
        class="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-5 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors min-h-64"
      >
        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-3">
          +
        </div>
        <p class="font-medium text-gray-700 text-center">Add New Staff Member</p>
        <p class="text-xs text-gray-500 text-center mt-1">Invite a team member to join</p>
      </div>

    </div>

    <!-- List View -->
    <div v-else class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Staff Member</th>
            <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Role</th>
            <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Rating</th>
            <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Completed</th>
            <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Pending</th>
            <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Status</th>
            <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr
            v-for="member in filteredStaff"
            :key="member.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="relative">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    {{ getInitials(member.full_name) }}
                  </div>
                  <div
                    class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                    :class="availabilityDot(member.status)"
                  />
                </div>
                <span class="font-medium text-gray-900">{{ member.full_name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600 capitalize">{{ member.role }}</td>
            <td class="px-6 py-4">
              <span class="text-yellow-400">★</span>
              <span class="text-sm text-gray-700 ml-1">{{ member.rating || '4.8' }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="text-sm font-medium text-green-700">{{ member.completed || 0 }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="text-sm font-medium text-yellow-700">{{ member.pending || 0 }}</span>
            </td>
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                :class="availabilityBadge(member.status)"
              >
                <span
                  class="w-2 h-2 rounded-full"
                  :class="availabilityDot(member.status)"
                />
                {{ availabilityLabel(member.status) }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="relative">
                <button
                  @click.stop="toggleMenu(member.id)"
                  class="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg text-xl font-bold"
                >
                  ⋮
                </button>
                <div
                  v-if="activeMenu === member.id"
                  class="absolute right-0 top-8 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10 min-w-36"
                >
                  <button
                    @click="viewProfile(member)"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    👁️ View Profile
                  </button>
                  <button
                    @click="editStaff(member)"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    @click="removeStaff(member)"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
const staffList = ref([])
const loading = ref(true)
const viewMode = ref('grid')
const selectedDepartment = ref('')
const appliedDepartment = ref('')
const activeMenu = ref(null)

// Fetch staff
onMounted(async () => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!token || user.role !== 'owner') {
    navigateTo('/auth/login')
    return
  }

  try {
    const response = await fetch(
      'http://localhost:3333/api/business/1/staff',
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const data = await response.json()
    staffList.value = data.staff || []
  } catch (error) {
    console.error('Failed to fetch staff:', error)
  } finally {
    loading.value = false
  }
})

// Summary cards
const totalActive = computed(() =>
  staffList.value.filter((s) => s.status === 'active').length
)

const onDuty = computed(() =>
  staffList.value.filter((s) => s.status === 'active').length
)

// Filter
const applyFilter = () => {
  appliedDepartment.value = selectedDepartment.value
}

const filteredStaff = computed(() => {
  if (!appliedDepartment.value) return staffList.value
  return staffList.value.filter((s) =>
    s.role?.toLowerCase() === appliedDepartment.value.toLowerCase()
  )
})

// Availability helpers
const availabilityDot = (status) => {
  switch (status) {
    case 'active': return 'bg-green-500'
    case 'pending': return 'bg-orange-400'
    default: return 'bg-gray-300'
  }
}

const availabilityBadge = (status) => {
  switch (status) {
    case 'active': return 'bg-green-50 text-green-700'
    case 'pending': return 'bg-orange-50 text-orange-700'
    default: return 'bg-gray-50 text-gray-500'
  }
}

const availabilityLabel = (status) => {
  switch (status) {
    case 'active': return '🟢 On Duty'
    case 'pending': return '🟠 Pending'
    default: return '⚫ Inactive'
  }
}

// Helpers
const getInitials = (name) => {
  if (!name) return '?'
  const parts = name.split(' ')
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  return name[0].toUpperCase()
}

// Toggle menu
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
const viewProfile = (member) => {
  activeMenu.value = null
  alert(`Viewing profile for ${member.full_name}`)
}

const editStaff = (member) => {
  activeMenu.value = null
  alert(`Editing ${member.full_name}`)
}

const removeStaff = async (member) => {
  activeMenu.value = null
  if (!confirm(`Are you sure you want to remove ${member.full_name}?`)) return

  const token = localStorage.getItem('token')
  try {
    await fetch(
      `http://localhost:3333/api/business/1/staff/${member.id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    staffList.value = staffList.value.filter((s) => s.id !== member.id)
  } catch (error) {
    console.error('Failed to remove staff:', error)
  }
}

const addNewStaff = () => {
  navigateTo('/onboarding/staff')
}

// Export CSV
const exportCSV = () => {
  const headers = ['Name', 'Role', 'Status', 'Rating', 'Completed', 'Pending']
  const rows = filteredStaff.value.map((s) => [
    s.full_name,
    s.role,
    s.status,
    s.rating || '4.8',
    s.completed || 0,
    s.pending || 0,
  ])

  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'staff.csv'
  a.click()
}

const generateReport = () => {
  alert('Report generation coming soon!')
}
</script>