<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">

    <!-- Logo -->
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span class="text-white text-3xl font-bold">S</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-900">Schedora</h1>
      <p class="text-gray-500 mt-1">Premium Appointment Management</p>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">

      <!-- Success State -->
      <div v-if="emailSent" class="text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-green-600 text-3xl">✓</span>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
        <p class="text-gray-600 mb-6">
          If an account exists with <strong>{{ form.email }}</strong>, 
          you will receive a password reset link shortly.
        </p>
        <NuxtLink
          to="/auth/login"
          class="block text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Back to Login
        </NuxtLink>
      </div>

      <!-- Form State -->
      <div v-else>
        <!-- Heading -->
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
          <p class="text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleForgotPassword" class="space-y-5">

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

          <!-- Server Error -->
          <div v-if="serverError" class="bg-red-50 border border-red-200 rounded-xl p-4">
            <p class="text-red-600 text-sm">{{ serverError }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Sending...' : 'Send Reset Link' }}
          </button>

          <!-- Back to Login -->
          <p class="text-center text-gray-600">
            Remember your password?
            <NuxtLink to="/auth/login" class="text-blue-600 font-semibold hover:underline">
              Log in
            </NuxtLink>
          </p>

        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
const form = reactive({
  email: '',
})

const errors = reactive({
  email: '',
})

const loading = ref(false)
const emailSent = ref(false)
const serverError = ref('')

const validateForm = () => {
  let isValid = true
  errors.email = ''
  serverError.value = ''

  if (!form.email) {
    errors.email = 'Email address is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  return isValid
}

const handleForgotPassword = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    const response = await fetch('http://localhost:3333/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: form.email }),
    })

    if (response.ok) {
      emailSent.value = true
    } else {
      serverError.value = 'Something went wrong. Please try again.'
    }
  } catch (error) {
    serverError.value = 'Unable to connect. Please check your internet connection.'
  } finally {
    loading.value = false
  }
}
</script>