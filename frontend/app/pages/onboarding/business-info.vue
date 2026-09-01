<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <OnboardingSidebar :current-step="1" @finish-later="handleFinishLater" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navigation -->
      <header
        class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between"
      >
        <h2 class="text-lg font-semibold text-gray-800">Schedora Business</h2>
        <div class="flex items-center gap-4">
          <!-- Help icon -->
          <button class="text-gray-400 hover:text-gray-600">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <!-- Notification bell -->
          <button class="text-gray-400 hover:text-gray-600">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <!-- Avatar -->
          <div
            class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-xs font-semibold">O</span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-8 max-w-4xl">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Business Info</h1>
        <p class="text-gray-500 mb-8">
          Tell us about your business to help clients recognize your brand. This
          information will be visible on your public booking page.
        </p>

        <form @submit.prevent="handleContinue">
          <!-- Logo + Fields Row -->
          <div class="flex gap-6 mb-6">
            <!-- Logo Upload -->
            <div
              class="bg-white border border-gray-200 rounded-xl p-6 w-64 flex flex-col items-center justify-center"
            >
              <p class="text-sm font-medium text-gray-700 mb-4">
                Business Logo
              </p>

              <!-- Preview or upload area -->
              <div
                class="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors overflow-hidden"
                @click="triggerLogoUpload"
              >
                <img
                  v-if="logoPreview"
                  :src="logoPreview"
                  class="w-full h-full object-cover"
                  alt="Logo preview"
                />
                <div v-else class="flex flex-col items-center">
                  <svg
                    class="w-8 h-8 text-gray-400 mb-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span class="text-xs text-gray-400">Upload logo</span>
                </div>
              </div>

              <!-- Hidden file input -->
              <input
                ref="logoInput"
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                class="hidden"
                @change="handleLogoUpload"
              />

              <!-- Error message -->
              <p v-if="logoError" class="text-red-500 text-xs mt-2 text-center">
                {{ logoError }}
              </p>
              <p class="text-xs text-gray-400 mt-2 text-center">
                Recommended: 500x500px<br />PNG, JPG or WebP
              </p>
            </div>

            <!-- Business Fields -->
            <div
              class="flex-1 bg-white border border-gray-200 rounded-xl p-6 space-y-5"
            >
              <!-- Business Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Business Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="e.g., Luminous Hair Studio"
                  class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  :class="errors.name ? 'border-red-400' : 'border-gray-300'"
                />
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">
                  {{ errors.name }}
                </p>
              </div>

              <!-- Business Category -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Business Category <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.category"
                  class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  :class="
                    errors.category ? 'border-red-400' : 'border-gray-300'
                  "
                >
                  <option value="">Select a category</option>
                  <option value="Beauty & Personal Care">
                    Beauty & Personal Care
                  </option>
                  <option value="Health & Fitness">Health & Fitness</option>
                  <option value="Medical & Wellness">Medical & Wellness</option>
                  <option value="Pet Services">Pet Services</option>
                  <option value="Home Services">Home Services</option>
                  <option value="Professional Services">
                    Professional Services
                  </option>
                  <option value="Tech Services">Tech Services</option>
                  <option value="Automotive Services">
                    Automotive Services
                  </option>
                </select>
                <p v-if="errors.category" class="text-red-500 text-xs mt-1">
                  {{ errors.category }}
                </p>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Description</label
                >
                <textarea
                  v-model="form.description"
                  placeholder="Tell clients what makes your business unique..."
                  maxlength="300"
                  rows="4"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                ></textarea>
                <!-- Live character counter -->
                <p class="text-xs text-gray-400 text-right mt-1">
                  {{ form.description.length }}/300
                </p>
              </div>
            </div>
          </div>

          <!-- Online Booking Policy -->
          <div class="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-semibold text-gray-800">
                  Online Booking Policy
                </h3>
                <p class="text-sm text-gray-500 mt-0.5">
                  Enable instant booking or manual confirmation for new clients.
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  type="button"
                  @click="form.bookingPolicy = 'instant'"
                  class="px-5 py-2 rounded-lg text-sm font-medium transition"
                  :class="
                    form.bookingPolicy === 'instant'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  "
                >
                  Instant
                </button>
                <button
                  type="button"
                  @click="form.bookingPolicy = 'request'"
                  class="px-5 py-2 rounded-lg text-sm font-medium transition"
                  :class="
                    form.bookingPolicy === 'request'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  "
                >
                  Request
                </button>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <p v-if="apiError" class="text-red-500 text-sm">{{ apiError }}</p>
          <div class="flex items-center justify-between">
            <button
              type="button"
              @click="handleCancel"
              class="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-semibold transition flex items-center gap-2 disabled:opacity-60"
              :disabled="isLoading"
            >
              <svg
                v-if="isLoading"
                class="w-4 h-4 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {{ isLoading ? "Saving..." : "Continue to Location →" }}
            </button>
          </div>
        </form>
      </main>

      <!-- Footer -->
      <footer
        class="border-t border-gray-200 px-8 py-4 flex justify-between items-center"
      >
        <p class="text-xs text-gray-400">
          © Schedora. Professional Booking Solutions.
        </p>
        <div class="flex gap-4">
          <a href="#" class="text-xs text-gray-400 hover:text-gray-600"
            >Privacy Policy</a
          >
          <a href="#" class="text-xs text-gray-400 hover:text-gray-600"
            >Terms of Service</a
          >
          <a href="#" class="text-xs text-gray-400 hover:text-gray-600"
            >Onboarding Guide</a
          >
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  layout: false,
});
// Use the API composable for backend calls
const api = useApi();

// Store the created business ID so other onboarding steps can use it
const businessId = ref<number | null>(null);

// Loading and error state
const isLoading = ref(false);
const apiError = ref("");

// Form state
const form = reactive({
  name: "",
  category: "",
  description: "",
  bookingPolicy: "instant", // Instant is selected by default
});

// Error messages for each required field
const errors = reactive({
  name: "",
  category: "",
});

// Logo state
const logoInput = ref<HTMLInputElement | null>(null);
const logoPreview = ref<string | null>(null);
const logoError = ref("");
const logoFile = ref<File | null>(null);

// Trigger the hidden file input when the logo area is clicked
function triggerLogoUpload() {
  logoInput.value?.click();
}

// Handle logo file selection
function handleLogoUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  // Check file format
  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    logoError.value = "Please upload a PNG, JPG or WebP file only";
    logoPreview.value = null;
    logoFile.value = null;
    return;
  }

  // Clear any previous error
  logoError.value = "";
  logoFile.value = file;

  // Show preview
  const reader = new FileReader();
  reader.onload = (e) => {
    logoPreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

// Validate required fields before proceeding
function validate() {
  let valid = true;

  if (!form.name.trim()) {
    errors.name = "Business Name is required";
    valid = false;
  } else {
    errors.name = "";
  }

  if (!form.category) {
    errors.category = "Please select a Business Category";
    valid = false;
  } else {
    errors.category = "";
  }

  return valid;
}

// Handle Continue to Location button
async function handleContinue() {
  if (!validate()) return;

  isLoading.value = true;
  apiError.value = "";

  try {
    // Call the backend to create the business
    const response = await api.post("/businesses", {
      name: form.name,
      category: form.category,
      description: form.description,
      booking_policy: form.bookingPolicy,
    });

    if (response.data) {
      // Save the business ID for the next onboarding steps
      businessId.value = response.data.id;
      localStorage.setItem(
        "onboarding_business_id",
        response.data.id.toString(),
      );

      // Also save form data locally as backup
      localStorage.setItem("onboarding_business", JSON.stringify(form));

      // Navigate to Location Setup
      navigateTo("/onboarding/location");
    } else {
      // Show any validation errors from the backend
      apiError.value =
        response.message || "Something went wrong. Please try again.";
    }
  } catch (error) {
    apiError.value =
      "Could not connect to the server. Please check your connection.";
  } finally {
    isLoading.value = false;
  }
}

// Handle Finish Later
function handleFinishLater() {
  // Save current progress
  localStorage.setItem("onboarding_business", JSON.stringify(form));
  // Navigate to dashboard or login
  navigateTo("/");
}

// Handle Cancel
function handleCancel() {
  navigateTo("/");
}

// On page load, restore any previously saved data
onMounted(() => {
  const saved = localStorage.getItem("onboarding_business");
  if (saved) {
    const data = JSON.parse(saved);
    form.name = data.name || "";
    form.category = data.category || "";
    form.description = data.description || "";
    form.bookingPolicy = data.bookingPolicy || "instant";
  }
});
</script>
