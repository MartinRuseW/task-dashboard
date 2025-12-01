import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([
    {
      id: "1",
      title: "Create Dashboard",
      description:
        "Show dashboard with tasks and their statuses. lorem ipsum dolor sit amet",
      status: "To Do",
      dueDate: "01-12-2025",
    },
    {
      id: "2",
      title: "Learn something new",
      description: "Create a Vue 3 project to practice composition API",
      status: "In Progress",
      dueDate: "02-12-2025",
    },
    {
      id: "3",
      title: "Add some styles",
      description: "Don't forget to make it look good.",
      status: "Done",
      dueDate: "03-12-2025",
    },
  ]);

  const addTask = (task) => {
    tasks.value.push({
      ...task,
      id: Date.now().toString(),
    });
  };

  const updateTask = (id, updatedTask) => {
    const index = tasks.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updatedTask };
    }
  };

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  };

  const getTaskById = (id) =>
    computed(() => tasks.value.find((t) => t.id === id));

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
  };
});
