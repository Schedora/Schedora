<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">

    <!-- Logo and Header -->
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span class="text-white text-3xl font-bold">S</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-900">Schedora</h1>
      <p class="text-gray-500 mt-1">Premium Appointment Management</p>
      <!-- Dynamic heading based on role -->
      <div class="text-center mt-4 mb-6">
        <h2 class="text-xl font-bold text-gray-900">{{ headings[selectedRole].title }}</h2>
        <p class="text-gray-500 text-sm mt-1">{{ headings[selectedRole].subtitle }}</p>
      </div>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">

      <!-- Role Tabs -->
      <div class="flex bg-gray-100 rounded-xl p-1 mb-8">
        <button
          v-for="role in roles"
          :key="role.value"
          @click="selectedRole = role.value"
          class="flex-1 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="selectedRole === role.value
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'"
        >
          {{ role.label }}
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email address"
            class="w-full border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            :class="errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <NuxtLink
              to="/auth/forgot-password"
              class="text-sm text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </NuxtLink>
          </div>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="w-full border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors pr-12"
              :class="errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ errors.password }}
          </p>
        </div>

        <!-- Server Error -->
        <div v-if="serverError" class="bg-red-50 border border-red-200 rounded-xl p-4">
          <p class="text-red-600 text-sm">{{ serverError }}</p>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Logging in...' : 'Log In' }}
        </button>

        <!-- Google Login -->
        <button
          type="button"
          @click="loginWithGoogle"
          class="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div class="text-center text-sm mt-4">
          <template v-if="selectedRole === 'customer'">
            <span class="text-gray-600">New to Schedora? </span>
            <NuxtLink to="/auth/register" class="text-blue-600 font-semibold hover:underline">
              Create a Customer Account
            </NuxtLink>
          </template>
          <template v-else-if="selectedRole === 'staff'">
            <span class="text-gray-600">Don't have an account? </span>
            <a href="mailto:support@schedora.com" class="text-blue-600 font-semibold hover:underline">
              Contact Business Owner
            </a>
          </template>
          <template v-else-if="selectedRole === 'owner'">
            <span class="text-gray-600">New business owner? </span>
            <NuxtLink to="/auth/register-owner" class="text-blue-600 font-semibold hover:underline">
              Register Your Business
            </NuxtLink>
          </template>
        </div>
      </form>
    </div>

  </div>
  <!-- Footer Links -->
  <div class="mt-8 text-center text-xs text-gray-400 space-x-4">
    <a href="#" class="hover:text-gray-600">Terms of Service</a>
    <a href="#" class="hover:text-gray-600">Privacy Policy</a>
    <a href="#" class="hover:text-gray-600">Help Center</a>
    <a href="#" class="hover:text-gray-600">Contact Us</a>
  </div>
</template>

<script setup>
// Redirect if already logged in
onMounted(() => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  if (token && user.role) {
    if (user.role === 'customer') {
      navigateTo('/customer/bookings')
    } else if (user.role === 'staff') {
      navigateTo('/staff/schedule')
    } else if (user.role === 'owner') {
      navigateTo('/owner/dashboard')
    }
  }
})

const roles = [
  { label: 'Customer', value: 'customer' },
  { label: 'Staff', value: 'staff' },
  { label: 'Owner', value: 'owner' },
]

const selectedRole = ref('customer')

const headings = {
  customer: {
    title: 'Welcome Back',
    subtitle: 'Log in to manage your bookings'
  },
  staff: {
    title: 'Staff Login',
    subtitle: 'Access your daily schedule and appointments'
  },
  owner: {
    title: 'Owner Login',
    subtitle: 'Manage your business and team'
  }
}

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const loading = ref(false)
const showPassword = ref(false)
const serverError = ref('')

const validateForm = () => {
  let isValid = true

  errors.email = ''
  errors.password = ''
  serverError.value = ''

  if (!form.email) {
    errors.email = 'Email address is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return
  if (loading.value) return

  loading.value = true

  try {
    const response = await fetch('http://localhost:3333/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      // Save token and user to localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      const role = data.user.role

      // Check if user is logging in with correct role tab
      if (selectedRole.value === 'customer' && role !== 'customer') {
        serverError.value = 'This account is not a customer account. Please select the correct role tab.'
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        loading.value = false
        return
      }

      if (selectedRole.value === 'staff' && role !== 'staff') {
        serverError.value = 'This account is not a staff account. Please select the correct role tab.'
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        loading.value = false
        return
      }

      if (selectedRole.value === 'owner' && role !== 'owner') {
        serverError.value = 'This account is not an owner account. Please select the correct role tab.'
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        loading.value = false
        return
      }

      // Redirect based on role
      if (role === 'customer') {
        await navigateTo('/customer/bookings')
      } else if (role === 'staff') {
        await navigateTo('/staff/schedule')
      } else if (role === 'owner') {
        await navigateTo('/owner/dashboard')
      }
    } else {
      serverError.value = 'Invalid email or password. Please try again.'
    }
  } catch (error) {
    serverError.value = 'Unable to connect. Please check your internet connection.'
  } finally {
    loading.value = false
  }
}

const loginWithGoogle = () => {
  alert('Google OAuth coming soon!')
}
</script>