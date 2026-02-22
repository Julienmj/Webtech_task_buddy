<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['complete', 'delete'])
</script>

<template>
  <section
    class="task-list"
    aria-labelledby="task-list-heading"
    :aria-label="tasks.length ? `Your tasks, ${tasks.length} item${tasks.length === 1 ? '' : 's'}.` : undefined"
  >
    <h2 id="task-list-heading" class="visually-hidden">Your tasks</h2>
    
    <!-- Empty State -->
    <div v-if="!tasks.length" class="empty-state">
      <div class="empty-icon">📝</div>
      <h3 class="empty-title">No tasks yet</h3>
      <p class="empty-description">Add your first task to get started!</p>
    </div>
    
    <!-- Task List -->
    <ul
      v-else
      class="tasks"
      role="list"
      :aria-label="`Task list, ${tasks.length} task${tasks.length === 1 ? '' : 's'}`"
    >
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @complete="emit('complete', $event)"
        @delete="emit('delete', $event)"
      />
    </ul>
  </section>
</template>

<style scoped>
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

.task-list {
  margin-bottom: 2rem;
}

.tasks {
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tasks:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.15), 0 4px 8px -1px rgba(0, 0, 0, 0.1);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 2px dashed #e2e8f0;
  transition: all 0.2s ease;
}

.empty-state:hover {
  border-color: #6a1b9a;
  box-shadow: 0 4px 6px -1px rgba(106, 27, 154, 0.1), 0 2px 4px -1px rgba(106, 27, 154, 0.06);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.7;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #374151;
  margin: 0 0 0.5rem;
}

.empty-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

/* Responsive design */
@media (max-width: 640px) {
  .empty-state {
    padding: 2rem 1rem;
  }
  
  .empty-icon {
    font-size: 2.5rem;
  }
  
  .empty-title {
    font-size: 1.125rem;
  }
}

/* Animation for list items */
.tasks {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
