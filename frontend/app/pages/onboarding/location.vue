<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <OnboardingSidebar :current-step="2" @finish-later="handleFinishLater" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navigation -->
      <header
        class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between"
      >
        <h2 class="text-lg font-semibold text-gray-800">Schedora Business</h2>
        <div class="flex items-center gap-4">
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
          <div
            class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-xs font-semibold">O</span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Location Setup</h1>
        <p class="text-gray-500 mb-8">
          Add the physical addresses for your business branches to help
          customers find you.
        </p>

        <div class="flex gap-6">
          <!-- Add New Branch Form -->
          <div
            class="bg-white border border-gray-200 rounded-xl p-6 w-96 flex-shrink-0"
          >
            <h3
              class="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Add New Branch
            </h3>

            <div class="space-y-4">
              <!-- Branch Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Branch Name</label
                >
                <input
                  v-model="newBranch.name"
                  type="text"
                  placeholder="e.g. Downtown Boutique"
                  class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  :class="
                    branchErrors.name ? 'border-red-400' : 'border-gray-300'
                  "
                />
                <p v-if="branchErrors.name" class="text-red-500 text-xs mt-1">
                  {{ branchErrors.name }}
                </p>
              </div>

              <!-- Address -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Address</label
                >
                <textarea
                  v-model="newBranch.address"
                  placeholder="Street name, suite number, city, zip"
                  rows="3"
                  class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  :class="
                    branchErrors.address ? 'border-red-400' : 'border-gray-300'
                  "
                ></textarea>
                <p
                  v-if="branchErrors.address"
                  class="text-red-500 text-xs mt-1"
                >
                  {{ branchErrors.address }}
                </p>
              </div>

              <!-- Phone and Manager -->
              <div class="flex gap-3">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Phone Number</label
                  >
                  <input
                    v-model="newBranch.phone"
                    type="text"
                    placeholder="+1 (555) 000-0"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Branch Manager</label
                  >
                  <input
                    v-model="newBranch.manager"
                    type="text"
                    placeholder="Name"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <!-- Save Button -->
              <button
                type="button"
                @click="saveBranch"
                :disabled="isLoading"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
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
                <svg
                  v-else
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                {{ isLoading ? "Saving..." : "Save Location" }}
              </button>
            </div>
          </div>

          <!-- Your Locations Panel -->
          <div class="flex-1">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-semibold text-gray-800">
                Your Locations ({{ branches.length }})
              </h3>
              <span
                v-if="branches.length > 2"
                class="text-xs text-blue-600 cursor-pointer"
                >SCROLL TO VIEW ALL</span
              >
            </div>

            <!-- Branch Cards -->
            <div class="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              <div
                v-for="(branch, index) in branches"
                :key="index"
                class="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <!-- Primary badge -->
                <div
                  class="relative h-24 bg-gray-100 flex items-center justify-center"
                >
                  <svg
                    class="w-8 h-8 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  <span
                    v-if="index === 0"
                    class="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full"
                    >Primary</span
                  >
                </div>
                <div class="p-4">
                  <h4 class="font-semibold text-gray-800 text-sm">
                    {{ branch.name }}
                  </h4>
                  <p class="text-xs text-gray-500 mt-1 flex items-start gap-1">
                    <svg
                      class="w-3 h-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    {{ branch.address }}
                  </p>
                  <p class="text-xs text-blue-600 mt-2">{{ branch.phone }}</p>
                  <div class="flex justify-end gap-2 mt-3">
                    <button
                      @click="editBranch(index)"
                      class="text-gray-400 hover:text-blue-600"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="deleteBranch(index)"
                      class="text-gray-400 hover:text-red-500"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Add more card -->
              <div
                class="bg-white border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-6 min-h-32 cursor-pointer hover:border-blue-300 transition"
              >
                <svg
                  class="w-6 h-6 text-gray-300 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p class="text-xs text-gray-400 text-center">
                  Add more branches if your business operates in multiple areas.
                </p>
              </div>
            </div>

            <!-- No branches message -->
            <div v-if="branches.length === 0" class="text-center py-8">
              <p class="text-sm text-gray-400">
                No branches added yet. Add at least one branch to continue.
              </p>
            </div>
          </div>
        </div>

        <!-- Error if no branches -->
        <p v-if="nobranchError" class="text-red-500 text-sm mt-4">
          {{ nobranchError }}
        </p>
        <p v-if="apiError" class="text-red-500 text-sm mt-2">{{ apiError }}</p>

        <!-- Action Buttons -->
        <div class="flex items-center justify-between mt-8">
          <button
            type="button"
            @click="navigateTo('/onboarding/business-info')"
            class="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium"
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
            Back
          </button>
          <div class="flex gap-3">
            <button
              type="button"
              @click="navigateTo('/onboarding/services')"
              class="px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              Skip for now
            </button>
            <button
              type="button"
              @click="handleContinue"
              class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              Continue to Services →
            </button>
          </div>
        </div>
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
definePageMeta({ layout: false });
const api = useApi();
const isLoading = ref(false);
const apiError = ref("");

// Get the business ID saved during Business Info step
const businessId = computed(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("onboarding_business_id");
  }
  return null;
});

// New branch form
const newBranch = reactive({
  name: "",
  address: "",
  phone: "",
  manager: "",
});

// Validation errors for the form
const branchErrors = reactive({
  name: "",
  address: "",
});

// Error shown when trying to continue without any branches
const nobranchError = ref("");

// List of saved branches
const branches = ref<
  { name: string; address: string; phone: string; manager: string }[]
>([]);

// Track if we are editing an existing branch
const editingIndex = ref<number | null>(null);

// Validate the branch form
function validateBranch() {
  let valid = true;
  if (!newBranch.name.trim()) {
    branchErrors.name = "Branch name is required";
    valid = false;
  } else {
    branchErrors.name = "";
  }
  if (!newBranch.address.trim()) {
    branchErrors.address = "Address is required";
    valid = false;
  } else {
    branchErrors.address = "";
  }
  return valid;
}

// Save or update a branch
async function saveBranch() {
  if (!validateBranch()) return;

  if (!businessId.value) {
    apiError.value =
      "Business not found. Please go back and complete Business Info first.";
    return;
  }

  isLoading.value = true;
  apiError.value = "";

  try {
    if (editingIndex.value !== null) {
      // Update existing branch
      const branch = branches.value[editingIndex.value];
      if (!branch) return; // guard against undefined
      const response = await api.put(
        `/businesses/${businessId.value}/branches/${branch.id}`,
        {
          branch_name: newBranch.name,
          address: newBranch.address,
          phone: newBranch.phone,
          manager: newBranch.manager,
        },
      );

      if (response.data) {
        branches.value[editingIndex.value] = response.data;
        editingIndex.value = null;
      }
    } else {
      // Create new branch
      const response = await api.post(
        `/businesses/${businessId.value}/branches`,
        {
          branch_name: newBranch.name,
          address: newBranch.address,
          phone: newBranch.phone,
          manager: newBranch.manager,
        },
      );

      if (response.data) {
        branches.value.push(response.data);
      } else {
        apiError.value = response.message || "Failed to save branch.";
        return;
      }
    }

    // Clear form
    newBranch.name = "";
    newBranch.address = "";
    newBranch.phone = "";
    newBranch.manager = "";
    nobranchError.value = "";
  } catch (error) {
    apiError.value =
      "Could not connect to the server. Please check your connection.";
  } finally {
    isLoading.value = false;
  }
}

// Load branch into form for editing
function editBranch(index: number) {
  const branch = branches.value[index];
  if (!branch) return;
  newBranch.name = branch.name;
  newBranch.address = branch.address;
  newBranch.phone = branch.phone;
  newBranch.manager = branch.manager;
  editingIndex.value = index;
}

// Delete a branch
async function deleteBranch(index: number) {
  const branch = branches.value[index];
  if (!branch) return; // guard against undefined

  if (!branch.id || !businessId.value) {
    branches.value.splice(index, 1);
    return;
  }

  try {
    await api.del(`/businesses/${businessId.value}/branches/${branch.id}`);
    branches.value.splice(index, 1);
  } catch (error) {
    apiError.value = "Failed to delete branch.";
  }
}

// Continue to Services
function handleContinue() {
  if (branches.value.length === 0) {
    nobranchError.value = "Please add at least one branch before continuing";
    return;
  }
  navigateTo("/onboarding/services");
}

// Finish Later
function handleFinishLater() {
  localStorage.setItem("onboarding_branches", JSON.stringify(branches.value));
  navigateTo("/");
}

// Restore saved data on page load
onMounted(async () => {
  if (!businessId.value) return;

  try {
    const response = await api.get(`/businesses/${businessId.value}/branches`);
    if (response.data) {
      branches.value = response.data;
    }
  } catch (error) {
    console.error("Failed to load branches:", error);
  }
});
</script>
