<template>
  <div class="min-h-screen bg-slate-50 flex">

    <!-- ==================== SIDEBAR ==================== -->
    <aside
      class="w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 flex flex-col z-20"
    >

      <!-- Logo -->
      <div class="px-6 pt-7 pb-8">
        <div class="text-2xl font-bold text-blue-600">
          Schedora
        </div>

        <div class="text-sm text-gray-500 mt-1">
          Customer Portal
        </div>
      </div>

      <!-- Navigation -->
      <nav class="px-4 space-y-2">

        <!-- My Bookings -->
        <NuxtLink
          to="/customer/bookings"
          class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors"
          :class="
            $route.path === '/customer/bookings'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-50'
          "
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="17" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>

          My Bookings
        </NuxtLink>

        <!-- Book Now -->
        <NuxtLink
          to="/customer/new-booking"
          class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors"
          :class="
            $route.path === '/customer/new-booking'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-50'
          "
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v8M8 12h8" />
          </svg>

          Book Now
        </NuxtLink>

      </nav>

      <!-- Bottom section -->
      <div class="mt-auto px-4 pb-6">

        <!-- Help Center -->
        <NuxtLink
          to="/customer/help"
          class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          :class="
            $route.path === '/customer/help'
              ? 'bg-blue-600 text-white'
              : ''
          "
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.7-1.7 1.1-1.7 2.2" />
            <path d="M12 16h.01" />
          </svg>

          Help Center
        </NuxtLink>

      </div>

    </aside>


    <!-- ==================== MAIN AREA ==================== -->
    <div class="flex-1 ml-64 min-h-screen">

      <!-- ==================== TOP NAV ==================== -->
      <header
        class="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10"
      >

        <!-- Search -->
        <div class="w-full max-w-xl">
          <div class="relative">

            <svg
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              type="text"
              placeholder="Search services..."
              class="w-full bg-slate-50 border border-gray-100 rounded-full pl-12 pr-5 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>
        </div>


        <!-- Right side -->
        <div class="flex items-center gap-4 ml-8">

          <!-- Calendar -->
          <button
            class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-xl transition"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="17" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </button>


          <!-- Notifications -->
          <button
            class="relative w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-xl transition"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
              />
              <path d="M10 21h4" />
            </svg>

            <!-- Unread indicator -->
            <span
              class="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"
            ></span>
          </button>


          <!-- Settings -->
          <button
            class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-xl transition"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="3" />
              <path
                d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.5 1.5-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2.1v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.5-1.5.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H7.3v-2.1h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.5-1.5.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.1v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.5 1.5-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2V13h-.2a1.7 1.7 0 0 0-1.6 1Z"
              />
            </svg>
          </button>


          <!-- Divider -->
          <div class="h-10 w-px bg-gray-200"></div>


          <!-- User -->
          <div class="flex items-center gap-3">

            <div
              class="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold"
            >
              {{ userInitials }}
            </div>

            <div class="hidden md:block">
              <div class="text-sm font-semibold text-gray-900">
                {{ userName }}
              </div>

              <div class="text-xs text-gray-500">
                {{ membershipStatus }}
              </div>
            </div>

          </div>

        </div>

      </header>


      <!-- ==================== PAGE CONTENT ==================== -->
      <main class="p-8">
        <slot />
      </main>

    </div>

  </div>
</template>


<script setup>
const router = useRouter()

const userName = ref('Customer')
const userInitials = ref('C')

const membershipStatus = ref('Free Trial')

onMounted(() => {
  const storedUser = JSON.parse(
    localStorage.getItem('user') || '{}'
  )

  const name = storedUser.full_name || 'Customer'

  userName.value = name

  const parts = name.trim().split(/\s+/)

  if (parts.length >= 2) {
    userInitials.value =
      `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  } else {
    userInitials.value = name[0].toUpperCase()
  }
})

const handleLogout = async () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  await router.push('/auth/login')
}
</script>