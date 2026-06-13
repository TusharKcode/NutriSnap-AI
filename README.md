<![CDATA[# 🥗 NutriSnapAI

> **AI-powered nutrition tracking platform** — Develop healthier eating habits through automated food analysis, calorie tracking, hydration monitoring, weight logging, goal management, and intelligent meal recommendations.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)

---

## 🚀 Project Overview

NutriSnapAI is a full-stack web application that combines modern web technologies with AI-assisted analysis to create a highly personalized health-tracking experience.

### Key Capabilities

| | Feature | Description |
| :--- | :--- | :--- |
| 📸 | **AI Food Analysis** | Upload food images and get instant nutritional breakdowns |
| 📊 | **Smart Dashboards** | Track calories, macronutrients, water intake, and weight trends |
| 🔥 | **Habit Building** | Maintain nutrition streaks and monitor goal progress |
| 🤖 | **AI Meal Suggestions** | Receive personalized recommendations tailored to your goals |

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- Secure JWT Authentication with persistent sessions
- Protected Frontend Routes & Backend Middleware
- Secure Logout Functionality

### 🍽 Food Tracking
- Seamless Food Upload Workflow (Image + Metadata)
- Comprehensive Food Diary Management
- Secure Nutrition Data Storage (User-Specific Entries)
- Meal Categorization (Breakfast, Lunch, Dinner, Snacks)
- Full CRUD Operations (Edit/Delete Food Entries)

### 📊 Dashboard Analytics
- Dynamic Nutrition Summary Cards
- Real-time Daily Goal Progress Tracking
- Weekly Calorie & Macro Visualization (Charts)
- Active Streak Tracking & Engagement Statistics

### 🤖 AI Features
- **AI Food Analysis:** Automated recognition and nutrition estimation
- **AI Meal Suggestions:** Smarter, personalized diet recommendations

### 👤 User Profile & Goals
- Profile Overview featuring "Member Since" stats
- Customizable Nutrition Goals (Calories, Macros, Water, Weight)
- Unlockable Achievement Badges & Current Streak tracking

### 💧 Hydration & ⚖ Weight Tracking
- Daily Water Logging with Quick Add buttons and progress indicators
- Weight logging with historical tracking to monitor body progress over time

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React · Vite · React Router · Axios · Tailwind CSS · Recharts · React Icons |
| **Backend** | Node.js · Express.js · Mongoose · JWT · Bcryptjs · Multer · Dotenv · CORS |
| **Database** | MongoDB Atlas |
| **AI Layer** | Gemini AI API |

---

## 🏗 Architecture & System Design

### 🧠 System Architecture Flow

```text
User ➔ React Frontend ➔ Axios API Layer ➔ Express Backend ➔ Auth Middleware ➔ Controllers ➔ MongoDB Atlas / Gemini AI
```

---

## 📂 Project Structure

```
nutrisnap-ai/
├── frontend/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Dashboard, Profile, Login, etc.
│   ├── services/      # API communication layer
│   ├── context/       # Global state (Auth, Themes)
│   ├── routes/        # Frontend route configurations
│   └── api/           # Axios configurations
├── backend/
│   ├── controllers/   # Business logic handlers
│   ├── models/        # MongoDB Schemas (User, Food, Weight)
│   ├── routes/        # Express API Endpoints
│   ├── middleware/    # Auth & File Upload triggers
│   ├── services/      # Gemini AI integration service
│   ├── utils/         # Helper functions
│   ├── config/        # Database and Env configurations
│   └── uploads/       # Temporary local image storage
└── docs/
    ├── ai-logs/       # Structured development logs
    ├── architecture/  # System design diagrams
    └── screenshots/   # Application preview images
```

---

## ⚙️ Core Workflows

### 🔐 Authentication Flow

```text
[ User Registers ]
        │
        ▼
[ Password Hashed (bcryptjs) ] ➔ [ JWT Token Generated ]
                                          │
                                          ▼
[ Protected Routes Checked ] ➔ [ Token Stored in localStorage ]
        │
        ▼
[ Backend Middleware Validates Token on Requests ]
```

### 🍽 Food Tracking Workflow

1. **Upload** — User uploads a meal image through the React interface.
2. **AI Processing** — The image payload is passed to the backend, triggering the Gemini AI Service.
3. **Extraction** — AI runs food recognition and performs nutrition estimation.
4. **Storage** — Extracted parameters (Calories, Macros) are structured and saved into MongoDB Atlas.
5. **Sync** — The interface updates automatically, displaying new metrics instantly in the Food Diary and dashboard.

---

## 📊 Core Feature Modules

### 📈 Dashboard Analytics & Metrics

The analytics architecture relies on robust custom APIs designed to feed aggregated insights directly to the UI components.

- **Implemented Endpoints:** Dashboard Summary, Weekly Statistics, Streak Analytics, Goal Progress
- **Tracked Variables:** Total Calories, Macro Breakdowns (Protein, Carbs, Fat), Total Meals Logged, Current Streak, and Historical Weekly Trends

### 🎯 Goal Management

Users have complete autonomy to customize their personal daily health benchmarks. Progress indicators dynamically update when configuring:

- Daily Caloric Targets
- Target Macros (Protein, Carbohydrates, Fats)
- Fluid Hydration Goals & Target Weight Metrics

### 💧 Hydration & ⚖️ Weight Tracking

- **Water Engine:** Intuitive tracking interface with goal monitoring, quick-add volume buttons, and responsive fluid progress rings.
- **Weight Engine:** Historical tracking ledger offering continuous weight logging and timeline progress monitoring with visual trendlines.

### 🤖 Gemini AI Integration

The intelligence engine utilizes specialized prompt structures designed to ensure structured JSON returns from Gemini AI for:

- **Food Recognition** — Visual taxonomy of simple and complex multi-element food items
- **Nutrition Estimation** — Instant translation of visual data into actionable physical metrics
- **Meal Recommendations** — Goal-aware suggestions tailored to filling active nutritional deficits

---

## 📚 AI Development Logs

Project milestones and evolutionary design choices were systematically guided through structured AI-assisted implementation logs.

<details>
<summary>📝 Log Library Directory (<code>docs/ai-logs/</code>)</summary>

| Log | Topic |
| :--- | :--- |
| AI Log 01 | Project Planning & Blueprinting |
| AI Log 02 | Database Architecture & Schema Constraints |
| AI Log 03 | Authentication Topologies & Security Rules |
| AI Log 04 | Express Server Scaffolding |
| AI Log 05 | Authentication System Hardening |
| AI Log 06 | File Handlers & Food Tracking Foundations |
| AI Log 07 | Dashboard Analytics Pipeline Construction |
| AI Log 08 | Frontend Planning & UI Mapping |
| AI Log 09 | Live System Debugging & Issue Resolution |
| AI Log 10 | UI Enhancement & Final Application Polish |

</details>

---

## 🔧 Installation & Environment Configuration

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/nutrisnap-ai.git
cd nutrisnap-ai
```

### 2. Backend Environment Setup

Navigate to the server directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside the `/backend` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_phrase
GEMINI_API_KEY=your_gemini_ai_api_credential
```

Start the development server:

```bash
npm run dev
```

### 3. Frontend App Setup

Open a new terminal, navigate to the frontend, and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `/frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development client:

```bash
npm run dev
```

---

## 🌟 Future Enhancements

- [ ] Native Edge-Based Food Image Recognition Classifiers
- [ ] Universal UPC/EAN Barcode Scanning Integration
- [ ] Contextual Dynamic Meal Planning Engines
- [ ] Conversational Interactive AI Health Coach Extensions
- [ ] Predictive Nutrition Insights Powered by Aggregated Data
- [ ] Native Mobile App Wrappers (iOS & Android)
- [ ] Gamified Social Sharing, Group Pools, and Interactive Leaderboards
- [ ] Transactional Push Notifications for Fluid and Meal Alerts

---

## 📸 Project Previews

> Place your visual application references inside the `docs/screenshots/` directory.

```
docs/screenshots/
├── home.png         # Landing Page Interface
├── dashboard.png    # Live Analytic Dashboard Metric Views
├── upload.png       # AI Target Assessment Interface
├── diary.png        # Chronological Dietary History Cards
├── profile.png      # User Badge and Goal System Panel
└── analytics.png    # Recharts Component Trend Panels
```

---

## 👨‍💻 Developer

**Tushar** — Full Stack Developer

NutriSnapAI was engineered as an innovative, highly responsive Full Stack AI Nutrition Tracking Ecosystem leveraging React, Node.js, MongoDB Atlas, Express, Tailwind CSS, and advanced Gemini AI model instances.

---

## 📄 License

This software repository is curated and maintained exclusively for educational, engineering portfolio validation, and system engineering competition tracks.
]]>