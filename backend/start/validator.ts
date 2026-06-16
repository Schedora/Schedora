import { DateTime } from 'luxon'
import vine, { VineDate } from '@vinejs/vine'

VineDate.macro('toDateTime', function (this: any) {
  return this.transform((value: Date) => DateTime.fromJSDate(value))
})
