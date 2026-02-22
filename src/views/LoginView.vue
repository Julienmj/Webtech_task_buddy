<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const email = ref('student@taskbuddy.edu')
const password = ref('123')

// Form validation
const errors = ref({
  email: '',
  password: ''
})

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateForm() {
  errors.value = { email: '', password: '' }
  let isValid = true

  if (!email.value.trim()) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!validateEmail(email.value)) {
    errors.value.email = 'Please enter a valid email'
    isValid = false
  }

  if (!password.value) {
    errors.value.password = 'Password is required'
    isValid = false
  }

  return isValid
}

async function handleLogin() {
  if (!validateForm()) return

  const success = await authStore.login(email.value, password.value)
  
  if (success) {
    router.push('/task')
  }
}

function handleEmailInput() {
  if (errors.value.email) {
    errors.value.email = ''
  }
  authStore.clearError()
}

function handlePasswordInput() {
  if (errors.value.password) {
    errors.value.password = ''
  }
  authStore.clearError()
}
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="login-title">Sign in to your account</h2>
      <p class="login-subtitle">Welcome back to Task-Buddy</p>
      
      <form @submit.prevent="handleLogin" class="form">
        <!-- Email Field -->
        <div class="form-group">
          <label for="email" class="form-label">Email address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-input"
            :class="{ 'error': errors.email }"
            placeholder="Enter your email"
            autocomplete="email"
            @input="handleEmailInput"
            required
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-input"
            :class="{ 'error': errors.password }"
            placeholder="Enter your password"
            autocomplete="current-password"
            @input="handlePasswordInput"
            required
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <!-- Global Error Message -->
        <div v-if="authStore.error" class="error-banner">
          {{ authStore.error }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="login-button"
          :disabled="authStore.isLoading"
        >
          {{ authStore.isLoading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>

      <!-- Demo Credentials Notice -->
      <div class="demo-notice">
        Demo: student@taskbuddy.edu / 123
      </div>

      <!-- Sign Up Link -->
      <div class="signup-link">
        Don't have an account? <a href="#" class="link">Sign up</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 1rem;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  text-align: center;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem;
}

.login-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

.form-label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-input.error {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.error-banner {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  text-align: center;
}

.login-button {
  background: #111827;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover:not(:disabled) {
  background: #374151;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.demo-notice {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.signup-link {
  font-size: 0.875rem;
  color: #6b7280;
}

.link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}
</style>
