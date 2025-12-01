<script setup>
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 flex flex-col" style="min-width: 100vw;">
    <header class="bg-white shadow mb-6">
      <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl font-bold">
          Task Management Dashboard
        </h1>
        <nav class="flex gap-4 text-sm">
          <RouterLink
            to="/"
            class="hover:text-blue-600"
          >
            Dashboard
          </RouterLink>
        </nav>
      </div>
    </header>
    <main class="max-w-5xl mx-auto px-4 pb-10">
      <RouterView />
    </main>
  </div>
</template>
