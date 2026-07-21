import { ExceptionHandler, HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class HttpExceptionHandler extends ExceptionHandler {
  // Only show detailed errors in development, not production
  protected debug = !app.inProduction

  // Handle the error and return a response
  async handle(error: unknown, ctx: HttpContext) {
    return super.handle(error, ctx)
  }

  // Log/report the error
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}