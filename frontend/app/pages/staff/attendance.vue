<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Left Sidebar -->
    <div
      class="w-56 min-h-screen bg-white border-r border-gray-200 flex flex-col"
    >
      <div class="p-5 border-b border-gray-200">
        <div class="flex items-center gap-2">
          <div
            class="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-blue-600">Schedora</p>
            <p class="text-xs text-gray-400">Daily Operations</p>
          </div>
        </div>
      </div>
      <nav class="flex-1 p-3 space-y-1">
        <button
          @click="navigateTo('/customer/business/1')"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </button>
        <button
          @click="navigateTo('/staff/schedule')"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Schedule
        </button>
        <button
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white"
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          Attendance
        </button>
        <button
          @click="navigateTo('/staff/walkins')"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Walk-ins
        </button>
        <button
          @click="navigateTo('/staff/notifications')"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition relative"
        >
          <div class="relative">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
            ></span>
          </div>
          Notifications
        </button>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navigation -->
      <header
        class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between"
      >
        <h1 class="text-base font-bold text-gray-800">Staff Attendance Grid</h1>
        <div class="flex items-center gap-3">
          <div class="relative">
            <svg
              class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search staff or dates..."
              class="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            />
          </div>
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-xs font-semibold">A</span>
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-800">Alex Rivera</p>
              <p class="text-xs text-gray-400">Operations Manager</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 flex gap-4 p-6">
        <!-- Left — Attendance Grid -->
        <div class="flex-1">
          <!-- Controls -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-sm font-bold text-gray-800">
              Staff Attendance Grid
            </h2>
            <p class="text-xs text-gray-400">
              Manage and monitor weekly team availability across all
              departments.
            </p>
            <div class="flex items-center gap-2">
              <!-- Weekly/Monthly toggle -->
              <div
                class="flex border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  @click="viewMode = 'weekly'"
                  class="px-3 py-1.5 text-xs font-medium transition"
                  :class="
                    viewMode === 'weekly'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 hover:bg-gray-50'
                  "
                >
                  Weekly
                </button>
                <button
                  @click="viewMode = 'monthly'"
                  class="px-3 py-1.5 text-xs font-medium transition"
                  :class="
                    viewMode === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 hover:bg-gray-50'
                  "
                >
                  Monthly
                </button>
              </div>
              <button
                class="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition"
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                  />
                </svg>
                Filters
              </button>
            </div>
          </div>

          <!-- Week navigation -->
          <div
            class="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <div
              class="px-4 py-3 border-b border-gray-100 flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <button
                  @click="changeWeek(-1)"
                  class="w-6 h-6 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <svg
                    class="w-3 h-3 text-gray-500"
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
                </button>
                <span class="text-sm font-semibold text-gray-700">{{
                  weekRangeLabel
                }}</span>
                <button
                  @click="changeWeek(1)"
                  class="w-6 h-6 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <svg
                    class="w-3 h-3 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex items-center gap-3 text-xs">
                <span class="flex items-center gap-1">
                  <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                  Present
                </span>
                <span class="flex items-center gap-1">
                  <span class="w-2 h-2 bg-red-500 rounded-full"></span> Absent
                </span>
              </div>
            </div>

            <!-- Grid Table -->
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-100">
                    <th
                      class="text-left px-4 py-3 text-xs font-semibold text-gray-500 w-48"
                    >
                      Staff Member
                    </th>
                    <th
                      v-for="day in weekDays"
                      :key="day.label"
                      class="text-center px-3 py-3 text-xs font-semibold text-gray-500"
                    >
                      <div>{{ day.label }}</div>
                      <div class="text-gray-400 font-normal">
                        {{ day.date }}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="staff in staffList"
                    :key="staff.id"
                    class="border-b border-gray-50"
                  >
                    <!-- Staff info -->
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-2">
                        <div
                          class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                          :style="{ backgroundColor: staff.color }"
                        >
                          {{ staff.initials }}
                        </div>
                        <div>
                          <p class="text-xs font-semibold text-gray-800">
                            {{ staff.name }}
                          </p>
                          <p class="text-xs text-gray-400">
                            {{ staff.department }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <!-- Attendance cells -->
                    <td
                      v-for="day in weekDays"
                      :key="day.label"
                      class="px-3 py-3 text-center"
                    >
                      <span
                        v-if="getAttendance(staff.id, day.label) === 'present'"
                      >
                        <svg
                          class="w-5 h-5 text-green-500 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                      <span
                        v-else-if="
                          getAttendance(staff.id, day.label) === 'absent'
                        "
                      >
                        <svg
                          class="w-5 h-5 text-red-500 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                      <span v-else class="text-gray-300 text-sm">—</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- View all link -->
            <div class="px-4 py-3 border-t border-gray-100 text-right">
              <button
                class="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Staff ({{ staffList.length }})
              </button>
            </div>
          </div>
        </div>

        <!-- Right — Planning Panel -->
        <div class="w-64 space-y-4">
          <!-- Planning Next Week -->
          <div class="bg-white border border-gray-200 rounded-xl p-5">
            <div class="flex items-center gap-2 mb-1">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 class="text-sm font-bold text-gray-800">
                Planning: Next Week
              </h3>
            </div>
            <p class="text-xs text-gray-500 mb-4">
              Submit your availability for
              <span class="font-semibold text-gray-700">{{
                nextWeekLabel
              }}</span
              >.
            </p>

            <!-- Deadline warning -->
            <div
              class="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4 flex items-start gap-2"
            >
              <svg
                class="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <p class="text-xs font-semibold text-orange-700">
                  Entry Period Closing Soon
                </p>
                <p class="text-xs text-orange-600 mt-0.5">
                  All upcoming week schedules must be finalized at least 7 days
                  in advance. Late entries are restricted.
                </p>
              </div>
            </div>

            <!-- Target date range -->
            <div class="mb-3">
              <label class="block text-xs font-medium text-gray-700 mb-1"
                >Target Date Range</label
              >
              <select
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>{{ nextWeekLabel }} (Upcoming)</option>
              </select>
            </div>

            <!-- Start and End Time -->
            <div class="flex gap-2 mb-3">
              <div class="flex-1">
                <label class="block text-xs font-medium text-gray-700 mb-1"
                  >Start Time</label
                >
                <input
                  v-model="availability.startTime"
                  type="time"
                  class="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="flex-1">
                <label class="block text-xs font-medium text-gray-700 mb-1"
                  >End Time</label
                >
                <input
                  v-model="availability.endTime"
                  type="time"
                  class="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <!-- Select Active Days -->
            <div class="mb-4">
              <label class="block text-xs font-medium text-gray-700 mb-2"
                >Select Active Days</label
              >
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="day in daysOfWeek"
                  :key="day"
                  @click="toggleDay(day)"
                  class="w-9 h-9 rounded-full text-xs font-semibold transition"
                  :class="
                    availability.selectedDays.includes(day)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  "
                >
                  {{ day }}
                </button>
              </div>
            </div>

            <!-- Submit button -->
            <button
              @click="submitAttendance"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-lg transition"
            >
              Submit Attendance Plan
            </button>

            <!-- Success message -->
            <p v-if="submitted" class="text-xs text-green-600 text-center mt-2">
              ✓ Attendance plan submitted!
            </p>
          </div>

          <!-- Team Presence Score -->
          <div class="bg-blue-600 rounded-xl p-5 text-white">
            <p
              class="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-1"
            >
              Team Presence Score
            </p>
            <p class="text-4xl font-bold">{{ presenceScore }}%</p>
            <p class="text-xs text-blue-200 mt-1">+2.4% vs. previous week</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

// View mode
const viewMode = ref<"weekly" | "monthly">("weekly");

// Current week offset
const weekOffset = ref(0);

// Change week
function changeWeek(direction: number) {
  weekOffset.value += direction;
}

// Week days based on current week
const weekDays = computed(() => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1 + weekOffset.value * 7);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      label,
      date: d.getDate().toString(),
    };
  });
});

// Week range label
const weekRangeLabel = computed(() => {
  const first = weekDays.value[0];
  const last = weekDays.value[6];
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1 + weekOffset.value * 7);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return `${monday.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${sunday.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
});

// Next week label
const nextWeekLabel = computed(() => {
  const today = new Date();
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() - today.getDay() + 8);
  const nextSunday = new Date(nextMonday);
  nextSunday.setDate(nextMonday.getDate() + 6);
  return `${nextMonday.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${nextSunday.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
});

// Sample staff data
const staffList = ref([
  {
    id: 1,
    name: "Jane Doe",
    department: "Grooming Dept.",
    initials: "JD",
    color: "#3B82F6",
    attendance: {
      Mon: "present",
      Tue: "present",
      Wed: "present",
      Thu: "absent",
      Fri: "present",
      Sat: null,
      Sun: null,
    },
  },
  {
    id: 2,
    name: "Mark Smith",
    department: "Training Dept.",
    initials: "MS",
    color: "#8B5CF6",
    attendance: {
      Mon: "present",
      Tue: "absent",
      Wed: "present",
      Thu: "present",
      Fri: "present",
      Sat: "present",
      Sun: null,
    },
  },
  {
    id: 3,
    name: "Kelly White",
    department: "Walking Dept.",
    initials: "KW",
    color: "#F59E0B",
    attendance: {
      Mon: null,
      Tue: "present",
      Wed: "present",
      Thu: "present",
      Fri: "present",
      Sat: "present",
      Sun: "present",
    },
  },
  {
    id: 4,
    name: "Rick Jones",
    department: "Admin",
    initials: "RJ",
    color: "#10B981",
    attendance: {
      Mon: "present",
      Tue: "present",
      Wed: "present",
      Thu: "present",
      Fri: "present",
      Sat: null,
      Sun: null,
    },
  },
]);

// Get attendance for a staff member on a day
function getAttendance(staffId: number, day: string) {
  const staff = staffList.value.find((s) => s.id === staffId);
  return staff?.attendance[day as keyof typeof staff.attendance] ?? null;
}

// Team presence score
const presenceScore = computed(() => {
  let present = 0;
  let total = 0;
  staffList.value.forEach((s) => {
    Object.values(s.attendance).forEach((v) => {
      if (v !== null) {
        total++;
        if (v === "present") present++;
      }
    });
  });
  return total > 0 ? Math.round((present / total) * 100) : 0;
});

// Days of week for selector
const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// Availability form
const availability = reactive({
  startTime: "09:00",
  endTime: "17:00",
  selectedDays: ["Mo", "Tu", "We", "Th", "Fr"] as string[],
});

// Toggle a day
function toggleDay(day: string) {
  const index = availability.selectedDays.indexOf(day);
  if (index === -1) {
    availability.selectedDays.push(day);
  } else {
    availability.selectedDays.splice(index, 1);
  }
}

// Submit attendance
const submitted = ref(false);
function submitAttendance() {
  // In production this calls POST /api/staff/:staffId/availability
  submitted.value = true;
  setTimeout(() => (submitted.value = false), 3000);
}
</script>
