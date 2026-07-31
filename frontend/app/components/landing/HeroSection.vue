<template>
  <section class="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
        
        <!-- Left Content -->
        <div class="flex-1 text-center lg:text-left">
          <!-- Badge -->
          <div class="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            ⭐ Trusted by 10,000+ businesses
          </div>

          <!-- Headline -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Schedora – Smart Scheduling for Businesses
          </h1>

          <!-- Subtext -->
          <p class="text-lg text-gray-600 mb-8">
            The all-in-one booking platform that helps businesses manage appointments, staff, and customers effortlessly.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <NuxtLink 
              to="/auth/register"
              class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Create Account
            </NuxtLink>
            <NuxtLink 
              to="/auth/register-owner"
              class="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              Register Your Business Now
            </NuxtLink>
          </div>
        </div>

        <!-- Right Content — Dashboard Preview -->
        <div class="flex-1 flex justify-center">
          <div class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div class="bg-blue-600 rounded-xl p-4 mb-4">
              <div class="flex justify-between items-center mb-3">
                <span class="text-white font-semibold">Today's Bookings</span>
                <span class="text-blue-200 text-sm">Mon, Jul 27</span>
              </div>
              <div class="text-3xl font-bold text-white">24</div>
              <div class="text-blue-200 text-sm">+12% from yesterday</div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">JM</div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">James Mwangi</div>
                    <div class="text-xs text-gray-500">Hair Cut · 10:00 AM</div>
                  </div>
                </div>
                <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Confirmed</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">AO</div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Amara Osei</div>
                    <div class="text-xs text-gray-500">Colour Treatment · 11:30 AM</div>
                  </div>
                </div>
                <span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Pending</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">SK</div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">Sarah Kamau</div>
                    <div class="text-xs text-gray-500">Manicure · 2:00 PM</div>
                  </div>
                </div>
                <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Confirmed</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>