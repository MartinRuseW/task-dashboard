<template>
    <section v-if="task">
        <button class="mb-4 text-sm text-blue-600 hover:underline" @click="goBack">
            ← Back to Dashboard
        </button>

        <div class="bg-white shadow rounded-lg p-6 space-y-4">
            <div class="flex items-center justify-between gap-4">
                <h2 class="text-2xl font-semibold">
                    {{ task.title }}
                </h2>

                <button class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                    @click="showEditModal = true">
                    Edit Task
                </button>
            </div>

            <p class="text-gray-700">
                {{ task.description || 'No description' }}
            </p>

            <div class="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                    <span class="font-semibold">Status: </span>
                    <span>{{ task.status }}</span>
                </div>
                <div>
                    <span class="font-semibold">Due Date: </span>
                    <span>{{ task.dueDate }}</span>
                </div>
            </div>
        </div>
    </section>

    <section v-else>
        <p class="text-gray-500">The task is not found.</p>
        <button class="mt-4 text-sm text-blue-600 hover:underline" @click="goBack">
            ← Back to Dashboard
        </button>
    </section>
    <TaskModal
  :show="showEditModal"
  mode="edit"
  :task="task"
  @close="showEditModal = false"
/>

</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import TaskModal from '../components/TaskModal.vue'
import { ref } from 'vue'


const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()
const showEditModal = ref(false)

const task = computed(() =>
    taskStore.tasks.find(t => t.id === route.params.id)
)

const goBack = () => {
    router.push({ name: 'dashboard' })
}

// TODO: тук ще отваряме модала за редакция
const onEditClick = () => {
    console.log('Edit Task modal – coming soon ✏️')
}
</script>