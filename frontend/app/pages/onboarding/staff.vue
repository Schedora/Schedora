<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <OnboardingSidebar :current-step="4" @finish-later="handleFinishLater" />

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
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Team Setup</h1>
        <p class="text-gray-500 mb-8">
          Invite your staff members and assign them to locations and services to
          start accepting bookings.
        </p>

        <div class="flex gap-6">
          <!-- Add Staff Form -->
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Add Staff Member
            </h3>

            <div class="space-y-4">
              <!-- Full Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Full Name</label
                >
                <input
                  v-model="newStaff.name"
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  :class="
                    staffErrors.name ? 'border-red-400' : 'border-gray-300'
                  "
                />
                <p v-if="staffErrors.name" class="text-red-500 text-xs mt-1">
                  {{ staffErrors.name }}
                </p>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Email Address</label
                >
                <input
                  v-model="newStaff.email"
                  type="email"
                  placeholder="alex@example.com"
                  class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  :class="
                    staffErrors.email ? 'border-red-400' : 'border-gray-300'
                  "
                />
                <p v-if="staffErrors.email" class="text-red-500 text-xs mt-1">
                  {{ staffErrors.email }}
                </p>
              </div>

              <!-- Role -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Role</label
                >
                <select
                  v-if="!customRole"
                  v-model="newStaff.role"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  @change="handleRoleChange"
                >
                  <option value="">Select a role</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                  <option value="custom">Type my own...</option>
                </select>
                <div v-else class="flex gap-2">
                  <input
                    v-model="newStaff.role"
                    type="text"
                    placeholder="Enter custom role..."
                    class="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    type="button"
                    @click="
                      customRole = false;
                      newStaff.role = '';
                    "
                    class="text-xs text-gray-400 hover:text-gray-600 px-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <!-- Assigned Locations -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Assigned Locations</label
                >
                <div v-if="availableLocations.length > 0" class="space-y-2">
                  <label
                    v-for="location in availableLocations"
                    :key="location"
                    class="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :value="location"
                      v-model="newStaff.locations"
                      class="w-4 h-4 text-blue-600 rounded border-gray-300"
                    />
                    <span class="text-sm text-gray-700">{{ location }}</span>
                  </label>
                </div>
                <p v-else class="text-xs text-gray-400">
                  No locations added yet. Add branches in the Location step
                  first.
                </p>
              </div>

              <!-- Service Specialties -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Service Specialties</label
                >
                <div v-if="availableSpecialties.length > 0" class="space-y-2">
                  <label
                    v-for="specialty in availableSpecialties"
                    :key="specialty"
                    class="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :value="specialty"
                      v-model="newStaff.specialties"
                      class="w-4 h-4 text-blue-600 rounded border-gray-300"
                    />
                    <span class="text-sm text-gray-700">{{ specialty }}</span>
                  </label>
                </div>
                <p v-else class="text-xs text-gray-400">
                  No services added yet. Add services in the previous step
                  first.
                </p>
              </div>

              <!-- Send Invitation Button -->
              <button
                type="button"
                @click="sendInvitation"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send Invitation
              </button>
            </div>
          </div>

          <!-- Current Team Panel -->
          <div class="flex-1">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-semibold text-gray-800">
                Current Team ({{ teamMembers.length }})
              </h3>
              <button
                class="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Manage All
              </button>
            </div>

            <!-- Team Member Cards -->
            <div class="space-y-3">
              <div
                v-for="(member, index) in teamMembers"
                :key="index"
                class="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
              >
                <!-- Avatar -->
                <div
                  class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <span class="text-blue-600 text-sm font-semibold">{{
                    getInitials(member.name)
                  }}</span>
                </div>

                <!-- Info -->
                <div class="flex-1">
                  <p class="text-sm font-semibold text-gray-800">
                    {{ member.name }}
                  </p>
                  <p class="text-xs text-gray-500">{{ member.role }}</p>
                  <div class="flex items-center gap-3 mt-1">
                    <span
                      v-if="member.locations.length"
                      class="text-xs text-gray-400 flex items-center gap-1"
                    >
                      <svg
                        class="w-3 h-3"
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
                      {{ member.locations.join(", ") }}
                    </span>
                  </div>
                </div>

                <!-- Status Badge -->
                <span
                  class="text-xs px-2.5 py-1 rounded-full font-medium"
                  :class="
                    member.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  "
                >
                  {{ member.status }}
                </span>

                <!-- Delete -->
                <button
                  @click="removeMember(index)"
                  class="text-gray-300 hover:text-red-500"
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

              <!-- Add another member card -->
              <div
                class="bg-white border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-300 transition"
              >
                <svg
                  class="w-8 h-8 text-gray-300 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                <p class="text-xs text-gray-400">Add another staff member</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-between mt-8">
          <button
            type="button"
            @click="navigateTo('/onboarding/services')"
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
            Back to Services
          </button>
          <div class="flex gap-3">
            <button
              type="button"
              @click="handleSkip"
              class="px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              Skip for now
            </button>
            <button
              type="button"
              @click="handleContinue"
              class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              Continue to Images →
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

// New staff form state
const newStaff = reactive({
  name: "",
  email: "",
  role: "",
  locations: [] as string[],
  specialties: [] as string[],
});

// Validation errors
const staffErrors = reactive({
  name: "",
  email: "",
});

// Location input for tag-style input
const locationInput = ref("");

// Whether the owner is typing a custom role
const customRole = ref(false);

// Handle role dropdown change
function handleRoleChange() {
  if (newStaff.role === "custom") {
    customRole.value = true;
    newStaff.role = "";
  }
}

// Available locations — pulled from what was saved in the Location step
const availableLocations = ref<string[]>([]);

// Available specialties — pulled from what was saved in the Services step
const availableSpecialties = ref<string[]>([]);

// Team members list
const teamMembers = ref<
  {
    name: string;
    email: string;
    role: string;
    locations: string[];
    specialties: string[];
    status: string;
  }[]
>([]);

// Get initials for avatar
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Validate the form
function validate() {
  let valid = true;
  if (!newStaff.name.trim()) {
    staffErrors.name = "Full name is required";
    valid = false;
  } else {
    staffErrors.name = "";
  }
  if (!newStaff.email.trim()) {
    staffErrors.email = "Email address is required";
    valid = false;
  } else {
    staffErrors.email = "";
  }
  return valid;
}

// Send invitation
function sendInvitation() {
  if (!validate()) return;

  teamMembers.value.push({
    name: newStaff.name,
    email: newStaff.email,
    role: newStaff.role || "Staff",
    locations: [...newStaff.locations],
    specialties: [...newStaff.specialties],
    status: "Pending Invite",
  });

  // Clear form
  newStaff.name = "";
  newStaff.email = "";
  newStaff.role = "";
  newStaff.locations = [];
  newStaff.specialties = [];

  // Save to localStorage
  localStorage.setItem("onboarding_staff", JSON.stringify(teamMembers.value));
}

// Remove a team member
function removeMember(index: number) {
  teamMembers.value.splice(index, 1);
  localStorage.setItem("onboarding_staff", JSON.stringify(teamMembers.value));
}

// Skip — staff setup is optional
function handleSkip() {
  navigateTo("/onboarding/images");
}

// Continue to Images
function handleContinue() {
  localStorage.setItem("onboarding_staff", JSON.stringify(teamMembers.value));
  navigateTo("/onboarding/images");
}

// Finish Later
function handleFinishLater() {
  localStorage.setItem("onboarding_staff", JSON.stringify(teamMembers.value));
  navigateTo("/");
}

onMounted(() => {
  // Restore saved staff
  const savedStaff = localStorage.getItem("onboarding_staff");
  if (savedStaff) {
    teamMembers.value = JSON.parse(savedStaff);
  }

  // Load branches from Location step
  const savedBranches = localStorage.getItem("onboarding_branches");
  if (savedBranches) {
    const branches = JSON.parse(savedBranches);
    availableLocations.value = branches.map((b: { name: string }) => b.name);
  }

  // Load services from Services step
  const savedServices = localStorage.getItem("onboarding_services");
  if (savedServices) {
    const services = JSON.parse(savedServices);
    availableSpecialties.value = services.map((s: { name: string }) => s.name);
  }
});
</script>
