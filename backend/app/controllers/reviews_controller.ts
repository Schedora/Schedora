import { HttpContext } from '@adonisjs/core/http'
import Review from '#models/review'
import Booking from '#models/booking'
import vine from '@vinejs/vine'

/*
|--------------------------------------------------------------------------
| Validators
|--------------------------------------------------------------------------
*/
const createReviewValidator = vine.compile(
  vine.object({
    booking_id: vine.number(),
    staff_rating: vine.number().min(1).max(5),
    business_rating: vine.number().min(1).max(5),
    comment: vine.string().maxLength(500).optional(),
  })
)

const respondValidator = vine.compile(
  vine.object({
    response: vine.string().minLength(1).maxLength(500),
  })
)

export default class ReviewController {
  /**
   * Submit a review
   * POST /api/reviews
   */
  async store({ request, response, auth }: HttpContext) {
    const customer = auth.user!
    const data = await request.validateUsing(createReviewValidator)

    // Check booking exists and belongs to customer
    const booking = await Booking.findOrFail(data.booking_id)

    if (booking.customerId !== customer.id) {
      return response.forbidden({
        message: 'You can only review your own bookings'
      })
    }

    // Check booking is completed
    if (booking.status !== 'completed') {
      return response.badRequest({
        message: 'You can only review completed appointments'
      })
    }

    // Check if review already exists for this booking
    const existingReview = await Review.findBy('booking_id', data.booking_id)
    if (existingReview) {
      return response.conflict({
        message: 'You have already reviewed this booking'
      })
    }

    // Create the review
    const review = await Review.create({
      bookingId: data.booking_id,
      customerId: customer.id,
      staffId: booking.staffId,
      businessId: null,
      staffRating: data.staff_rating,
      businessRating: data.business_rating,
      comment: data.comment,
    })

    return response.created({
      message: 'Review submitted successfully',
      review: {
        id: review.id,
        staff_rating: review.staffRating,
        business_rating: review.businessRating,
        comment: review.comment,
      },
    })
  }

  /**
   * Get all reviews for a business with Performance Pulse
   * GET /api/reviews/business/:id
   */
  async byBusiness({ params, request, response }: HttpContext) {
    const { rating, date, service_id } = request.qs()

    const query = Review.query()
      .where('business_id', params.id)
      .preload('customer')
      .preload('staff')

    if (rating) query.where('staff_rating', rating)
    if (date) query.whereRaw('DATE(created_at) = ?', [date])

    const reviews = await query.orderBy('created_at', 'desc')

    // Calculate Performance Pulse score
    const totalReviews = reviews.length
    const averageStaffRating = totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.staffRating, 0) / totalReviews
      : 0
    const averageBusinessRating = totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.businessRating, 0) / totalReviews
      : 0
    const performancePulse = ((averageStaffRating + averageBusinessRating) / 2).toFixed(1)

    // Rating breakdown
    const ratingBreakdown = {
      5: reviews.filter((r) => r.staffRating === 5).length,
      4: reviews.filter((r) => r.staffRating === 4).length,
      3: reviews.filter((r) => r.staffRating === 3).length,
      2: reviews.filter((r) => r.staffRating === 2).length,
      1: reviews.filter((r) => r.staffRating === 1).length,
    }

    return response.ok({
      performance_pulse: performancePulse,
      total_reviews: totalReviews,
      average_staff_rating: averageStaffRating.toFixed(1),
      average_business_rating: averageBusinessRating.toFixed(1),
      rating_breakdown: ratingBreakdown,
      reviews: reviews.map((r) => ({
        id: r.id,
        customer_name: r.customer.fullName,
        staff_rating: r.staffRating,
        business_rating: r.businessRating,
        comment: r.comment,
        response: r.response,
        is_flagged: r.isFlagged,
        helpful_count: r.helpfulCount,
        created_at: r.createdAt,
      })),
    })
  }

  /**
   * Get all reviews for a staff member
   * GET /api/reviews/staff/:id
   */
  async byStaff({ params, response }: HttpContext) {
    const reviews = await Review.query()
      .where('staff_id', params.id)
      .preload('customer')
      .orderBy('created_at', 'desc')

    const totalReviews = reviews.length
    const averageRating = totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.staffRating, 0) / totalReviews
      : 0

    return response.ok({
      average_rating: averageRating.toFixed(1),
      total_reviews: totalReviews,
      reviews: reviews.map((r) => ({
        id: r.id,
        customer_name: r.customer.fullName,
        staff_rating: r.staffRating,
        comment: r.comment,
        helpful_count: r.helpfulCount,
        created_at: r.createdAt,
      })),
    })
  }

  /**
   * Owner responds to a review
   * POST /api/reviews/:id/respond
   */
  async respond({ params, request, response }: HttpContext) {
    const review = await Review.findOrFail(params.id)
    const data = await request.validateUsing(respondValidator)

    review.response = data.response
    await review.save()

    return response.ok({
      message: 'Response added successfully',
      review: {
        id: review.id,
        response: review.response,
      },
    })
  }

  /**
   * Owner flags a review
   * PUT /api/reviews/:id/flag
   */
  async flag({ params, response }: HttpContext) {
    const review = await Review.findOrFail(params.id)

    review.isFlagged = !review.isFlagged
    await review.save()

    return response.ok({
      message: review.isFlagged ? 'Review flagged' : 'Review unflagged',
      is_flagged: review.isFlagged,
    })
  }

  /**
   * Increment helpful counter
   * PUT /api/reviews/:id/helpful
   */
  async helpful({ params, response }: HttpContext) {
    const review = await Review.findOrFail(params.id)

    review.helpfulCount = (review.helpfulCount || 0) + 1
    await review.save()

    return response.ok({
      message: 'Marked as helpful',
      helpful_count: review.helpfulCount,
    })
  }
}