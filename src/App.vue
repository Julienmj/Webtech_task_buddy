<script setup>
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()

watch(
  () => route.path,
  () => {
    if (route.name === 'home') {
      document.title = 'TaskBuddy - Home'
    } else if (route.name === 'login') {
      document.title = 'TaskBuddy - Login'
    } else if (route.name === 'task') {
      document.title = 'TaskBuddy'
    } else {
      document.title = 'TaskBuddy'
    }
  },
  { immediate: true }
)
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <router-view />
</template>

<style>
/* Modern CSS Reset and Global Styles */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8fafc;
  color: #1e293b;
  line-height: 1.6;
}

/* Skip link: visible on focus for keyboard and screen reader users */
.skip-link {
  position: absolute;
  top: -100px;
  left: 0.5rem;
  z-index: 100;
  padding: 0.75rem 1rem;
  background: #6a1b9a;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0 0 6px 6px;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid #fff;
  outline-offset: 2px;
}

/* Modern button styles */
button {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  border: none;
  background: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

/* Modern input styles */
input, textarea, select {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #6a1b9a;
  box-shadow: 0 0 0 3px rgba(106, 27, 154, 0.1);
}

/* Modern link styles */
a {
  color: #6a1b9a;
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: #5a1486;
  text-decoration: underline;
}

/* Utility classes */
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

/* Modern scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Focus visible for better accessibility */
.focus-visible:focus-visible {
  outline: 2px solid #6a1b9a;
  outline-offset: 2px;
}
</style>
