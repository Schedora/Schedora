/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import limiter from '@adonisjs/limiter/services/main'

// Global — 60 requests/minute
// Applied to: auth protected, attendance, analytics, notifications
export const throttle = limiter.define('global', (ctx) => {
  return limiter
    .allowRequests(60)
    .every('1 minute')
    .usingKey(`global_${ctx.request.ip()}`)
})

// Auth — 5 requests/minute
// Applied to: login, register, forgot-password, reset-password
export const authThrottle = limiter.define('auth', (ctx) => {
  return limiter
    .allowRequests(5)
    .every('1 minute')
    .usingKey(`auth_${ctx.request.ip()}`)
})

// Bookings — 30 requests/minute
// Applied to: all booking routes
export const bookingThrottle = limiter.define('booking', (ctx) => {
  return limiter
    .allowRequests(30)
    .every('1 minute')
    .usingKey(`booking_${ctx.request.ip()}`)
})

// Reviews — 10 requests/minute
// Applied to: all review routes
export const reviewThrottle = limiter.define('review', (ctx) => {
  return limiter
    .allowRequests(10)
    .every('1 minute')
    .usingKey(`review_${ctx.request.ip()}`)
})

// Staff — 20 requests/minute
// Applied to: staff management routes
export const staffThrottle = limiter.define('staff', (ctx) => {
  return limiter
    .allowRequests(20)
    .every('1 minute')
    .usingKey(`staff_${ctx.request.ip()}`)
})

// Availability — 20 requests/minute
// Applied to: availability routes
export const availabilityThrottle = limiter.define('availability', (ctx) => {
  return limiter
    .allowRequests(20)
    .every('1 minute')
    .usingKey(`availability_${ctx.request.ip()}`)
})

// Add to limiter.ts
export const publicThrottle = limiter.define('public', (ctx) => {
  return limiter
    .allowRequests(30)
    .every('1 minute')
    .usingKey(`public_${ctx.request.ip()}`)
})