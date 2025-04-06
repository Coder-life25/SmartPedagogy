# Backend Github Repo Link

```
Link :- https://github.com/Coder-life25/smartpedagogy-backend-

```

---

# 📘 SmartPedagogy Frontend

SmartPedagogy is a modern web-based platform designed to simplify assignment creation, submission, and evaluation using AI technologies. This **frontend** project is built using **React.js**, **Tailwind CSS**, and integrates tightly with the backend API to support both teacher and student dashboards.

---

## 🚀 Features

### 🧑‍🎓 Student Dashboard

- **Overview Section** – Displays assignment and status summary
- **Assignment Section** – View assignments uploaded by teacher and submit work
- **Feedback & Insights Section** – Displays AI-generated evaluation and suggestions

### 👨‍🏫 Teacher Dashboard

- **Assignment Section** – Upload assignments for students
- **Feedback & Score Section** – View performance of each student per assignment with AI-based scores and suggestions
- **Dashboard Overview** – Average scores, comparison graphs, performance trends

### 🔐 Authentication

- Login and Logout functionality
- Role-based rendering (Student vs Teacher UI)
- Profile View and Edit functionality

---

## 🛠️ Tech Stack

- **React.js** (Frontend Framework)
- **Tailwind CSS** (Utility-first CSS framework)
- **Axios** (API communication)
- **React Router** (Routing)
- **Redux Toolkit** (state management Library)

---

## 📂 Project Structure (Frontend)

```
smartpedagogy-frontend/
│
├── src/
│   ├── components/        → Reusable UI components
│   ├── pages/             → Teacher & Student pages
│   ├── utils/             → Utility functions
│   ├── App.js             → Entry point with routes
│   └── index.js           → ReactDOM entry
```

---

## 🔮 Future Plans

### ✅ Confirmed Plans

1. Teachers will be able to upload **PDF or JPG** files along with text.
2. Add a **search bar** to find other students and enable **chat**.
3. Use **fine-tuned subject-specific AI models** for better evaluation.
4. Extract **questions from assignments** and match with student answers.
5. Enable **handwritten OCR** support for JPG/PDF (beyond Tesseract.js).
6. Allow assignment visibility only to **specific sections or branches**.

7. **Push Notification System** – alert students for assignment/feedback updates.
8. **Assignment Versioning** – allow re-submissions with version history.
9. **Live Feedback Review Sessions** – via Google Meet/Zoom.
10. **Gamification & Leaderboard** – encourage participation and engagement.
11. **AI Doubt Solver** – chat with an AI assistant to resolve doubts.

---

## 📦 Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/Coder-life25/SmartPedagogy.git
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

---

## 📄 License

MIT License
