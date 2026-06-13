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

const AuthController = () => import('#controllers/auth_controller')
const BusinessesController = () => import('#controllers/businesses_controller')
const StaffController = () => import('#controllers/staff_controller')

/*
|--------------------------------------------------------------------------
| Auth Routes — Public (no login required)
|--------------------------------------------------------------------------
*/
router.group(() => {
  // Register a new account
  router.post('/register', [AuthController, 'register'])

  // Login
  router.post('/login', [AuthController, 'login'])

  //Forgot password - send reset email
  router.post('/forgot-password', [AuthController, 'forgotPassword'])

  //Reset password - validate token and update password
  router.post('/reset_password', [AuthController, 'resetPassword'])
}).prefix('/api/auth')

/*
|--------------------------------------------------------------------------
| Auth Routes — Protected (login required)
|--------------------------------------------------------------------------
*/
router.group(() => {
  // Logout
  router.delete('/logout', [AuthController, 'logout'])

  // Get current user profile
  router.get('/me', [AuthController, 'me'])
}).prefix('/api/auth').use(middleware.auth({ guards: ['api'] }))

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
router.group(() => {
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

}).prefix('/api').use([
  middleware.auth({ guards: ['api'] }),
  middleware.owner()
])

/*
|--------------------------------------------------------------------------
| Staff Routes — Protected (owner only)
|--------------------------------------------------------------------------
*/
router.group(() => {
  // Get all staff for a business
  router.get('/business/:id/staff', [StaffController, 'index'])

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

  // Get available staff for booking
  router.get('/business/:id/staff/available', [StaffController, 'available'])

}).prefix('/api').use([
  middleware.auth({ guards: ['api'] }),
  middleware.owner()
])