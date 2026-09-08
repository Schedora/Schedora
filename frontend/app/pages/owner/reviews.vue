<template>
  <div class="p-6 max-w-7xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Reviews</h1>
        <p class="text-gray-600 mt-1">Monitor and respond to customer feedback</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="exportCSV"
          class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          📥 Export CSV
        </button>
        <button
          @click="generateReport"
          class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          📊 Generate Report
        </button>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-6">

      <!-- Left — Reviews -->
      <div class="flex-1">

        <!-- Tabs -->
        <div class="flex border-b border-gray-200 mb-6">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
            class="px-6 py-3 text-sm font-medium transition-colors border-b-2"
            :class="activeTab === tab.value
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'"
          >
            {{ tab.label }}
            <span
              class="ml-2 px-2 py-0.5 rounded-full text-xs"
              :class="activeTab === tab.value
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-500'"
            >
              {{ tab.value === 'all' ? reviews.length : flaggedReviews.length }}
            </span>
          </button>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-3 mb-6">
          <!-- Rating Filter -->
          <select
            v-model="filters.rating"
            class="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Ratings</option>
            <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
            <option value="4">⭐⭐⭐⭐ 4 Stars</option>
            <option value="3">⭐⭐⭐ 3 Stars</option>
            <option value="2">⭐⭐ 2 Stars</option>
            <option value="1">⭐ 1 Star</option>
          </select>

          <!-- Date Filter -->
          <select
            v-model="filters.date"
            class="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <!-- Clear Filters -->
          <button
            v-if="filters.rating || filters.date"
            @click="clearFilters"
            class="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-200"
          >
            ✕ Clear Filters
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-16">
          <div class="text-4xl mb-4">⏳</div>
          <p class="text-gray-500">Loading reviews...</p>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="filteredReviews.length === 0"
          class="bg-white rounded-2xl border border-gray-100 p-16 text-center"
        >
          <div class="text-5xl mb-4">⭐</div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
          <p class="text-gray-500">Customer reviews will appear here after completed bookings</p>
        </div>

        <!-- Reviews List -->
        <div v-else class="space-y-4">

          <!-- Featured Review (first one) -->
          <div
            v-if="filteredReviews.length > 0"
            class="bg-white rounded-2xl border border-gray-100 p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {{ getInitials(filteredReviews[0].customer_name) }}
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ filteredReviews[0].customer_name }}</p>
                  <p class="text-sm text-gray-500">{{ formatDate(filteredReviews[0].created_at) }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                  Featured
                </span>
              </div>
            </div>

            <!-- Stars -->
            <div class="flex text-yellow-400 text-lg mb-3">
              <span v-for="i in 5" :key="i">
                {{ i <= filteredReviews[0].staff_rating ? '★' : '☆' }}
              </span>
            </div>

            <!-- Comment -->
            <p class="text-gray-700 mb-4">{{ filteredReviews[0].comment || 'No comment provided.' }}</p>

            <!-- Owner Response -->
            <div
              v-if="filteredReviews[0].response"
              class="bg-blue-50 rounded-xl p-4 mb-4"
            >
              <p class="text-sm font-medium text-blue-700 mb-1">Your Response:</p>
              <p class="text-sm text-blue-600">{{ filteredReviews[0].response }}</p>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
              <button
                @click="openReplyModal(filteredReviews[0])"
                class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                💬 Respond
              </button>
              <button
                @click="incrementHelpful(filteredReviews[0])"
                class="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
              >
                👍 Helpful ({{ filteredReviews[0].helpful_count || 0 }})
              </button>
              <button
                @click="toggleFlag(filteredReviews[0])"
                class="flex items-center gap-2 text-sm ml-auto"
                :class="filteredReviews[0].is_flagged ? 'text-red-600' : 'text-gray-400 hover:text-red-500'"
              >
                🚩 {{ filteredReviews[0].is_flagged ? 'Flagged' : 'Flag' }}
              </button>
            </div>
          </div>

          <!-- Smaller Review Cards -->
          <div
            v-for="review in filteredReviews.slice(1, visibleCount)"
            :key="review.id"
            class="bg-white rounded-2xl border border-gray-100 p-5"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                  {{ getInitials(review.customer_name) }}
                </div>
                <div>
                  <p class="font-medium text-gray-900 text-sm">{{ review.customer_name }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(review.created_at) }}</p>
                </div>
              </div>
              <div class="flex text-yellow-400 text-sm">
                <span v-for="i in 5" :key="i">
                  {{ i <= review.staff_rating ? '★' : '☆' }}
                </span>
              </div>
            </div>

            <!-- Truncated comment -->
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">
              {{ review.comment || 'No comment provided.' }}
            </p>

            <!-- Category tag -->
            <div class="flex items-center justify-between">
              <span class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                {{ review.service_name || 'Service' }}
              </span>
              <div class="flex items-center gap-3">
                <button
                  @click="openReplyModal(review)"
                  class="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  💬 Respond
                </button>
                <button
                  @click="incrementHelpful(review)"
                  class="text-xs text-gray-500 hover:text-gray-700"
                >
                  👍 {{ review.helpful_count || 0 }}
                </button>
                <button
                  @click="toggleFlag(review)"
                  class="text-xs"
                  :class="review.is_flagged ? 'text-red-600' : 'text-gray-400 hover:text-red-500'"
                >
                  🚩
                </button>
              </div>
            </div>
          </div>

          <!-- Load More -->
          <div
            v-if="visibleCount < filteredReviews.length"
            class="text-center py-6"
          >
            <p class="text-gray-500 text-sm mb-3">
              Showing {{ Math.min(visibleCount, filteredReviews.length) }} of {{ filteredReviews.length }} reviews
            </p>
            <button
              @click="visibleCount += 5"
              class="px-6 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Load More Reviews
            </button>
          </div>

          <!-- End of feed -->
          <div
            v-else-if="filteredReviews.length > 0"
            class="text-center py-6"
          >
            <p class="text-gray-400 text-sm">You've reached the end of all reviews 🎉</p>
          </div>

        </div>
      </div>

      <!-- Right — Performance Pulse Panel -->
      <div class="lg:w-72">
        <div class="bg-white rounded-2xl border border-gray-100 p-6 sticky top-6">
          <h3 class="font-semibold text-gray-900 mb-1">Performance Pulse</h3>
          <p class="text-xs text-gray-500 mb-6">Overall customer satisfaction score</p>

          <!-- Overall Rating -->
          <div class="text-center mb-6">
            <div class="text-5xl font-bold text-gray-900 mb-1">
              {{ performancePulse }}
            </div>
            <div class="flex justify-center text-yellow-400 text-xl mb-1">
              {{ starDisplay }}
            </div>
            <p class="text-sm text-gray-500">{{ reviews.length }} total reviews</p>
          </div>

          <!-- Star Breakdown -->
          <div class="space-y-2">
            <div
              v-for="star in [5, 4, 3, 2, 1]"
              :key="star"
              class="flex items-center gap-2"
            >
              <span class="text-xs text-gray-500 w-4">{{ star }}</span>
              <span class="text-yellow-400 text-xs">★</span>
              <div class="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  class="bg-yellow-400 h-2 rounded-full transition-all"
                  :style="{ width: `${getStarPercentage(star)}%` }"
                />
              </div>
              <span class="text-xs text-gray-500 w-6">{{ getStarCount(star) }}</span>
            </div>
          </div>

        </div>
      </div>

    </div>

    <!-- Reply Modal -->
    <div
      v-if="showReplyModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-gray-900 mb-2">Respond to Review</h3>
        <p class="text-gray-500 text-sm mb-6">
          Your response will be visible to all customers
        </p>
        <textarea
          v-model="replyText"
          rows="4"
          placeholder="Write your response..."
          class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
        />
        <div class="flex gap-4">
          <button
            @click="showReplyModal = false"
            class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="submitReply"
            :disabled="!replyText.trim()"
            class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            Submit Response
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const reviews = ref([])
const loading = ref(true)
const activeTab = ref('all')
const visibleCount = ref(6)
const showReplyModal = ref(false)
const replyText = ref('')
const selectedReview = ref(null)

const filters = reactive({
  rating: '',
  date: '',
})

const tabs = [
  { label: 'All Reviews', value: 'all' },
  { label: 'Flagged', value: 'flagged' },
]

// Fetch reviews
onMounted(async () => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!token || user.role !== 'owner') {
    navigateTo('/auth/login')
    return
  }

  try {
    const response = await fetch(
      'http://localhost:3333/api/reviews/business/1',
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const data = await response.json()
    reviews.value = data.reviews || []
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
  } finally {
    loading.value = false
  }
})

// Flagged reviews
const flaggedReviews = computed(() =>
  reviews.value.filter((r) => r.is_flagged)
)

// Filtered reviews
const filteredReviews = computed(() => {
  let list = activeTab.value === 'flagged'
    ? flaggedReviews.value
    : reviews.value

  if (filters.rating) {
    list = list.filter((r) => r.staff_rating === Number(filters.rating))
  }

  if (filters.date) {
    const now = new Date()
    list = list.filter((r) => {
      const reviewDate = new Date(r.created_at)
      if (filters.date === 'today') {
        return reviewDate.toDateString() === now.toDateString()
      } else if (filters.date === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return reviewDate >= weekAgo
      } else if (filters.date === 'month') {
        return reviewDate.getMonth() === now.getMonth() &&
          reviewDate.getFullYear() === now.getFullYear()
      }
      return true
    })
  }

  return list
})

// Clear filters
const clearFilters = () => {
  filters.rating = ''
  filters.date = ''
}

// Performance Pulse
const performancePulse = computed(() => {
  if (reviews.value.length === 0) return '—'
  const avg = reviews.value.reduce((sum, r) => sum + r.staff_rating, 0) / reviews.value.length
  return avg.toFixed(1)
})

const starDisplay = computed(() => {
  const rating = parseFloat(performancePulse.value)
  if (isNaN(rating)) return '☆☆☆☆☆'
  return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))
})

const getStarCount = (star) => {
  return reviews.value.filter((r) => r.staff_rating === star).length
}

const getStarPercentage = (star) => {
  if (reviews.value.length === 0) return 0
  return (getStarCount(star) / reviews.value.length) * 100
}

// Helpers
const getInitials = (name) => {
  if (!name) return '?'
  const parts = name.split(' ')
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  return name[0].toUpperCase()
}

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Reply
const openReplyModal = (review) => {
  selectedReview.value = review
  replyText.value = review.response || ''
  showReplyModal.value = true
}

const submitReply = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(
      `http://localhost:3333/api/reviews/${selectedReview.value.id}/respond`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: replyText.value }),
      }
    )

    if (response.ok) {
      const index = reviews.value.findIndex((r) => r.id === selectedReview.value.id)
      if (index !== -1) reviews.value[index].response = replyText.value
      showReplyModal.value = false
      replyText.value = ''
    }
  } catch (error) {
    console.error('Failed to submit reply:', error)
  }
}

// Helpful counter
const incrementHelpful = async (review) => {
  const token = localStorage.getItem('token')
  try {
    await fetch(
      `http://localhost:3333/api/reviews/${review.id}/helpful`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const index = reviews.value.findIndex((r) => r.id === review.id)
    if (index !== -1) reviews.value[index].helpful_count = (reviews.value[index].helpful_count || 0) + 1
  } catch (error) {
    console.error('Failed to increment helpful:', error)
  }
}

// Flag review
const toggleFlag = async (review) => {
  const token = localStorage.getItem('token')
  try {
    await fetch(
      `http://localhost:3333/api/reviews/${review.id}/flag`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const index = reviews.value.findIndex((r) => r.id === review.id)
    if (index !== -1) reviews.value[index].is_flagged = !reviews.value[index].is_flagged
  } catch (error) {
    console.error('Failed to flag review:', error)
  }
}

// Export CSV
const exportCSV = () => {
  const headers = ['Customer', 'Rating', 'Comment', 'Response', 'Date', 'Flagged']
  const rows = filteredReviews.value.map((r) => [
    r.customer_name,
    r.staff_rating,
    r.comment || '',
    r.response || '',
    formatDate(r.created_at),
    r.is_flagged ? 'Yes' : 'No',
  ])

  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'reviews.csv'
  a.click()
}

const generateReport = () => {
  alert('Report generation coming soon!')
}
</script>