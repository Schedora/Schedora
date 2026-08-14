<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <OnboardingSidebar :current-step="5" @finish-later="handleFinishLater" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navigation -->
      <header
        class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between"
      >
        <h2 class="text-lg font-semibold text-gray-800">Schedora Business</h2>
        <div class="flex items-center gap-4">
          <button class="text-gray-400 hover:text-gray-600">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button class="text-gray-400 hover:text-gray-600">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <div
            class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-xs font-semibold">O</span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Visual Identity</h1>
        <!-- Subtitle recommends 5 photos but does not block progress -->
        <p class="text-gray-500 mb-8">
          Add high-quality photos of your business to showcase your space and
          attract more clients. We recommend at least 5 photos.
        </p>

        <!-- Upload Area -->
        <div
          class="border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition mb-8"
          :class="
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white hover:border-blue-400'
          "
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
          @click="triggerFileInput"
        >
          <!-- Upload icon -->
          <div
            class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              class="w-7 h-7 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <p class="text-base font-semibold text-gray-700 mb-1">
            Drag and drop your photos
          </p>
          <p class="text-sm text-gray-400 mb-4">
            PNG, JPG or WEBP (Max. 10MB per file)
          </p>
          <button
            type="button"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
            @click.stop="triggerFileInput"
          >
            Browse Files
          </button>

          <!-- Hidden file input -->
          <input
            ref="fileInput"
            type="file"
            accept=".png,.jpg,.jpeg,.webp"
            multiple
            class="hidden"
            @change="handleFileSelect"
          />
        </div>

        <!-- Upload errors -->
        <div v-if="uploadErrors.length > 0" class="mb-6 space-y-2">
          <div
            v-for="(error, i) in uploadErrors"
            :key="i"
            class="bg-red-50 border border-red-200 rounded-lg px-4 py-2 flex items-center justify-between"
          >
            <p class="text-sm text-red-600">{{ error }}</p>
            <button
              @click="uploadErrors.splice(i, 1)"
              class="text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </div>
        </div>

        <!-- Gallery Previews -->
        <div v-if="images.length > 0" class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <!-- Count updates with each upload or deletion -->
            <h3 class="text-base font-semibold text-gray-800">
              Gallery Previews ({{ images.length }})
            </h3>
            <span
              class="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full cursor-pointer"
            >
              MAIN BANNER SELECTION
            </span>
          </div>

          <div class="grid grid-cols-4 gap-4">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="relative group rounded-xl overflow-hidden border-2 transition"
              :class="image.isCover ? 'border-blue-500' : 'border-transparent'"
            >
              <!-- Image -->
              <img
                :src="image.preview"
                :alt="image.name"
                class="w-full h-36 object-cover"
              />

              <!-- Cover badge -->
              <div
                v-if="image.isCover"
                class="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                Cover
              </div>

              <!-- Banner badge -->
              <div
                v-if="image.isBanner"
                class="absolute top-2 right-8 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full"
              >
                Banner
              </div>

              <!-- Hover overlay with actions -->
              <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2"
              >
                <!-- Set as cover -->
                <button
                  type="button"
                  @click="setCover(index)"
                  class="bg-white text-gray-800 text-xs px-3 py-1 rounded-full hover:bg-blue-50 transition"
                >
                  {{ image.isCover ? "✓ Cover" : "Set as Cover" }}
                </button>
                <!-- Set as banner -->
                <button
                  type="button"
                  @click="setBanner(index)"
                  class="bg-white text-gray-800 text-xs px-3 py-1 rounded-full hover:bg-green-50 transition"
                >
                  {{ image.isBanner ? "✓ Banner" : "Set as Banner" }}
                </button>
                <!-- Delete -->
                <button
                  type="button"
                  @click="removeImage(index)"
                  class="bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No images uploaded yet -->
        <div v-else class="text-center py-4">
          <p class="text-sm text-gray-400">
            No images uploaded yet. Upload at least one to continue.
          </p>
        </div>

        <!-- Finish error -->
        <p v-if="finishError" class="text-red-500 text-sm mb-4">
          {{ finishError }}
        </p>

        <!-- Action Buttons -->
        <div class="flex items-center justify-between mt-6">
          <button
            type="button"
            @click="navigateTo('/onboarding/staff')"
            class="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Staff
          </button>

          <!-- Finish Setup button — disabled if no images -->
          <button
            type="button"
            @click="handleFinishSetup"
            class="px-8 py-3 rounded-xl text-sm font-semibold transition"
            :class="
              images.length > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            "
          >
            Finish Setup
          </button>
        </div>
      </main>

      <!-- Footer -->
      <footer
        class="border-t border-gray-200 px-8 py-4 flex justify-between items-center"
      >
        <p class="text-xs text-gray-400">
          © Schedora. Professional Booking Solutions.
        </p>
        <div class="flex gap-4">
          <a href="#" class="text-xs text-gray-400 hover:text-gray-600"
            >Privacy Policy</a
          >
          <a href="#" class="text-xs text-gray-400 hover:text-gray-600"
            >Terms of Service</a
          >
          <a href="#" class="text-xs text-gray-400 hover:text-gray-600"
            >Onboarding Guide</a
          >
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

// Drag state
const isDragging = ref(false);

// File input ref
const fileInput = ref<HTMLInputElement | null>(null);

// Upload errors
const uploadErrors = ref<string[]>([]);

// Finish error
const finishError = ref("");

// Images list
const images = ref<
  {
    name: string;
    preview: string;
    isCover: boolean;
    isBanner: boolean;
  }[]
>([]);

// Trigger file input
function triggerFileInput() {
  fileInput.value?.click();
}

// Validate and process files
function processFiles(files: FileList | null) {
  if (!files) return;

  uploadErrors.value = [];

  Array.from(files).forEach((file) => {
    // Check file format
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      uploadErrors.value.push(
        `"${file.name}" is not supported. Please upload PNG, JPG or WebP only.`,
      );
      return;
    }

    // Check file size — max 10MB
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      uploadErrors.value.push(
        `"${file.name}" exceeds 10MB. Please upload a smaller file.`,
      );
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      images.value.push({
        name: file.name,
        preview: e.target?.result as string,
        isCover: images.value.length === 0, // First image auto-set as cover
        isBanner: false,
      });
      // Save to localStorage
      saveImages();
    };
    reader.readAsDataURL(file);
  });
}

// Handle file input selection
function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  processFiles(input.files);
  // Reset input so same file can be selected again
  input.value = "";
}

// Handle drag and drop
function handleDrop(event: DragEvent) {
  isDragging.value = false;
  processFiles(event.dataTransfer?.files || null);
}

// Set cover photo — only one at a time
function setCover(index: number) {
  images.value.forEach((img, i) => {
    img.isCover = i === index;
  });
  saveImages();
}

// Set banner — only one at a time
function setBanner(index: number) {
  images.value.forEach((img, i) => {
    img.isBanner = i === index;
  });
  saveImages();
}

// Remove an image
function removeImage(index: number) {
  const wasCover = images.value[index].isCover;
  images.value.splice(index, 1);

  // If we removed the cover, assign cover to first remaining image
  if (wasCover && images.value.length > 0) {
    images.value[0].isCover = true;
  }

  saveImages();
}

// Save images to localStorage
function saveImages() {
  localStorage.setItem(
    "onboarding_images",
    JSON.stringify(
      images.value.map((img) => ({
        name: img.name,
        isCover: img.isCover,
        isBanner: img.isBanner,
        // We don't save the full base64 preview to avoid localStorage limits
      })),
    ),
  );
}

// Finish Setup
function handleFinishSetup() {
  if (images.value.length === 0) {
    finishError.value =
      "Please upload at least one image before finishing setup.";
    return;
  }

  finishError.value = "";

  // Clear all onboarding data from localStorage
  localStorage.removeItem("onboarding_business");
  localStorage.removeItem("onboarding_branches");
  localStorage.removeItem("onboarding_services");
  localStorage.removeItem("onboarding_staff");
  localStorage.removeItem("onboarding_images");

  // Navigate to dashboard
  navigateTo("/dashboard");
}

// Finish Later
function handleFinishLater() {
  saveImages();
  navigateTo("/");
}

// Restore on mount
onMounted(() => {
  // Images with base64 previews cannot be restored from localStorage
  // but we keep other onboarding data intact
});
</script>
