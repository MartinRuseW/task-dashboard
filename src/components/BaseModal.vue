<script setup>
const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])

const onBackgroundClick = (e) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    @click="onBackgroundClick"
  >
    <div class="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
      <slot />
    </div>
  </div>
</template>
