<template>
  <HelpPage
    subtitle="How to use your business dashboard"
    back-to="/owner/dashboard"
    back-label="Back to dashboard"
    :items="items"
  />
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

const items = [
  {
    q: "What does the Overview show?",
    a: "A snapshot of your business: total revenue, bookings, pending reviews, average rating, today's bookings and staff performance.",
  },
  {
    q: "How do I view revenue?",
    a: "Open Revenue from the left menu. Switch between 7 and 30 days, and check recent transactions and the live Completed and Pending totals.",
  },
  {
    q: "How do I register another business?",
    a: 'Click your avatar in the top right and choose "Register a New Business". Your existing business is not affected.',
  },
  {
    q: "How do I see my business page as a customer?",
    a: "Click Home in the left menu to open your public business page.",
  },
  {
    q: "Where do I manage staff and reviews?",
    a: "Use Staff and Reviews in the left menu to view your team and respond to customer reviews.",
  },
  {
    q: "How do I sign out?",
    a: "Click your avatar in the top right and choose Sign Out.",
  },
];
</script>
