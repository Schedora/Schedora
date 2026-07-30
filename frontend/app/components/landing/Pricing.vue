<template>
  <section id="pricing" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Start free for 14 days. No credit card required.
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- Free Trial -->
        <div class="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div class="mb-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Free Trial</h3>
            <p class="text-gray-500 text-sm">Perfect for getting started</p>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-bold text-gray-900">KSh 0</span>
            <span class="text-gray-500">/14 days</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3">
              <span class="text-green-500">✓</span>
              <span class="text-gray-600">Up to 50 bookings</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-green-500">✓</span>
              <span class="text-gray-600">Up to 3 staff members</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-green-500">✓</span>
              <span class="text-gray-600">Basic analytics</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-green-500">✓</span>
              <span class="text-gray-600">Email notifications</span>
            </li>
          </ul>
          <NuxtLink
            to="/auth/register"
            class="block text-center bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            Start Free Trial
          </NuxtLink>
        </div>

        <!-- Basic -->
        <div class="bg-blue-600 rounded-2xl p-8 border border-blue-600 relative">
          <!-- Popular Badge -->
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
              Most Popular
            </span>
          </div>
          <div class="mb-6">
            <h3 class="text-xl font-bold text-white mb-2">Basic</h3>
            <p class="text-blue-200 text-sm">For growing businesses</p>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-bold text-white">KSh 1,500</span>
            <span class="text-blue-200">/month</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3">
              <span class="text-blue-200">✓</span>
              <span class="text-white">Unlimited bookings</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-blue-200">✓</span>
              <span class="text-white">Up to 10 staff members</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-blue-200">✓</span>
              <span class="text-white">Advanced analytics</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-blue-200">✓</span>
              <span class="text-white">SMS + Email notifications</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-blue-200">✓</span>
              <span class="text-white">Customer reviews</span>
            </li>
          </ul>
          <NuxtLink
            to="/auth/register?type=owner"
            class="block text-center bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Started
          </NuxtLink>
        </div>

        <!-- Premium -->
        <div class="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div class="mb-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Premium</h3>
            <p class="text-gray-500 text-sm">For large enterprises</p>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-bold text-gray-900">KSh 3,500</span>
            <span class="text-gray-500">/month</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3">
              <span class="text-green-500">✓</span>
              <span class="text-gray-600">Unlimited bookings</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-green-500">✓</span>
              <span class="text-gray-600">Unlimited staff members</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-green-500">✓</span>
              <span class="text-gray-600">Full analytics suite</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-green-500">✓</span>
              <span class="text-gray-600">Priority support</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-green-500">✓</span>
              <span class="text-gray-600">Multiple branches</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-green-500">✓</span>
              <span class="text-gray-600">Custom branding</span>
            </li>
          </ul>
          <a
            href="#contact"
            class="block text-center bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            Contact Sales
          </a>
        </div>

      </div>
    </div>
  </section>
</template>