<template>
  <HelpPage
    subtitle="How to use your staff portal"
    back-to="/staff/schedule"
    back-label="Back to schedule"
    :items="items"
  />
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

const items = [
  {
    q: "How do I see my appointments?",
    a: "Schedule shows your appointments for the day. Use the arrows or Today to change the date.",
  },
  {
    q: "How do I mark an appointment as done?",
    a: 'Click "Mark as Done" next to the appointment and confirm. The owner dashboard updates to show it as completed.',
  },
  {
    q: "How do I submit my availability?",
    a: "Open Attendance, choose your start and end time and active days for next week, then click Submit Attendance Plan. It must be submitted at least 7 days ahead.",
  },
  {
    q: "How do I register a walk-in customer?",
    a: "Open Walk-ins, enter the customer name, choose a service, then click Log Walk-in Entry.",
  },
  {
    q: "Where do I see booking changes?",
    a: "Notifications lists new bookings, reschedules and cancellations. Use Mark All Read to clear the red dot.",
  },
];
</script>
