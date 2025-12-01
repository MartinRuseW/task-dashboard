import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import TaskDetailsView from '../views/TaskDetailsView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/tasks/:id',
    name: 'task-details',
    component: TaskDetailsView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
