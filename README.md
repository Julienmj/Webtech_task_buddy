# TaskBuddy - Professional Task Management System

A comprehensive task management application built with **Vue 3**, **Pinia**, and **Vue Router**. Features complete authentication system, professional dashboard interface, and modern UI/UX design matching educational standards.

---

## 🎯 Project Overview

TaskBuddy is a fully-functional task management system that demonstrates modern web development practices. The project has been completely transformed from a basic task manager into a professional application with authentication, landing page, and comprehensive dashboard interface.

### 🌟 Key Features

#### 🔐 Authentication System
- **Login Page** with minimalist design matching educational standards
- **Demo Credentials**: `student@taskbuddy.edu` / `123`
- **Route Guards** protecting authenticated routes
- **Session Management** with automatic redirects
- **Logout Functionality** with proper state cleanup

#### 🏠 Landing Page
- **Modern Navigation Bar** with Task-Buddy branding
- **Hero Section** with version badge and call-to-action
- **Responsive Design** optimized for all devices
- **Navigation Flow** from landing to authenticated areas

#### 📊 Professional Dashboard
- **Sidebar Navigation** with Dashboard, To Do, In Progress, Completed sections
- **Task Summary Cards** showing Today's Tasks, Upcoming, Overdue, and Completion rate
- **Task Cards** with priority tags, descriptions, due dates, and status management
- **Real-time Statistics** with progress indicators
- **Interactive Elements** with hover effects and smooth transitions

#### 🎨 Modern UI/UX Design
- **Clean, Minimalist Interface** matching teacher's design specifications
- **Color-coded Priority System** (High/Medium/Low)
- **Responsive Layout** for mobile and desktop
- **Professional Typography** and spacing
- **Accessibility Features** with screen reader support

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version / notes |
|-------------|-----------------|
| **Node.js** | `^20.19.0` or `>= 22.12.0` (see [nodejs.org](https://nodejs.org)) |
| **npm** | Comes with Node.js (v9+) |

Check your versions:
```bash
node -v   # e.g. v20.19.0 or v22.x
npm -v    # e.g. 10.x
```

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Julienmj/Webtech_task_buddy.git
   cd Webtech_task_buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### 🔑 Login Credentials
- **Email**: `student@taskbuddy.edu`
- **Password**: `123`

---

## 📁 Project Structure

```
Webtech_task_buddy/
├── index.html                    # Single HTML entry point
├── package.json                  # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── src/
│   ├── main.js                  # App bootstrap: Vue + Pinia + Router
│   ├── App.vue                  # Root component with global styles
│   ├── router/
│   │   └── index.js            # Route configuration and guards
│   ├── stores/
│   │   ├── auth.js              # Authentication state management
│   │   ├── counter.js           # Counter component state
│   │   └── tasks.js             # Tasks state and CRUD operations
│   ├── views/
│   │   ├── HomeView.vue         # Landing page component
│   │   ├── LoginView.vue        # Authentication interface
│   │   └── TaskView.vue         # Professional dashboard
│   └── components/
│       ├── AddTaskForm.vue      # Task creation form
│       ├── TaskList.vue         # Task list wrapper
│       ├── TaskItem.vue         # Individual task component
│       └── CounterSection.vue   # Counter display component
├── PROJECT-GUIDE.md             # Detailed code walkthrough
└── README.md                    # This file
```

---

## 🛠️ Implementation Steps

### Phase 1: Authentication System
1. **Created Auth Store** (`src/stores/auth.js`)
   - User authentication state management
   - Login/logout functionality
   - Session persistence

2. **Built Login Interface** (`src/views/LoginView.vue`)
   - Minimalist design matching educational standards
   - Form validation and error handling
   - Demo credentials integration

3. **Updated Router Configuration** (`src/router/index.js`)
   - Added login and home routes
   - Implemented navigation guards
   - Protected route authentication

### Phase 2: Landing Page Development
1. **Created HomeView Component** (`src/views/HomeView.vue`)
   - Modern navigation bar with branding
   - Hero section with version badge
   - Call-to-action buttons and links

2. **Enhanced App.vue**
   - Dynamic page titles
   - Global styling improvements
   - Accessibility enhancements

### Phase 3: Dashboard Interface Transformation
1. **Redesigned TaskView** (`src/views/TaskView.vue`)
   - Sidebar navigation with status filters
   - Task summary statistics cards
   - Professional task card layout
   - Status management system

2. **Updated Tasks Store** (`src/stores/tasks.js`)
   - Added status field support
   - Enhanced task data structure
   - Description field integration

3. **Modernized All Components**
   - Updated AddTaskForm with modern styling
   - Enhanced TaskList with empty states
   - Improved TaskItem with priority indicators
   - Redesigned CounterSection with gradients

### Phase 4: UI/UX Enhancement
1. **Global Styling Updates**
   - Modern CSS reset and utilities
   - Consistent color scheme
   - Responsive design patterns
   - Animation and transition effects

2. **Component Styling**
   - Card-based design system
   - Hover effects and micro-interactions
   - Mobile-responsive layouts
   - Professional typography

---

## 🎯 Features Deep Dive

### Authentication Flow
```
Landing Page (/) → Login (/login) → Dashboard (/task)
```

1. **Unauthenticated users** are redirected to login
2. **Authenticated users** can access the dashboard
3. **Session management** handles login state
4. **Route guards** protect sensitive areas

### Dashboard Navigation
- **Dashboard**: Overview with all tasks and statistics
- **To Do**: Filter tasks with "To Do" status
- **In Progress**: Filter tasks with "In Progress" status  
- **Completed**: Filter completed tasks

### Task Management
- **Create Tasks**: Add title, description, priority, due date
- **Status Management**: Update task status via dropdown
- **Priority Levels**: High (red), Medium (orange), Low (green)
- **Due Date Tracking**: Visual indicators for overdue tasks

### Statistics & Analytics
- **Today's Tasks**: Count of tasks due today
- **Upcoming**: Future scheduled tasks
- **Overdue**: Tasks needing attention (highlighted in red)
- **Completion Rate**: Percentage with visual progress bar

---

## 🛠️ Available Scripts

| Command | What it does |
|--------|------------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Serve production build locally |
| `npm run test:unit` | Run unit tests with Vitest |
| `npm run format` | Format source code with oxfmt |

---

## 💻 Tech Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite** – Build tool and development server
- **Vue Router** – Client-side routing and navigation
- **Pinia** – State management for auth and tasks
- **CSS3** – Modern styling with animations
- **Vitest** – Unit testing framework

---

## 🎨 Design System

### Color Palette
- **Primary**: #111827 (Dark text)
- **Secondary**: #64748b (Gray text)
- **Accent**: #3b82f6 (Blue for interactive elements)
- **Success**: #16a34a (Green for completed items)
- **Warning**: #ea580c (Orange for medium priority)
- **Danger**: #dc2626 (Red for high priority/overdue)

### Typography
- **Headings**: System font stack, 700 weight
- **Body**: System font stack, 400-500 weight
- **UI Elements**: 0.875rem - 1.125rem scale

### Components
- **Cards**: White background, subtle shadows, rounded corners
- **Buttons**: Black primary, white secondary with borders
- **Forms**: Clean inputs with focus states
- **Navigation**: Sidebar with active state indicators

---

## 📱 Responsive Design

### Desktop (>768px)
- Sidebar navigation (250px width)
- Grid layout for summary cards (4 columns)
- Horizontal task card layout

### Tablet (768px)
- Collapsible sidebar
- Grid layout (2 columns)
- Vertical task cards

### Mobile (<768px)
- Horizontal sidebar navigation
- Single column layout
- Full-width task cards

---

## 🔧 Development Guidelines

### Code Organization
- **Composition API** with `<script setup>`
- **Pinia stores** for state management
- **Vue Router** for navigation
- **Scoped CSS** for component styling
- **Semantic HTML5** for accessibility

### Best Practices
- **Component reusability** through props and events
- **State management** with computed properties
- **Route protection** with navigation guards
- **Error handling** with user feedback
- **Accessibility** with ARIA labels and screen reader support

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Environment Variables
- No environment variables required for this project
- All configuration is handled in-code

---

## 🧪 Testing

### Unit Tests
```bash
npm run test:unit
```

### Manual Testing Checklist
- [ ] Login with demo credentials
- [ ] Navigation between pages
- [ ] Task creation and management
- [ ] Status updates and filtering
- [ ] Responsive design on mobile
- [ ] Accessibility features

---

## 📚 Learning Resources

### Vue 3 Documentation
- [Vue 3 Guide](https://vuejs.org/guide/introduction.html)
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)

### Project Documentation
- **PROJECT-GUIDE.md** - Detailed code walkthrough
- **Component Documentation** - Inline code comments
- **Store Documentation** - State management explanations

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is for educational purposes. Feel free to use it as a learning resource or reference for your own projects.

---

## 🆘 Troubleshooting

### Common Issues
- **`'vite' is not recognized`** → Run `npm install`
- **Module not found** → Delete `node_modules` and reinstall
- **Port already in use** → Kill process or use different port
- **Authentication not working** → Check browser console for errors

### Windows PowerShell Commands
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
npm install

# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

## 📞 Support

For questions or issues:
1. Check the **PROJECT-GUIDE.md** for detailed explanations
2. Review the component code comments
3. Test the demo at the provided URL
4. Refer to Vue 3 documentation

---

**🎉 Happy Coding!** This project demonstrates modern web development practices and serves as an excellent learning resource for Vue 3, state management, and professional UI/UX design.
