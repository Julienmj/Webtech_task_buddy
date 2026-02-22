<script setup>
import { ref, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTasksStore } from '../stores/tasks'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const tasksStore = useTasksStore()
const authStore = useAuthStore()
const statusMessage = ref('')

// Sidebar navigation state
const activeNav = ref('dashboard')

// Create task form state
const showCreateTaskForm = ref(false)
const newTask = ref({
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: ''
})

// Task statistics
const todayTasks = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return tasksStore.tasks.filter(task => task.dueDate === today && !task.completed).length
})

const upcomingTasks = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return tasksStore.tasks.filter(task => task.dueDate > today && !task.completed).length
})

const overdueTasks = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return tasksStore.tasks.filter(task => task.dueDate && task.dueDate < today && !task.completed).length
})

const completionRate = computed(() => {
  if (tasksStore.tasks.length === 0) return 0
  const completed = tasksStore.tasks.filter(task => task.completed).length
  return Math.round((completed / tasksStore.tasks.length) * 100)
})

// Filter tasks based on sidebar selection
const filteredTasks = computed(() => {
  switch (activeNav.value) {
    case 'todo':
      return tasksStore.tasks.filter(task => !task.completed && task.status === 'To Do')
    case 'inprogress':
      return tasksStore.tasks.filter(task => !task.completed && task.status === 'In Progress')
    case 'completed':
      return tasksStore.tasks.filter(task => task.completed)
    default:
      return tasksStore.tasks
  }
})

function announceToScreenReader(message) {
  statusMessage.value = ''
  nextTick(() => {
    statusMessage.value = message
  })
  setTimeout(() => {
    statusMessage.value = ''
  }, 1000)
}

function handleAddTask(payload) {
  tasksStore.addTask(payload.title, {
    category: payload.category,
    priority: payload.priority,
    dueDate: payload.dueDate,
  })
  announceToScreenReader(`Task added: ${payload.title}. List has ${tasksStore.tasks.length} task${tasksStore.tasks.length === 1 ? '' : 's'}.`)
}

function handleComplete(id) {
  const task = tasksStore.getTaskById(id)
  tasksStore.toggleComplete(id)
  const newState = task?.completed ? 'incomplete' : 'completed'
  announceToScreenReader(`Task marked as ${newState}.`)
}

function handleDelete(id) {
  const task = tasksStore.getTaskById(id)
  const title = task?.title ?? 'Task'
  tasksStore.removeTask(id)
  announceToScreenReader(`${title} deleted. ${tasksStore.tasks.length} task${tasksStore.tasks.length === 1 ? '' : 's'} remaining.`)
}

function handleCreateTask() {
  if (newTask.value.title.trim()) {
    const taskTitle = newTask.value.title
    tasksStore.addTask(newTask.value.title, {
      description: newTask.value.description,
      priority: newTask.value.priority,
      dueDate: newTask.value.dueDate,
      status: 'To Do'
    })
    
    // Reset form
    newTask.value = {
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: ''
    }
    showCreateTaskForm.value = false
    
    announceToScreenReader(`Task "${taskTitle}" added successfully.`)
  }
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}

function updateTaskStatus(id, status) {
  tasksStore.updateTask(id, { status })
}

function navigateTo(section) {
  activeNav.value = section
}

// Add sample tasks with status if they don't exist
if (tasksStore.tasks.length === 0) {
  tasksStore.addTask('Grocery Shopping', {
    category: 'Personal',
    priority: 'Medium',
    dueDate: '2024-11-20',
    status: 'In Progress'
  })
  tasksStore.addTask('Complete Math Assignment', {
    category: 'Work',
    priority: 'High',
    dueDate: '2024-12-01',
    status: 'To Do'
  })
}
</script>

<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <span class="logo-text">Task-Buddy</span>
      </div>
      
      <nav class="sidebar-nav">
        <a 
          href="#" 
          class="nav-item" 
          :class="{ active: activeNav === 'dashboard' }"
          @click.prevent="navigateTo('dashboard')"
        >
          Dashboard
        </a>
        <a 
          href="#" 
          class="nav-item" 
          :class="{ active: activeNav === 'todo' }"
          @click.prevent="navigateTo('todo')"
        >
          To Do
        </a>
        <a 
          href="#" 
          class="nav-item" 
          :class="{ active: activeNav === 'inprogress' }"
          @click.prevent="navigateTo('inprogress')"
        >
          In Progress
        </a>
        <a 
          href="#" 
          class="nav-item" 
          :class="{ active: activeNav === 'completed' }"
          @click.prevent="navigateTo('completed')"
        >
          Completed
        </a>
      </nav>
      
      <div class="account-section">
        <div class="user-info">
          <div class="user-avatar">{{ authStore.userEmail?.[0]?.toUpperCase() || 'S' }}</div>
          <span class="user-name">{{ authStore.userEmail?.split('@')[0] || 'student' }}</span>
        </div>
        <button @click="handleLogout" class="logout-link">Log out</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Live region: screen readers announce when this text changes -->
      <div
        class="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {{ statusMessage }}
      </div>

      <!-- Task Summary Cards -->
      <section class="summary-cards">
        <div class="summary-card">
          <h3 class="card-title">TODAY'S TASKS</h3>
          <div class="card-value">{{ todayTasks }}</div>
          <div class="card-subtitle">Due Today</div>
        </div>
        
        <div class="summary-card">
          <h3 class="card-title">UPCOMING</h3>
          <div class="card-value">{{ upcomingTasks }}</div>
          <div class="card-subtitle">Scheduled</div>
        </div>
        
        <div class="summary-card overdue">
          <h3 class="card-title">OVERDUE</h3>
          <div class="card-value overdue-value">{{ overdueTasks }}</div>
          <div class="card-subtitle overdue-subtitle">Needs Attention</div>
        </div>
        
        <div class="summary-card">
          <h3 class="card-title">COMPLETION</h3>
          <div class="card-value">{{ completionRate }}%</div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: completionRate + '%' }"></div>
          </div>
        </div>
      </section>

      <!-- Dashboard Header -->
      <header class="dashboard-header">
        <div>
          <h1 class="dashboard-title">Dashboard</h1>
          <p class="dashboard-subtitle">Here's a list of your tasks for this week.</p>
        </div>
        <button @click="showCreateTaskForm = !showCreateTaskForm" class="create-task-btn">
          <span class="plus-icon">+</span>
          Create Task
        </button>
      </header>

      <!-- Create Task Form (Hidden by default) -->
      <section v-if="showCreateTaskForm" class="create-task-section">
        <div class="create-task-card">
          <h3>Create New Task</h3>
          <form @submit.prevent="handleCreateTask" class="task-form">
            <div class="form-group">
              <label>Task Title</label>
              <input 
                v-model="newTask.title" 
                type="text" 
                placeholder="Enter task title"
                required
              />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea 
                v-model="newTask.description" 
                placeholder="Enter task description"
              ></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Priority</label>
                <select v-model="newTask.priority">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div class="form-group">
                <label>Due Date</label>
                <input 
                  v-model="newTask.dueDate" 
                  type="date"
                />
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Add Task</button>
              <button type="button" @click="showCreateTaskForm = false" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </section>

      <!-- Task Cards -->
      <section class="task-cards">
        <div 
          v-for="task in filteredTasks" 
          :key="task.id"
          class="task-card"
        >
          <!-- Priority Tag -->
          <div class="priority-tag" :class="task.priority?.toLowerCase()">
            {{ task.priority?.toUpperCase() }}
          </div>
          
          <!-- Task Content -->
          <div class="task-content">
            <h3 class="task-title">{{ task.title }}</h3>
            <p class="task-description">{{ task.description || 'No description provided' }}</p>
            
            <!-- Due Date -->
            <div v-if="task.dueDate" class="task-due-date">
              <span class="due-label">Due:</span>
              <span class="due-date">{{ task.dueDate }}</span>
            </div>
          </div>
          
          <!-- Status Dropdown -->
          <div class="task-status">
            <select 
              :value="task.status || 'To Do'" 
              @change="updateTaskStatus(task.id, $event.target.value)"
              class="status-dropdown"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button 
              @click="handleDelete(task.id)" 
              class="delete-btn"
              title="Delete task"
            >
              ×
            </button>
          </div>
        </div>
      </section>

      <!-- Hint Text -->
      <div class="hint-text">
        Double-click a card to share.
      </div>
    </main>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.dashboard-container {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.logo {
  margin-bottom: 2rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  padding: 0.75rem 1rem;
  color: #64748b;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.nav-item:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.nav-item.active {
  background: #3b82f6;
  color: white;
}

.account-section {
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
  margin-top: auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
}

.user-name {
  font-weight: 500;
  color: #374151;
}

.logout-link {
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}

.logout-link:hover {
  color: #ef4444;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* Summary Cards */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.summary-card.overdue {
  border-color: #fecaca;
}

.card-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
}

.card-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem;
}

.card-value.overdue-value {
  color: #dc2626;
}

.card-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.card-subtitle.overdue-subtitle {
  color: #dc2626;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: #3b82f6;
  transition: width 0.3s ease;
}

/* Dashboard Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem;
}

.dashboard-subtitle {
  color: #64748b;
  margin: 0;
  font-size: 1rem;
}

.create-task-btn {
  background: #1e293b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;
}

.create-task-btn:hover {
  background: #374151;
}

.plus-icon {
  font-size: 1.25rem;
  font-weight: 700;
}

/* Task Cards */
.task-cards {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.task-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  transition: all 0.2s ease;
  cursor: pointer;
}

.task-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.priority-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  white-space: nowrap;
}

.priority-tag.high {
  background: #fecaca;
  color: #dc2626;
}

.priority-tag.medium {
  background: #fed7aa;
  color: #ea580c;
}

.priority-tag.low {
  background: #dcfce7;
  color: #16a34a;
}

.task-content {
  flex: 1;
}

.task-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem;
}

.task-description {
  color: #64748b;
  margin: 0 0 1rem;
  line-height: 1.5;
}

.task-due-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.due-label {
  color: #64748b;
}

.due-date {
  color: #dc2626;
  font-weight: 500;
}

.task-status {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.status-dropdown {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
}

.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.delete-btn:hover {
  background: #dc2626;
}

.hint-text {
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
  font-style: italic;
}

/* Create Task Form Styles */
.create-task-section {
  margin-bottom: 2rem;
}

.create-task-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.create-task-card h3 {
  margin: 0 0 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    padding: 1rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .summary-cards {
    grid-template-columns: 1fr;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .create-task-btn {
    justify-content: center;
  }
  
  .task-card {
    flex-direction: column;
    gap: 1rem;
  }
  
  .task-status {
    margin-left: 0;
    align-self: flex-start;
  }
}
</style>
