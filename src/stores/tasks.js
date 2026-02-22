import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const TASK_CATEGORIES = ['Work', 'Personal', 'Shopping', 'Other']
export const TASK_PRIORITIES = ['Low', 'Medium', 'High']

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([
    { 
      id: 1, 
      title: 'Grocery Shopping', 
      description: 'Buy milk, eggs, and bread',
      completed: false, 
      category: 'Personal', 
      dueDate: '2024-11-20', 
      priority: 'Medium',
      status: 'In Progress'
    },
    { 
      id: 2, 
      title: 'Complete Math Assignment', 
      description: 'Chapter 5 exercises 1-10',
      completed: false, 
      category: 'Work', 
      dueDate: '2024-12-01', 
      priority: 'High',
      status: 'To Do'
    },
  ])

  let nextId = 3

  const activeTasks = computed(() => tasks.value.filter((t) => !t.completed))
  const completedTasks = computed(() => tasks.value.filter((t) => t.completed))

  function addTask(title, options = {}) {
    if (!title?.trim()) return null
    const task = {
      id: nextId++,
      title: title.trim(),
      description: options.description || '',
      completed: false,
      category: options.category ?? 'Personal',
      dueDate: options.dueDate ?? null,
      priority: options.priority ?? 'Medium',
      status: options.status ?? 'To Do'
    }
    tasks.value.push(task)
    return task
  }

  function updateTask(id, updates) {
    const i = tasks.value.findIndex((t) => t.id === id)
    if (i === -1) return false
    tasks.value[i] = { ...tasks.value[i], ...updates }
    return true
  }

  function toggleComplete(id) {
    const task = tasks.value.find((t) => t.id === id)
    if (!task) return false
    task.completed = !task.completed
    if (task.completed) {
      task.status = 'Completed'
    }
    return true
  }

  function removeTask(id) {
    const i = tasks.value.findIndex((t) => t.id === id)
    if (i === -1) return false
    tasks.value.splice(i, 1)
    return true
  }

  function getTaskById(id) {
    return tasks.value.find((t) => t.id === id) ?? null
  }

  return {
    tasks,
    activeTasks,
    completedTasks,
    addTask,
    updateTask,
    toggleComplete,
    removeTask,
    getTaskById,
  }
})
