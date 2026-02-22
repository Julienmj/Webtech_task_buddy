import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // User credentials from the Netlify demo
  const VALID_CREDENTIALS = {
    email: 'student@taskbuddy.edu',
    password: '123'
  }

  // State
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref('')

  // Computed properties
  const isAuthenticated = computed(() => user.value !== null)
  const userEmail = computed(() => user.value?.email || '')

  // Actions
  async function login(email, password) {
    isLoading.value = true
    error.value = ''

    try {
      // Simulate API call delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Validate credentials against the demo credentials
      if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
        user.value = { 
          email, 
          name: 'Student User',
          id: 1
        }
        return true
      } else {
        error.value = 'Invalid email or password'
        return false
      }
    } catch (err) {
      error.value = 'Login failed. Please try again.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    error.value = ''
  }

  function clearError() {
    error.value = ''
  }

  return {
    // State
    user,
    isLoading,
    error,
    
    // Computed
    isAuthenticated,
    userEmail,
    
    // Actions
    login,
    logout,
    clearError
  }
})
