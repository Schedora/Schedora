import { defineConfig } from '@adonisjs/cors'

const corsConfig = defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Enabled
  |--------------------------------------------------------------------------
  | Enable or disable CORS
  */
  enabled: true,

  /*
  |--------------------------------------------------------------------------
  | Origin
  |--------------------------------------------------------------------------
  | List of origins allowed to make requests to your API.
  | During development we allow localhost:3000 (Nuxt frontend)
  | In production this should be your actual domain
  */
  origin: [
    'http://localhost:3000',      // Nuxt frontend development
    'http://localhost:3333',      // Backend itself
    'https://schedora.com',       // Production domain (add when ready)
    'https://www.schedora.com',   // Production www domain
  ],

  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  | HTTP methods allowed for cross-origin requests
  */
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

  /*
  |--------------------------------------------------------------------------
  | Headers
  |--------------------------------------------------------------------------
  | Headers allowed in cross-origin requests
  */
  headers: true,

  /*
  |--------------------------------------------------------------------------
  | Expose Headers
  |--------------------------------------------------------------------------
  | Headers exposed to the browser
  */
  exposeHeaders: [
    'cache-control',
    'content-language',
    'content-type',
    'expires',
    'last-modified',
    'pragma',
  ],

  /*
  |--------------------------------------------------------------------------
  | Credentials
  |--------------------------------------------------------------------------
  | Allow cookies and auth headers in cross-origin requests
  | Must be true for our token-based auth to work
  */
  credentials: true,

  /*
  |--------------------------------------------------------------------------
  | Max Age
  |--------------------------------------------------------------------------
  | How long browsers cache the CORS preflight response (in seconds)
  | 90 minutes = 5400 seconds
  */
  maxAge: 5400,
})

export default corsConfig