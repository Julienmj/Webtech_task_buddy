<script setup>
import { ref, computed } from 'vue'
import { TASK_CATEGORIES, TASK_PRIORITIES } from '../stores/tasks'

const title = ref('')
const category = ref('Personal')
const priority = ref('Medium')
const dueDate = ref('')

const showOptions = ref(false)

const canSubmit = computed(() => title.value.trim().length > 0)

const emit = defineEmits(['submit'])

function submit() {
  if (!canSubmit.value) return
  emit('submit', {
    title: title.value.trim(),
    category: category.value,
    priority: priority.value,
    dueDate: dueDate.value || null,
  })
  title.value = ''
  dueDate.value = ''
  category.value = 'Personal'
  priority.value = 'Medium'
  showOptions.value = false
}

function onKeydown(e) {
  if (e.key === 'Enter') submit()
}
</script>

<template>
  <section
    class="add-task"
    aria-labelledby="add-task-heading"
    aria-describedby="add-task-desc"
  >
    <h2 id="add-task-heading" class="visually-hidden">Add new task</h2>
    <p id="add-task-desc" class="visually-hidden">Enter a task title, then add optional category, priority, and due date.</p>
    <div class="add-task-row">
      <label for="new-task-input" class="visually-hidden">New task title (required)</label>
      <input
        id="new-task-input"
        v-model="title"
        type="text"
        placeholder="New Task"
        aria-label="New task title (required)"
        aria-required="true"
        class="task-input"
        autocomplete="off"
        @keydown="onKeydown"
      />
      <button
        type="button"
        class="btn btn-add"
        :disabled="!canSubmit"
        aria-label="Add task to list"
        @click="submit"
      >
        Add Task
      </button>
    </div>
    <button
      type="button"
      class="btn-options-toggle"
      :aria-expanded="showOptions"
      :aria-controls="showOptions ? 'add-task-options' : undefined"
      aria-label="Show or hide optional task fields: category, priority, and due date"
      @click="showOptions = !showOptions"
    >
      {{ showOptions ? 'Hide options' : 'Category, priority & due date' }}
    </button>
    <fieldset
      id="add-task-options"
      class="add-options"
      :hidden="!showOptions"
      aria-label="Optional task details"
    >
      <legend class="visually-hidden">Optional: category, priority, due date</legend>
      <label for="new-task-category">Category</label>
      <select
        id="new-task-category"
        v-model="category"
        aria-label="Task category"
        aria-describedby="category-desc"
      >
        <option v-for="cat in TASK_CATEGORIES" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
      <span id="category-desc" class="visually-hidden">Choose Work, Personal, Shopping, or Other.</span>
      <label for="new-task-priority">Priority</label>
      <select
        id="new-task-priority"
        v-model="priority"
        aria-label="Task priority"
      >
        <option v-for="p in TASK_PRIORITIES" :key="p" :value="p">
          {{ p }}
        </option>
      </select>
      <label for="new-task-due">Due date</label>
      <input
        id="new-task-due"
        v-model="dueDate"
        type="date"
        aria-label="Task due date (optional)"
        class="due-input"
      />
    </fieldset>
  </section>
</template>

<style scoped>
.add-task {
  margin-bottom: 2rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.add-task:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.15), 0 4px 8px -1px rgba(0, 0, 0, 0.1);
}

.add-task-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.task-input {
  flex: 1;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  transition: all 0.2s ease;
  font-weight: 500;
}

.task-input:focus {
  outline: none;
  border-color: #6a1b9a;
  background: white;
  box-shadow: 0 0 0 3px rgba(106, 27, 154, 0.1);
}

.task-input::placeholder {
  color: #94a3b8;
}

.btn {
  padding: 0.875rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(106, 27, 154, 0.2);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-add {
  background: linear-gradient(135deg, #6a1b9a 0%, #9333ea 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(106, 27, 154, 0.2);
}

.btn-add:hover:not(:disabled) {
  background: linear-gradient(135deg, #5a1486 0%, #7c3aed 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(106, 27, 154, 0.3);
}

.btn-add:active:not(:disabled) {
  transform: translateY(0);
}

.visually-hidden {
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

.btn-options-toggle {
  background: none;
  border: none;
  color: #6a1b9a;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: all 0.2s ease;
  text-decoration: none;
  border-bottom: 2px solid transparent;
}

.btn-options-toggle:hover {
  color: #5a1486;
  border-bottom-color: #6a1b9a;
}

.add-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  animation: slideDown 0.3s ease-out;
}

.add-options[hidden] {
  display: none;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.add-options label {
  display: block;
  font-size: 0.875rem;
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.add-options select,
.due-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.add-options select:focus,
.due-input:focus {
  outline: none;
  border-color: #6a1b9a;
  box-shadow: 0 0 0 3px rgba(106, 27, 154, 0.1);
}

/* Responsive design */
@media (max-width: 640px) {
  .add-task {
    padding: 1rem;
  }
  
  .add-task-row {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .add-options {
    grid-template-columns: 1fr;
  }
}

/* Loading animation */
.btn-add:disabled {
  position: relative;
}

.btn-add:disabled::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
