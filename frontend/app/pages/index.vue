<template>
  <div class="min-h-screen">
    <LandingNavBar />
    <LandingHeroSection />
    <LandingHowitWorks />
    <LandingWhyChoose />
    <LandingTestimonials />
    <LandingCtaBanner />
    <LandingPricing />
    <LandingAbout />
    <LandingFooter />
    
  </div>
</template>

<script setup>
onMounted(() => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (token && user.role) {
    if (user.role === 'customer') {
      navigateTo('/customer/bookings')
    } else if (user.role === 'staff') {
      navigateTo('/staff/schedule')
    } else if (user.role === 'owner') {
      navigateTo('/owner/dashboard')
    }
  }
})
</script>