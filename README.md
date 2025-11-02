# Task Manager Mobile App

A beautiful, feature-rich task management mobile application built with React Native and Expo, featuring a modern dark theme with colorful accents.

## 📱 Screenshots

- **All Tasks View**: Browse all your tasks with priority-based color coding
- **Add Task**: Create new tasks with detailed information
- **View Task**: See complete task details in an organized layout
- **Edit Task**: Update existing tasks seamlessly

## ✨ Features

### Task Management

- ✅ Create, Read, Update tasks
- 🎨 Color-coded priorities (Low, Medium, High, Urgent)
- 📊 Status tracking (To Do, In Progress, Completed, Cancelled)
- 📅 Due date management (Today, Tomorrow, This Week)
- 🏷️ Categories and tags
- 👥 Task assignment
- ⏱️ Time tracking (estimated & actual minutes)
- 🔄 Recurring tasks support

### User Interface

- 🌙 Modern dark theme
- 🎨 Vibrant color system for better visual hierarchy
- 📱 Smooth animations and transitions
- 💫 Loading states and empty states
- ✏️ Intuitive form controls with button groups
- 🔍 Clear task details view with sections

### Technical Features

- 📡 RESTful API integration
- 🔄 Real-time data fetching
- 🎯 Type-safe with TypeScript
- 📦 Modular component structure
- 🚀 Optimized performance

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **UI**: Custom styled components
- **Icons**: Expo Vector Icons (Ionicons)
- **Backend**: Node.js REST API (deployed on Railway)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd task-manager-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Update API Base URL** (if needed)

   In each screen file, update the API_BASE constant:

   ```typescript
   const API_BASE = "https://your-backend-url.railway.app";
   ```

4. **Start the development server**

   ```bash
   npx expo start
   ```

5. **Run on your device**
   - Scan QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## 📁 Project Structure

```
task-manager-app/
├── app/
│   ├── index.tsx          # All tasks list screen
│   ├── add.tsx            # Create new task screen
│   ├── view.tsx           # View task details screen
│   ├── edit.tsx           # Edit existing task screen
│   └── _layout.tsx        # Root layout
├── assets/                # Images, fonts, etc.
├── components/            # Reusable components
├── package.json
└── README.md
```

## 🎨 Color System

### Priority Colors

- **Low**: `#95E1D3` (Mint Green)
- **Medium**: `#4ECDC4` (Teal)
- **High**: `#FF9F43` (Orange)
- **Urgent**: `#FF6B6B` (Red)

### Status Colors

- **To Do**: `#A29BFE` (Purple)
- **In Progress**: `#FD79A8` (Pink)
- **Completed**: `#26DE81` (Green)
- **Cancelled**: `#636E72` (Gray)

### Base Colors

- **Background**: `#1C1C1E`
- **Card Background**: `#2C2C2E`
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#8E8E93`

## 🔌 API Endpoints

### Base URL

```
https://task-manager-production-4aeb.up.railway.app
```

### Endpoints

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | `/mytasks`     | Get all tasks   |
| GET    | `/mytasks/:id` | Get single task |
| POST   | `/mytasks`     | Create new task |
| PATCH  | `/mytasks/:id` | Update task     |
| DELETE | `/mytasks/:id` | Delete task     |

## 📝 Task Object Structure

```typescript
{
  id: number;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate?: "today" | "tomorrow" | "this_week";
  category?: string;
  tags?: string[];
  assignedTo?: string;
  createdBy: string;
  estimatedMinutes?: number;
  actualMinutes?: number;
  isRecurring?: boolean;
  recurrencePattern?: "daily" | "weekly" | "monthly";
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
}
```

## 🚀 Deployment

### Backend (Railway)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```

2. **Railway Auto-Deploy**

   - Railway automatically detects changes
   - Builds and deploys your backend
   - Same URL remains active

3. **Environment Variables**
   - Set in Railway Dashboard → Your Project → Variables
   - Add database URLs, API keys, etc.

### Mobile App

#### iOS (TestFlight)

```bash
eas build --platform ios
eas submit --platform ios
```

#### Android (Google Play)

```bash
eas build --platform android
eas submit --platform android
```

## 🔧 Configuration

### Expo Configuration (`app.json`)

```json
{
  "expo": {
    "name": "Task Manager",
    "slug": "task-manager",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1C1C1E"
    }
  }
}
```

## 🐛 Troubleshooting

### API Connection Issues

- Verify backend is running on Railway
- Check API_BASE URL in all screen files
- Ensure Railway service hasn't gone to sleep (free tier limitation)

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npx expo start -c
```

### Type Errors

```bash
# Check TypeScript
npx tsc --noEmit
```

## 📚 Learn More

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Railway Documentation](https://docs.railway.app/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Your Name

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Design inspiration from modern task management apps
- Color palette from various design systems
- Icons by Ionicons
- Backend hosted on Railway

---

Made with ❤️ using React Native and Expo
