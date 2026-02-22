<script setup>
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <section
    class="counter-section"
    aria-labelledby="counter-heading"
    aria-describedby="counter-desc"
  >
    <h2 id="counter-heading" class="visually-hidden">Counter</h2>
    <p id="counter-desc" class="visually-hidden">Optional counter. Current value is announced when it changes.</p>
    
    <div class="counter-card">
      <div class="counter-header">
        <h3 class="counter-title">Fun Counter</h3>
        <div class="counter-icon">🎯</div>
      </div>
      
      <div class="counter-display">
        <span class="count-number">{{ counterStore.count }}</span>
        <span class="count-label">clicks</span>
      </div>
      
      <div class="counter-stats">
        <div class="stat-item">
          <span class="stat-value">{{ counterStore.doubleCount }}</span>
          <span class="stat-label">Double</span>
        </div>
      </div>
      
      <button
        type="button"
        class="btn btn-increase"
        aria-label="Increase count by one"
        @click="counterStore.increment"
      >
        <span class="btn-content">
          <span class="btn-icon">+</span>
          <span class="btn-text">Increase</span>
        </span>
      </button>
    </div>
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

.counter-section {
  margin-bottom: 2rem;
}

.counter-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #6a1b9a, #9333ea) border-box;
}

.counter-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.15), 0 4px 8px -1px rgba(0, 0, 0, 0.1);
}

.counter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.counter-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.counter-icon {
  font-size: 1.5rem;
  opacity: 0.8;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-2px);
  }
}

.counter-display {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.count-number {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6a1b9a 0%, #9333ea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.25rem;
  transition: transform 0.2s ease;
}

.count-number:active {
  transform: scale(0.95);
}

.count-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.counter-stats {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 0.75rem 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #6a1b9a;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.btn {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(106, 27, 154, 0.2);
}

.btn-increase {
  background: linear-gradient(135deg, #6a1b9a 0%, #9333ea 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(106, 27, 154, 0.2);
}

.btn-increase:hover {
  background: linear-gradient(135deg, #5a1486 0%, #7c3aed 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(106, 27, 154, 0.3);
}

.btn-increase:active {
  transform: translateY(0);
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  font-size: 1.25rem;
  font-weight: 700;
}

.btn-text {
  font-weight: 600;
}

/* Shimmer effect */
.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

/* Responsive design */
@media (max-width: 640px) {
  .counter-card {
    padding: 1rem;
  }
  
  .counter-header {
    margin-bottom: 1rem;
  }
  
  .counter-title {
    font-size: 1rem;
  }
  
  .counter-icon {
    font-size: 1.25rem;
  }
  
  .count-number {
    font-size: 2.5rem;
  }
  
  .stat-item {
    padding: 0.5rem 1rem;
  }
  
  .stat-value {
    font-size: 1.25rem;
  }
}

/* Animation for count change */
.count-number {
  animation: countChange 0.3s ease-out;
}

@keyframes countChange {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
