<template>
  <BaseModal :show="show" @close="$emit('close')">
    <h2 class="text-xl font-bold mb-4">
      {{ mode === 'add' ? 'Add Task' : 'Edit Task'}}
    </h2>

    <div class="flex flex-col gap-4">
      <div>
        <label class="text-sm font-medium">Title *</label>
        <input
          v-model="title"
          type="text"
          class="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label class="text-sm font-medium">Description</label>
        <textarea
          v-model="description"
          rows="3"
          class="w-full px-3 py-2 border rounded-lg"
        ></textarea>
      </div>

      <div>
        <label class="text-sm font-medium">Status</label>
        <select
          v-model="status"
          class="w-full px-3 py-2 border rounded-lg"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      <div>
        <label class="text-sm font-medium">Due Date</label>
        <input
          v-model="dueDate"
          type="date"
          class="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

      <div class="flex justify-end gap-2">
        <button
          class="px-4 py-2 bg-gray-300 rounded-lg"
          @click="$emit('close')"
        >
          Cancel
        </button>

        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          @click="saveTask"
        >
          Save
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  show: Boolean,
  mode: { type: String, default: 'add' },
  task: { type: Object, default: null }
})

const emit = defineEmits(['close'])

const taskStore = useTaskStore()

const title = ref('')
const description = ref('')
const status = ref('To Do')
const dueDate = ref('')

const error = ref('')

watch(
  () => props.show,
  (value) => {
    if (value && props.mode === 'edit' && props.task) {
      title.value = props.task.title
      description.value = props.task.description
      status.value = props.task.status
      dueDate.value = props.task.dueDate
    }

    if (value && props.mode === 'add') {
      title.value = ''
      description.value = ''
      status.value = 'To Do'
      dueDate.value = ''
    }

    error.value = ''
  }
)

const saveTask = () => {
  if (!title.value.trim()) {
    error.value = 'Title is required.'
    return
  }

  if (props.mode === 'add') {
    taskStore.addTask({
      title: title.value,
      description: description.value,
      status: status.value,
      dueDate: dueDate.value
    })
  }

  if (props.mode === 'edit') {
    taskStore.updateTask(props.task.id, {
      title: title.value,
      description: description.value,
      status: status.value,
      dueDate: dueDate.value
    })
  }

  emit('close')
}
</script>