<template>
  <div class="min-h-screen bg-gray-50 flex">

    <!-- Left Sidebar -->
    <div class="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full">

      <!-- Logo -->
      <div class="p-6 border-b border-gray-200">
        <span class="text-xl font-bold text-blue-600">Schedora</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-2">
        <NuxtLink
          to="/customer/bookings"
          class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors"
          :class="$route.path === '/customer/bookings'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'"
        >
          <span class="text-xl">📅</span>
          My Bookings
        </NuxtLink>

        <NuxtLink
          to="/customer/new-booking"
          class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors"
          :class="$route.path === '/customer/new-booking'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'"
        >
          <span class="text-xl">➕</span>
          Book Now
        </NuxtLink>

        <NuxtLink
          to="/customer/help"
          class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors"
          :class="$route.path === '/customer/help'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'"
        >
          <span class="text-xl">❓</span>
          Help Center
        </NuxtLink>
      </nav>

      <!-- Logout -->
      <div class="p-4 border-t border-gray-200">
        <button
          @click="handleLogout"
          class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors w-full"
        >
          <span class="text-xl">🚪</span>
          Logout
        </button>
      </div>

    </div>

    <!-- Main Content -->
    <div class="flex-1 ml-64 flex flex-col">

      <!-- Top Navigation -->
      <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">

        <!-- Search Bar -->
        <div class="flex-1 max-w-md">
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search bookings..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center gap-4 ml-6">

          <!-- Calendar -->
          <button 
            @click="navigateTo('/customer/calendar')"
            class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
            📆
          </button>

          <!-- Notifications -->
          <button 
            @click="navigateTo('/customer/notifications')"
            class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-xl transition-colors relative">
            🔔
            <span class="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <!-- Settings -->
          <button 
            @click="navigateTo('/customer/settings')"
            class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
            ⚙️
          </button>

          <!-- Avatar -->
          <div class="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {{ userInitials }}
            </div>
            <div>
              <div class="text-sm font-semibold text-gray-900">{{ userName }}</div>
              <div class="text-xs text-gray-500">{{ membershipStatus }}</div>
            </div>
          </div>

        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>

    </div>
  </div>
</template>

<script setup>
const router = useRouter()

// User information
const user = ref({})

const userName = computed(() => user.value.full_name || 'Customer')

const userInitials = computed(() => {
  const name = user.value.full_name || 'C'
  const parts = name.split(' ')

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  return name[0].toUpperCase()
})

const membershipStatus = computed(() => 'Member')

// Access localStorage only on the client
onMounted(() => {
  const storedUser = localStorage.getItem('user')

  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (error) {
      console.error('Failed to parse user data:', error)
    }
  }
})

const handleLogout = async () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  await router.push('/auth/login')
}
</script>