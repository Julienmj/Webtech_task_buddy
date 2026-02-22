<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToLogin() {
  router.push('/login')
}

function getStarted() {
  router.push('/login')
}
</script>

<template>
  <div class="home-container">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-content">
        <!-- Logo -->
        <div class="logo">
          <div class="logo-icon">T</div>
          <span class="logo-text">Task-Buddy</span>
        </div>
        
        <!-- Navigation Links -->
        <div class="nav-links">
          <a href="#features" class="nav-link">Features</a>
          <a href="#about" class="nav-link">About</a>
          <button @click="goToLogin" class="login-btn">Login</button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Version Badge -->
      <div class="version-badge">
        v1.0.0 Now Available
      </div>
      
      <!-- Hero Title -->
      <h1 class="hero-title">
        Manage tasks with clarity
      </h1>
      
      <!-- Hero Subtitle -->
      <p class="hero-subtitle">
        A simple, accessible, and open-source task manager for students and educators.
      </p>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button @click="getStarted" class="btn btn-primary">
          Get Started
        </button>
        <button class="btn btn-secondary">
          Learn More
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
}

/* Navigation Bar */
.navbar {
  padding: 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #111827;
  text-decoration: none;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: #111827;
  color: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
}

.logo-text {
  font-size: 1.125rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #111827;
}

.login-btn {
  background: #111827;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-btn:hover {
  background: #374151;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.version-badge {
  background: #f3f4f6;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1.5rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin: 0 0 3rem;
  max-width: 600px;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: #111827;
  color: white;
}

.btn-primary:hover {
  background: #374151;
  transform: translateY(-1px);
}

.btn-secondary {
  background: white;
  color: #111827;
  border-color: #d1d5db;
}

.btn-secondary:hover {
  border-color: #9ca3af;
  background: #f9fafb;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }
  
  .nav-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .action-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
  
  .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .login-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
}
</style>
