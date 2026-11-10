<template>
  <HelpPage
    subtitle="How to set up your business on Schedora"
    back-to="/onboarding/business-info"
    back-label="Back to setup"
    :items="items"
  />
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

const items = [
  {
    q: "What is the setup process?",
    a: "Setup has 5 steps: Business Info, Location, Services, Staff and Images. The sidebar shows your progress and the step you are on.",
  },
  {
    q: "Can I finish setup later?",
    a: 'Yes. Click "Finish Later" at the bottom of the sidebar. Whatever you saved on earlier steps is kept.',
  },
  {
    q: "Which steps are required?",
    a: "Business Info (name, category, booking policy), at least one Location, and at least one Image. Services and Staff can be added later.",
  },
  {
    q: "What is the difference between Instant and Request booking?",
    a: "Instant confirms bookings automatically. Request means you approve each booking yourself.",
  },
  {
    q: "How do I invite staff?",
    a: "On the Staff step enter their name and email, pick a role, then click Send Invitation. They receive an email to set up their account.",
  },
  {
    q: "What are the Cover and Banner images?",
    a: "Hover over an uploaded photo to set it as the Cover (shown on listings) or the Main Banner (top of your business page). Only one of each is allowed.",
  },
];
</script>
