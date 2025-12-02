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

// For API method

// import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'

// const API_URL = 'https://692f3abd91e00bafccd6fe60.mockapi.io/tasks/tasks'

// export const useTaskStore = defineStore('taskStore', () => {
//   const tasks = ref([])
//   const loading = ref(false)
//   const error = ref('')

//   const fetchTasks = async () => {
//     loading.value = true
//     error.value = ''

//     try {
//       const res = await fetch(API_URL)
//       if (!res.ok) throw new Error('Failed to fetch tasks')
//       const data = await res.json()
//       tasks.value = data
//     } catch (err) {
//       console.error(err)
//       error.value = 'No successfully fetched tasks.'
//     } finally {
//       loading.value = false
//     }
//   }

//   const addTask = async (task) => {
//     try {
//       const res = await fetch(API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(task),
//       })
//       if (!res.ok) throw new Error('Failed to create task')

//       const created = await res.json()
//       tasks.value.push(created)
//     } catch (err) {
//       console.error(err)
//       error.value = 'Not successfully created task.'
//     }
//   }

//   const updateTask = async (id, updatedTask) => {
//     try {
//       const res = await fetch(`${API_URL}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedTask),
//       })
//       if (!res.ok) throw new Error('Failed to update task')

//       const updated = await res.json()
//       const index = tasks.value.findIndex(t => t.id === id)
//       if (index !== -1) {
//         tasks.value[index] = updated
//       }
//     } catch (err) {
//       console.error(err)
//       error.value = 'Not successfully updated task.'
//     }
//   }

//   const deleteTask = async (id) => {
//     try {
//       const res = await fetch(`${API_URL}/${id}`, {
//         method: 'DELETE',
//       })
//       if (!res.ok) throw new Error('Failed to delete task')

//       tasks.value = tasks.value.filter(t => t.id !== id)
//     } catch (err) {
//       console.error(err)
//       error.value = 'Not successfully deleted task.'
//     }
//   }

//   const getTaskById = (id) =>
//     computed(() => tasks.value.find(t => t.id === id))

//   return {
//     tasks,
//     loading,
//     error,
//     fetchTasks,
//     addTask,
//     updateTask,
//     deleteTask,
//     getTaskById,
//   }
// })
