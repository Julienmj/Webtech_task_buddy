<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['complete', 'delete'])

const taskAccessibleName = computed(() => {
  const parts = [props.task.title]
  if (props.task.completed) parts.push('Completed')
  if (props.task.category) parts.push(props.task.category)
  if (props.task.priority) parts.push(`${props.task.priority} priority`)
  if (props.task.dueDate) parts.push(`Due ${props.task.dueDate}`)
  return parts.join(', ')
})

const completeButtonLabel = computed(() =>
  props.task.completed
    ? `Mark "${props.task.title}" as incomplete`
    : `Mark "${props.task.title}" as complete`
)

const deleteButtonLabel = computed(() => `Delete task "${props.task.title}"`)
</script>

<template>
  <li
    class="task-item"
    :class="{ completed: task.completed }"
    role="listitem"
    :aria-label="taskAccessibleName"
  >
    <span class="task-title">{{ task.title }}</span>
    <span v-if="task.category || task.dueDate || task.priority" class="task-meta">
      <span v-if="task.category" class="meta-tag">{{ task.category }}</span>
      <span
        v-if="task.priority"
        class="meta-tag priority"
        :data-priority="task.priority"
      >
        {{ task.priority }}
      </span>
      <span v-if="task.dueDate" class="meta-date">{{ task.dueDate }}</span>
    </span>
    <div class="task-actions" role="group" aria-label="Actions for this task">
      <button
        type="button"
        class="btn-action complete"
        :aria-label="completeButtonLabel"
        @click="emit('complete', task.id)"
      >
        Complete
      </button>
      <button
        type="button"
        class="btn-action delete"
        :aria-label="deleteButtonLabel"
        @click="emit('delete', task.id)"
      >
        Delete
      </button>
    </div>
  </li>
</template>

<style scoped>
.task-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  position: relative;
  background: white;
}

.task-item:last-child {
  border-bottom: none;
}

.task-item:hover {
  background: #f8fafc;
  transform: translateX(4px);
}

.task-item.completed {
  opacity: 0.7;
  background: #f1f5f9;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #64748b;
}

.task-title {
  flex: 1 1 100%;
  font-size: 1rem;
  font-weight: 500;
  color: #1e293b;
  line-height: 1.5;
  min-width: 0;
  word-break: break-word;
}

.task-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.75rem;
  align-items: center;
}

.meta-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #475569;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.meta-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.meta-tag.priority[data-priority='High'] {
  background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
  color: #dc2626;
  border-color: #fca5a5;
}

.meta-tag.priority[data-priority='Medium'] {
  background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);
  color: #d97706;
  border-color: #fde68a;
}

.meta-tag.priority[data-priority='Low'] {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  color: #16a34a;
  border-color: #bbf7d0;
}

.meta-date {
  color: #64748b;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.meta-date::before {
  content: '📅';
  font-size: 0.875rem;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

.btn-action {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  position: relative;
  overflow: hidden;
}

.btn-action:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(106, 27, 154, 0.2);
}

.btn-action::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-action:hover::before {
  left: 100%;
}

.btn-action.complete {
  background: linear-gradient(135deg, #6a1b9a 0%, #9333ea 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(106, 27, 154, 0.2);
}

.btn-action.complete:hover {
  background: linear-gradient(135deg, #5a1486 0%, #7c3aed 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(106, 27, 154, 0.3);
}

.btn-action.delete {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
}

.btn-action.delete:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(220, 38, 38, 0.3);
}

.btn-action:active {
  transform: translateY(0);
}

/* Responsive design */
@media (max-width: 640px) {
  .task-item {
    padding: 1rem;
    gap: 0.75rem;
  }
  
  .task-title {
    font-size: 0.875rem;
  }
  
  .task-meta {
    font-size: 0.6875rem;
  }
  
  .meta-tag {
    padding: 0.1875rem 0.625rem;
  }
  
  .btn-action {
    padding: 0.375rem 0.75rem;
    font-size: 0.6875rem;
  }
  
  .task-actions {
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
  }
  
  .btn-action {
    width: 100%;
  }
}

/* Animation for task completion */
.task-item.completed {
  animation: completeTask 0.3s ease-out;
}

@keyframes completeTask {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1);
  }
}

/* Priority indicator */
.task-item:not(.completed) .meta-tag.priority[data-priority='High'] {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
