import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const BusinessesController = () => import('#controllers/businesses_controller')

router
  .group(() => {
    // Returns all active businesses — filterable by category
    // Used by customer login dropdown
    router.get('/businesses', [BusinessesController, 'index'])

    // Returns a single business by ID
    // Used to populate the business landing page
    router.get('/businesses/:id', [BusinessesController, 'show'])

    // Creates a new business during owner onboarding
    router.post('/businesses', [BusinessesController, 'store'])

    // Updates an existing business profile
    router.put('/businesses/:id', [BusinessesController, 'update'])

    // Registers an additional business for an existing owner
    // Called from the User Profile on the owner dashboard
    router.post('/businesses/:id/register-new', [BusinessesController, 'registerNew'])
  })
  .use(middleware.auth())
