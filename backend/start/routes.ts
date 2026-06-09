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


router
  .group(() => {
    //Register a new account
    router.post('/register', [AuthController, 'register'])

    //login
    router.post('/login', [AuthController, 'login'])

  })
  .prefix('/api/auth')
  

router
  .group(() => {
    //logout
    router.delete('/logout', [AuthController, 'logout'])

    //Get cureent user profile
    router.get('/me', [AuthController, 'me'])
  })
  .prefix('/api/auth').use(middleware.auth({ guards: ['api'] }))
