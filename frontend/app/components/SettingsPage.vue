<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-3xl mx-auto px-6 py-10">
      <button
        @click="navigateTo(backTo)"
        class="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {{ backLabel }}
      </button>

      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="text-gray-600 mt-1 mb-8">Manage your account preferences</p>

      <div class="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
        <h3 class="text-lg font-semibold text-gray-900">Profile</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Full Name</label
            >
            <input
              v-model="user.full_name"
              type="text"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Email</label
            >
            <input
              v-model="user.email"
              type="email"
              disabled
              class="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Role</label
            >
            <input
              :value="user.role"
              disabled
              class="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-500 capitalize"
            />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="saveChanges"
            class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
          <span v-if="saved" class="text-sm text-green-600">✓ Saved</span>
        </div>

        <div class="border-t border-gray-100 pt-6">
          <button
            @click="signOut"
            class="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  backTo: string;
  backLabel: string;
}>();

const user = ref<Record<string, any>>({});
const saved = ref(false);

onMounted(() => {
  const stored =
    localStorage.getItem("user") || localStorage.getItem("auth_user");
  user.value = stored ? JSON.parse(stored) : {};
});

// Saved in the browser only for now (no backend endpoint yet)
function saveChanges() {
  const data = JSON.stringify(user.value);
  localStorage.setItem("user", data);
  localStorage.setItem("auth_user", data);
  saved.value = true;
  setTimeout(() => (saved.value = false), 2500);
}

function signOut() {
  ["token", "auth_token", "user", "auth_user"].forEach((k) =>
    localStorage.removeItem(k),
  );
  navigateTo("/auth/login");
}
</script>
