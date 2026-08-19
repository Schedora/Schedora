<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="text-gray-600 mt-1">Manage your account preferences</p>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 p-8">
      <div class="space-y-6">

        <!-- Profile Section -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                v-model="user.full_name"
                type="text"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="user.email"
                type="email"
                disabled
                class="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-500"
              />
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <button class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
          Save Changes
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'customer' })

const user = ref({})

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('user') || '{}')
})
</script>