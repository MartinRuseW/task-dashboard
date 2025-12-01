<template>
  <section>
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
    >
      <h2 class="text-2xl font-semibold">Tasks</h2>

      <button
        class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        @click="showModal = true"
      >
        + Add Task
      </button>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by title and description..."
        class="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        v-model="statusFilter"
        class="px-3 py-2 border rounded-lg text-sm w-full sm:w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full text-sm">
        <thead
          class="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500"
        >
          <tr>
            <th class="px-4 py-3">Title</th>
            <th class="px-4 py-3">Description</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Due Date</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="task in filteredTasks"
            :key="task.id"
            class="border-t hover:bg-gray-50 cursor-pointer"
            @click="openTaskDetails(task.id)"
          >
            <td class="px-4 py-2 font-medium">
              {{ task.title }}
            </td>

            <td class="px-4 py-2">
              <div class="flex flex-col gap-1">
                <span v-if="isExpanded(task.id)">
                  {{ task.description }}
                </span>
                <span v-else>
                  {{ (task.description || "").slice(0, 50) }}
                  <span v-if="(task.description || '').length > 50">...</span>
                </span>

                <button
                  v-if="(task.description || '').length > 50"
                  class="self-start text-xs text-blue-600 hover:underline"
                  @click.stop="toggleDescription(task.id)"
                >
                  {{ isExpanded(task.id) ? "Show less" : "Read more" }}
                </button>
              </div>
            </td>

            <td class="px-4 py-2">
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                :class="{
                  'bg-gray-100 text-gray-700': task.status === 'To Do',
                  'bg-yellow-100 text-yellow-700':
                    task.status === 'In Progress',
                  'bg-green-100 text-green-700': task.status === 'Done',
                }"
              >
                {{ task.status }}
              </span>
            </td>

            <td class="px-4 py-2">
              {{ task.dueDate }}
            </td>
          </tr>

          <tr v-if="filteredTasks.length === 0">
            <td class="px-4 py-6 text-center text-gray-500" colspan="4">
                No tasks found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <TaskModal :show="showModal" mode="add" @close="showModal = false" />
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "../stores/taskStore";
import TaskModal from "../components/TaskModal.vue";

const taskStore = useTaskStore();
const router = useRouter();

const searchQuery = ref("");
const statusFilter = ref("All");
const showModal = ref(false);

const expandedDescriptions = ref(new Set());

const toggleDescription = (id) => {
  const set = new Set(expandedDescriptions.value);
  if (set.has(id)) {
    set.delete(id);
  } else {
    set.add(id);
  }
  expandedDescriptions.value = set;
};

const isExpanded = (id) => {
  return expandedDescriptions.value.has(id);
};

const filteredTasks = computed(() => {
  const query = searchQuery.value.toLowerCase();
  
  return taskStore.tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(query) ||
      (task.description || "").toLowerCase().includes(query);

    const matchesStatus =
      statusFilter.value === "All" || task.status === statusFilter.value;
      
    return matchesSearch && matchesStatus;
  });
});

const openTaskDetails = (id) => {
  router.push({ name: "task-details", params: { id } });
};
</script>
