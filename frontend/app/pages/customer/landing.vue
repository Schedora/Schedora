<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation Bar -->
    <nav class="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div
        class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-4 h-4 text-white"
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
          <span class="text-lg font-bold text-blue-600">Schedora</span>
        </div>

        <!-- Nav Links -->
        <div class="hidden md:flex items-center gap-8">
          <a
            href="#home"
            class="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >Home</a
          >
          <a
            href="#services"
            class="text-sm font-medium text-gray-500 hover:text-blue-600 transition"
            >Services</a
          >
          <a
            href="#about"
            class="text-sm font-medium text-gray-500 hover:text-blue-600 transition"
            >About</a
          >
          <a
            href="#contact"
            class="text-sm font-medium text-gray-500 hover:text-blue-600 transition"
            >Contact</a
          >
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-3">
          <a
            href="/login"
            class="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
            >Log In</a
          >
          <button
            @click="handleBookNow"
            class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section
      id="home"
      class="max-w-7xl mx-auto px-6 py-16 flex items-center gap-12"
    >
      <!-- Left content -->
      <div class="flex-1">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
        >
          <div class="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
          RELIABLE & FAST
        </div>

        <!-- Headline -->
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"
        >
          Seamless Scheduling<br />for Every Service
        </h1>

        <!-- Subtext -->
        <p class="text-gray-500 text-base mb-8 max-w-md">
          Book salon visits, car washes, and more in seconds. Your time is
          valuable — we make sure it's managed perfectly.
        </p>

        <!-- CTA Buttons -->
        <div class="flex items-center gap-4 mb-8">
          <button
            @click="handleBookNow"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition"
          >
            Book Now
          </button>
          <button
            @click="scrollToServices"
            class="border border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 font-semibold px-7 py-3 rounded-xl transition"
          >
            Explore Services
          </button>
        </div>

        <!-- Social proof -->
        <div class="flex items-center gap-3">
          <!-- Avatar stack -->
          <div class="flex -space-x-2">
            <div
              v-for="i in 3"
              :key="i"
              class="w-8 h-8 rounded-full border-2 border-white bg-blue-200 flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p class="text-sm text-gray-600">
            <span class="font-bold text-gray-900">5,000+</span> happy users
            booked today
          </p>
        </div>
      </div>

      <!-- Right — Hero image -->
      <div class="flex-1 hidden md:flex justify-center">
        <div
          class="w-full max-w-md bg-gray-100 rounded-2xl overflow-hidden shadow-xl aspect-video flex items-center justify-center"
        >
          <div class="text-center p-8">
            <div
              class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-blue-600"
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
            <p class="text-sm text-gray-400">Scheduling Interface</p>
            <p class="text-xs text-gray-300 mt-1">
              [ Insert tablet screenshot ]
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Premier Services Section -->
    <section id="services" class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Our Premier Services
          </h2>
          <p class="text-gray-500 text-sm">
            Choose the category that fits your needs today.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="category in serviceCategories"
            :key="category.name"
            class="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center transition"
            :class="
              category.available
                ? 'hover:border-blue-400 hover:shadow-md cursor-pointer'
                : 'opacity-60 cursor-not-allowed'
            "
            @click="category.available && handleBookNow(category.name)"
          >
            <!-- Icon -->
            <div
              class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="category.icon"
                />
              </svg>
            </div>

            <!-- Name -->
            <p class="text-sm font-semibold text-gray-800 mb-1">
              {{ category.name }}
            </p>

            <!-- Description or Coming Soon -->
            <p v-if="category.available" class="text-xs text-gray-500">
              {{ category.description }}
            </p>
            <span
              v-else
              class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full mt-1"
              >Coming Soon</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Why Schedora Section -->
    <section id="about" class="py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row items-start gap-12">
          <!-- Left heading -->
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-gray-900 mb-3">
              Why Schedora is the standard.
            </h2>
            <p class="text-gray-500 text-sm">
              We built a platform that removes the friction from your daily
              logistics.
            </p>
          </div>

          <!-- Right value blocks -->
          <div class="flex-1 grid grid-cols-2 gap-6">
            <div
              v-for="benefit in benefits"
              :key="benefit.title"
              class="flex items-start gap-3"
            >
              <div
                class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
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
                    :d="benefit.icon"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-800">
                  {{ benefit.title }}
                </p>
                <p class="text-xs text-gray-500 mt-0.5">
                  {{ benefit.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-gray-50 py-12" id="contact">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex gap-4 overflow-x-auto pb-2">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="bg-white border border-gray-200 rounded-xl p-5 min-w-72 flex-shrink-0"
          >
            <!-- Stars -->
            <div class="flex gap-0.5 mb-3">
              <svg
                v-for="i in 5"
                :key="i"
                class="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <!-- Quote -->
            <p class="text-sm text-gray-600 mb-4">"{{ testimonial.quote }}"</p>
            <!-- Customer -->
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <span class="text-blue-600 text-xs font-semibold">{{
                  testimonial.name[0]
                }}</span>
              </div>
              <p class="text-xs font-semibold text-gray-700">
                {{ testimonial.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

// Check if customer is logged in
const isLoggedIn = computed(() => {
  // Check for auth token in localStorage
  return !!localStorage.getItem("auth_token");
});

// Handle Book Now button
function handleBookNow(category?: string) {
  if (isLoggedIn.value) {
    navigateTo(
      category
        ? `/customer/bookings?category=${category}`
        : "/customer/bookings",
    );
  } else {
    navigateTo("/login");
  }
}

// Scroll to services section
function scrollToServices() {
  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
}

// Service categories
const serviceCategories = ref([
  {
    name: "Beauty & Personal Care",
    description: "Salons, barbershops and beauty services",
    icon: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z",
    available: true,
  },
  {
    name: "Automotive Services",
    description: "Car washes, garages and auto care",
    icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
    available: true,
  },
  {
    name: "Health & Fitness",
    description: "Gyms, trainers and wellness services",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    available: true,
  },
  {
    name: "Pet Services",
    description: "Grooming, vet visits and pet care",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    available: true,
  },
]);

// Why Schedora benefits — exactly 4
const benefits = [
  {
    title: "Fast Booking",
    description: "Confirm your appointment in less than 30 seconds.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Verified Staff",
    description: "Every professional on our platform is background checked.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Easy Rescheduling",
    description: "Life happens. Move your slots with a single tap.",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    title: "Instant Confirmation",
    description: "Real-time alerts and email notifications for every booking.",
    icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  },
];

// Testimonials — at least 3
const testimonials = [
  {
    name: "Sarah J.",
    quote:
      "Best booking app ever! I scheduled my hair appointment in under a minute. Will never go back to calling.",
  },
  {
    name: "Mike T.",
    quote:
      "Incredible speed and reliability. Our trainers can check their schedules in real time, reducing missed shifts by 90%.",
  },
  {
    name: "David L.",
    quote:
      "So easy to manage my car wash. The data-driven insights helped us identify our peak hours and optimize staffing.",
  },
];
</script>
