<template>
  <div class="min-h-screen flex">

    <!-- Left Panel -->
    <div class="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-between">
      
      <!-- Top -->
      <div>
        <NuxtLink to="/" class="text-white text-2xl font-bold">Schedora</NuxtLink>
      </div>

      <!-- Middle Content -->
      <div>
        <h1 class="text-4xl font-bold text-white mb-8 leading-tight">
          Scale your business with ease
        </h1>

        <!-- Value Points -->
        <div class="space-y-6 mb-12">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span class="text-white text-lg">✓</span>
            </div>
            <div>
              <h3 class="text-white font-semibold text-lg">Verified Reliability</h3>
              <p class="text-blue-200">Trusted by 10,000+ businesses across Kenya</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span class="text-white text-lg">✓</span>
            </div>
            <div>
              <h3 class="text-white font-semibold text-lg">Team Collaboration</h3>
              <p class="text-blue-200">Manage your entire team from one place</p>
            </div>
          </div>
        </div>

        <!-- Dashboard Preview -->
        <div class="bg-blue-500 rounded-2xl p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-white font-semibold">Today's Overview</span>
            <span class="text-blue-200 text-sm">Live</span>
          </div>
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="bg-blue-400 rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-white">24</div>
              <div class="text-blue-200 text-xs">Bookings</div>
            </div>
            <div class="bg-blue-400 rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-white">8</div>
              <div class="text-blue-200 text-xs">Staff</div>
            </div>
            <div class="bg-blue-400 rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-white">4.9</div>
              <div class="text-blue-200 text-xs">Rating</div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between bg-blue-400 rounded-lg p-3">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">JM</div>
                <span class="text-white text-sm">James Mwangi</span>
              </div>
              <span class="text-blue-200 text-xs">10:00 AM</span>
            </div>
            <div class="flex items-center justify-between bg-blue-400 rounded-lg p-3">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">AO</div>
                <span class="text-white text-sm">Amara Osei</span>
              </div>
              <span class="text-blue-200 text-xs">11:30 AM</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div>
        <p class="text-blue-200 text-sm">© 2024 Schedora. All rights reserved.</p>
      </div>

    </div>

    <!-- Right Panel -->
    <div class="w-full lg:w-1/2 flex flex-col">
      
      <!-- Top Nav -->
      <div class="flex justify-between items-center p-6">
        <NuxtLink to="/" class="text-blue-600 font-bold text-xl lg:hidden">
          Schedora
        </NuxtLink>
        <div class="ml-auto">
          <span class="text-gray-600">Already have an account? </span>
          <NuxtLink to="/auth/login" class="text-blue-600 font-semibold hover:underline">
            Log In
          </NuxtLink>
        </div>
      </div>

      <!-- Form -->
      <div class="flex-1 flex items-center justify-center p-6">
        <div class="w-full max-w-md">
          
          <!-- Heading -->
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Register Your Business</h2>
            <p class="text-gray-600">Start your 14-day free trial today</p>
          </div>

          <!-- Google Sign Up -->
          <button
            @click="signUpWithGoogle"
            class="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 transition-colors mb-6"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>

          <!-- Divider -->
          <div class="flex items-center gap-4 mb-6">
            <div class="flex-1 h-px bg-gray-200"></div>
            <span class="text-gray-500 text-sm">or</span>
            <div class="flex-1 h-px bg-gray-200"></div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleRegister" class="space-y-5">
            
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                v-model="form.full_name"
                type="text"
                placeholder="Enter your full name"
                class="w-full border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                :class="errors.full_name ? 'border-red-500 bg-red-50' : 'border-gray-200'"
              />
              <p v-if="errors.full_name" class="text-red-500 text-sm mt-1">
                {{ errors.full_name }}
              </p>
            </div>

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
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
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
              <!-- Always visible hint -->
              <p class="text-gray-500 text-sm mt-1">Minimum 8 characters required</p>
              <p v-if="errors.password" class="text-red-500 text-sm mt-1">
                {{ errors.password }}
              </p>
            </div>

            <!-- Register As -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Register as
              </label>
              <div class="border-2 border-blue-500 bg-blue-50 rounded-xl px-4 py-3 flex items-center gap-3">
                <div class="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs">✓</span>
                </div>
                <span class="text-blue-700 font-medium">Business Owner</span>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="serverError" class="bg-red-50 border border-red-200 rounded-xl p-4">
              <p class="text-red-600 text-sm">{{ serverError }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Registering...' : 'Register Your Business' }}
            </button>

            <!-- Login Link -->
            <p class="text-center text-gray-600">
              Already have an account?
              <NuxtLink to="/auth/login" class="text-blue-600 font-semibold hover:underline">
                Log in
              </NuxtLink>
            </p>

          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const form = reactive({
  full_name: '',
  email: '',
  password: '',
  role: 'owner',
})

const errors = reactive({
  full_name: '',
  email: '',
  password: '',
})

const loading = ref(false)
const showPassword = ref(false)
const serverError = ref('')

const validateForm = () => {
  let isValid = true

  // Reset errors
  errors.full_name = ''
  errors.email = ''
  errors.password = ''
  serverError.value = ''

  // Full name validation
  if (!form.full_name) {
    errors.full_name = 'Full name is required'
    isValid = false
  } else if (form.full_name.length < 2) {
    errors.full_name = 'Full name must be at least 2 characters'
    isValid = false
  }

  // Email validation
  if (!form.email) {
    errors.email = 'Email address is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Password validation
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    isValid = false
  }

  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    const response = await fetch('http://localhost:3333/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    const data = await response.json()

    if (response.ok) {
      // Save token to localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect to onboarding
      await navigateTo('/onboarding/business-info')
    } else if (response.status === 409) {
      serverError.value = 'An account with this email already exists. Please log in instead.'
    } else if (response.status === 422) {
      serverError.value = 'Please check your details and try again.'
    } else {
      serverError.value = 'Something went wrong. Please try again.'
    }
  } catch (error) {
    serverError.value = 'Unable to connect. Please check your internet connection.'
  } finally {
    loading.value = false
  }
}

const signUpWithGoogle = () => {
  // Google OAuth — to be implemented
  alert('Google OAuth coming soon!')
}
</script>