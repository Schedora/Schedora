/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import BranchesController from '#controllers/branches_controller'

const AuthController = () => import('#controllers/auth_controller')
const BusinessesController = () => import('#controllers/businesses_controller')
const StaffController = () => import('#controllers/staff_controller')
const ServicesController = () => import('#controllers/services_controller')
const AttendancesController = () => import('#controllers/attendances_controller')
const BookingController = () => import('#controllers/bookings_controller')
const NotificationController = () => import('#controllers/notifications_controller')

/*
|--------------------------------------------------------------------------
| Auth Routes — Public (no login required)
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    // Register a new account
    router.post('/register', [AuthController, 'register'])

    // Login
    router.post('/login', [AuthController, 'login'])

    //Forgot password - send reset email
    router.post('/forgot-password', [AuthController, 'forgotPassword'])

    //Reset password - validate token and update password
    router.post('/reset_password', [AuthController, 'resetPassword'])
  })
  .prefix('/api/auth')

/*
|--------------------------------------------------------------------------
| Auth Routes — Protected (login required)
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    // Logout
    router.delete('/logout', [AuthController, 'logout'])

    // Get current user profile
    router.get('/me', [AuthController, 'me'])
  })
  .prefix('/api/auth')
  .use(middleware.auth({ guards: ['api'] }))

/*
|--------------------------------------------------------------------------
| Business Routes — Public (no login required)
|--------------------------------------------------------------------------
*/
// Returns all active businesses — filterable by category
router.get('/api/businesses', [BusinessesController, 'index'])

// Returns a single business by ID
router.get('/api/businesses/:id', [BusinessesController, 'show'])

/*
|--------------------------------------------------------------------------
| Business Routes — Protected (login required)
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    // Creates a new business during owner onboarding
    router.post('/businesses', [BusinessesController, 'store'])

    // Updates an existing business profile
    router.put('/businesses/:id', [BusinessesController, 'update'])

    // Registers an additional business for an existing owner
    router.post('/businesses/:id/register-new', [BusinessesController, 'registerNew'])

    // Upload gallery images for a business
    router.post('/businesses/:id/images', [BusinessesController, 'uploadImages'])

    // Set a specific image as the cover photo
    router.put('/businesses/:id/images/:imageId/cover', [BusinessesController, 'setCover'])

    // Set a specific image as the main banner
    router.put('/businesses/:id/images/:imageId/banner', [BusinessesController, 'setBanner'])

    // Delete a specific image
    router.delete('/businesses/:id/images/:imageId', [BusinessesController, 'deleteImage'])

    // ---------------------------------------------------------------
    // Branch / Location API
    // ---------------------------------------------------------------

    // Add a new branch to a business
    router.post('/businesses/:id/branches', [BranchesController, 'store'])

    // Get all branches for a business
    router.get('/businesses/:id/branches', [BranchesController, 'index'])

    // Update a specific branch
    router.put('/businesses/:id/branches/:branchId', [BranchesController, 'update'])

    // Delete a specific branch
    router.delete('/businesses/:id/branches/:branchId', [BranchesController, 'destroy'])

    // ---------------------------------------------------------------
    // Service API
    // ---------------------------------------------------------------

    // Get all active services for a business
    // Used to populate the Service Type dropdown on the customer booking form
    router.get('/businesses/:id/services', [ServicesController, 'index'])

    // Add a new service to a business catalog
    // Called during onboarding and from the owner dashboard
    router.post('/businesses/:id/services', [ServicesController, 'store'])

    // Update an existing service
    // Called when the owner edits a service from their dashboard
    router.put('/businesses/:id/services/:serviceId', [ServicesController, 'update'])

    // Delete a service permanently
    // Called when the owner removes a service from their catalog
    router.delete('/businesses/:id/services/:serviceId', [ServicesController, 'destroy'])
  })
  .prefix('/api')
  .use([middleware.auth({ guards: ['api'] }), middleware.owner()])

//---------------------------------------------------------- ------
// Staff Availability API
//---------------------------------------------------------------

// Staff submits their weekly availability
// Must be submitted at least 7 days before the week starts
router.post('/staff/:staffId/availability', [AttendancesController, 'store'])

// Get availability for a specific staff member
// Used by the booking engine to filter available slots
router.get('/staff/:staffId/availability', [AttendancesController, 'index'])

// Update an existing availability record
// Staff can update before a slot is booked
router.put('/staff/:staffId/availability/:id', [AttendancesController, 'update'])

// Get available booking slots for a business on a specific date
// Used by the customer booking form
router.get('/businesses/:businessId/available-slots', [AttendancesController, 'availableSlots'])

/*
|--------------------------------------------------------------------------
| Staff Routes — Protected (owner only)
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    // Get all staff for a business
    router.get('/business/:id/staff', [StaffController, 'index'])

    // Get available staff for booking
    router.get('/business/:id/staff/available', [StaffController, 'available'])

    // Get individual staff profile
    router.get('/business/:id/staff/:staffId', [StaffController, 'show'])

    // Create staff account
    router.post('/business/:id/staff', [StaffController, 'store'])

    // Send invitation email
    router.post('/business/:id/staff/:staffId/invite', [StaffController, 'invite'])

    // Update staff details
    router.put('/business/:id/staff/:staffId', [StaffController, 'update'])

    // Remove staff member
    router.delete('/business/:id/staff/:staffId', [StaffController, 'destroy'])

  })
  .prefix('/api')
  .use([middleware.auth({ guards: ['api'] }), middleware.owner()])

/*
|--------------------------------------------------------------------------
| Booking Routes — Protected (login required)
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    // Create new booking — customers
    router.post('/bookings', [BookingController, 'store'])

    // Get all bookings — owner
    router.get('/bookings', [BookingController, 'index'])

    // Get bookings for a specific customer
    router.get('/bookings/customer/:id', [BookingController, 'byCustomer'])

    // Get bookings for a specific staff member
    router.get('/bookings/staff/:id', [BookingController, 'byStaff'])

    // Edit booking
    router.put('/bookings/:id', [BookingController, 'update'])

    // Cancel booking
    router.delete('/bookings/:id', [BookingController, 'destroy'])

    // Mark booking as complete — staff
    router.put('/bookings/:id/complete', [BookingController, 'complete'])

    // Create walk-in booking — staff
    router.post('/bookings/walkin', [BookingController, 'walkIn'])
  })
  .prefix('/api')
  .use(middleware.auth({ guards: ['api'] }))

/*
|--------------------------------------------------------------------------
| Notification Routes — Protected (login required)
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    // Get all notifications for a staff member
    router.get('/notifications/staff/:id', [NotificationController, 'byStaff'])

    // Mark single notification as read
    router.put('/notifications/:id/read', [NotificationController, 'markRead'])

    // Mark all notifications as read
    router.put('/notifications/staff/:id/read-all', [NotificationController, 'markAllRead'])
  })  
  .prefix('/api')
  .use(middleware.auth({ guards: ['api'] }))  
