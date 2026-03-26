# 📚 Assignment Submission and Evaluation System

A **full-stack web platform** where students can submit assignments and instructors can evaluate them with marks and feedback. Built with HTML5, CSS3, JavaScript, Express.js, and MongoDB.

---

## 🎯 Project Overview

- **Students** submit assignments using Student ID
- **Instructors** retrieve, evaluate, and provide feedback
- **System** stores and displays results with analytics dashboards
- **No authentication required** → Student ID acts as primary identifier
- **Cloud-based MongoDB** for scalable data storage

---

## ✨ Key Features Implemented

✅ **Student Panel:**
- Submit assignments (PDF/DOCX files with drag & drop)
- View all submitted assignments
- View detailed results with marks and feedback
- Performance analytics with line charts
- Average score calculation

✅ **Instructor Panel:**
- Search for student submissions
- Evaluate assignments with marks (0-100) and feedback
- View student performance analytics
- Visual performance trends with Chart.js

✅ **Technical Features:**
- File upload validation (PDF/DOCX only, max 10MB)
- Responsive design (mobile-friendly)
- Error handling and validation
- Session storage for Student ID persistence
- Real-time API integration

---

## 🏗️ Project Architecture

### Overall Structure
```
Landing Page
    ↓
┌───────────────────────┬─────────────────────┐
│   STUDENT DASHBOARD   │  INSTRUCTOR DASHBOARD│
├───────────────────────┼─────────────────────┤
│ • Submit Assignment   │ • View Assignments  │
│ • View Submissions    │ • Evaluate Work     │
│ • View Results        │ • Analytics         │
└───────────────────────┴─────────────────────┘
         ↓                      ↓
    [MongoDB Atlas]     [Express.js API]
```

### 1. Landing Page
- Hero section with project introduction
- Two navigation buttons (Student/Instructor)
- Features overview
- Workflow explanation

### 2. Student Dashboard
**Timeline:**
- Home → Submit Assignment → View Submissions → View Results

**Pages:**
- **Dashboard**: Quick stats and navigation
- **Submit**: Upload assignment with drag & drop
- **Submissions**: List of all submitted assignments with status
- **Results**: Marks, feedback, analytics, and performance graph

### 3. Instructor Dashboard
**Timeline:**
- Home → View Assignments → Evaluate → Analytics

**Pages:**
- **Dashboard**: Quick navigation and status
- **View Assignments**: Search and list student submissions
- **Evaluate**: Review assignment and submit marks/feedback
- **Analytics**: Student performance tracking with charts

---

## 📁 Complete Project Structure

```
project-root/
├── frontend/
│   ├── index.html                 ✅ Landing page
│   ├── css/
│   │   └── styles.css             ✅ Unified global styles
│   ├── student/
│   │   ├── dashboard.html         ✅ Student home
│   │   ├── submit.html            ✅ Submit assignment
│   │   ├── submit.js              ✅ Form handling + API integration
│   │   ├── submissions.html       ✅ View all submissions
│   │   ├── submissions.js         ✅ Fetch submissions logic
│   │   ├── results.html           ✅ Results & analytics
│   │   └── results.js             ✅ Chart.js performance graph
│   │
│   └── instructor/
│       ├── dashboard.html         ✅ Instructor home
│       ├── view.html              ✅ View assignments list
│       ├── view.js                ✅ Search & fetch logic
│       ├── evaluate.html          ✅ Evaluation form
│       ├── evaluate.js            ✅ Submit evaluation logic
│       ├── analytics.html         ✅ Student analytics
│       └── analytics.js           ✅ Chart.js trend analysis
│
├── backend/
│   ├── server.js                  ✅ Express app setup
│   ├── package.json               ✅ All dependencies included
│   ├── .env                        ✅ MongoDB URI + config
│   │
│   ├── config/
│   │   └── db.js                  ✅ MongoDB connection
│   │
│   ├── models/
│   │   ├── Submission.js          ✅ Student submission schema
│   │   ├── Grade.js               ✅ Marks & feedback schema
│   │   └── Assignment.js          ✅ Assignment metadata
│   │
│   ├── routes/
│   │   ├── submissions.js         ✅ POST/GET submissions
│   │   ├── grades.js              ✅ POST grades (evaluation)
│   │   └── analytics.js           ✅ GET analytics per student
│   │
│   ├── middleware/
│   │   └── upload.js              ✅ Multer file upload config
│   │
│   └── uploads/                   📁 File storage (auto-created)
│
├── .gitignore                      ✅ Excludes .env, uploads/, node_modules/
├── Readme.md                       📖 Full documentation
└── .git/                           Git repository

```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (MongoDB Atlas - Cloud recommended)
- **npm** or **yarn**
- **Git**

### Installation Steps

#### 1. Clone Repository
```bash
git clone <repository-url>
cd Assignment_Submission_and_Evaluation_System
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

#### 3. Configure Environment
Create `.env` file in `backend/` folder:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/assignmentDB
NODE_ENV=development
PORT=3000
```

**To get MongoDB URI:**
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get connection string: `mongodb+srv://user:pass@cluster.net/dbname`

#### 4. Start Backend Server
```bash
npm start
```
**Output:** `🚀 Server running on http://localhost:3000`

#### 5. Access Application
Open browser and navigate to:
```
http://localhost:3000
```

---

## 📝 Features & Specifications

### Student Features
| Feature | Details |
|---------|---------|
| **Submit Assignment** | Upload PDF/DOCX files (max 10MB) with metadata |
| **Track Submissions** | View all submissions with upload date and status |
| **View Results** | See marks, feedback, and average scores |
| **Performance Charts** | Line graph showing marks trend |
| **Local Storage** | Student ID saved for easy re-access |

### Instructor Features
| Feature | Details |
|---------|---------|
| **Search Students** | Find submissions by Student ID |
| **Evaluate Work** | Assign marks (0-100) and provide feedback |
| **Track Progress** | View which assignments are evaluated/pending |
| **Analytics** | Per-student performance metrics |
| **Trends** | Visual performance graphs over assignments |

---

## 🔧 API Endpoints

### Base URL: `http://localhost:3000/api`

### **SUBMISSION ENDPOINTS**

#### POST - Submit Assignment
```
POST /submit
Content-Type: multipart/form-data

Fields:
- name (text)
- studentId (text, required)
- email (email)
- assignmentTitle (text)
- file (file, PDF/DOCX max 10MB)

Success Response (201):
{
  "message": "Assignment submitted successfully",
  "data": { submission object }
}
```

#### GET - Fetch Submissions
```
GET /submissions/:studentId

Success Response (200):
{
  "count": 3,
  "data": [ submission objects ]
}
```

### **GRADE/EVALUATION ENDPOINTS**

#### POST - Submit Evaluation
```
POST /grade/:submissionId
Content-Type: application/json

Body:
{
  "marks": 85,
  "feedback": "Great work! Keep improving..."
}

Success Response:
{
  "message": "Grade saved successfully",
  "data": { grade object }
}
```

#### GET - Get Student Grades
```
GET /grade/:studentId

Success Response (200):
[
  {
    "submissionId": "...",
    "marks": 85,
    "feedback": "...",
    "evaluatedAt": "2026-03-26T..."
  }
]
```

### **ANALYTICS ENDPOINTS**

#### GET - Student Analytics
```
GET /analytics/:studentId

Success Response (200):
{
  "studentId": "STU001",
  "totalAssignments": 3,
  "gradedCount": 2,
  "average": 82.5,
  "results": [
    {
      "assignmentTitle": "Assignment 1",
      "status": "evaluated",
      "marks": 85,
      "feedback": "Good work"
    }
  ]
}
```

---

## 🎨 Design & UI Features

### Color Scheme
- **Navbar**: Dark Navy (`#0f172a`)
- **Background**: Light Gray (`#f1f5f9`)
- **Primary**: Blue (`#2563eb`)
- **Accents**: Green (success), Red (error), Yellow (warning)

### Layout Components
- **Responsive Grid**: Works on desktop, tablet, mobile
- **Split Layout**: 50-50 form/preview on submission & evaluation
- **Status Badges**: Color-coded (green=evaluated, yellow=pending)
- **Alert Messages**: Success/Error/Info notifications
- **Stats Boxes**: Key metrics visualization
- **Charts**: Chart.js line graphs for trends

---

## ✅ Validation & Error Handling

### File Upload Validation
```javascript
✓ File type: Only PDF/DOCX allowed
✓ File size: Maximum 10MB
✓ Required: Must have a file selected
```

### Form Validation
```javascript
✓ All required fields must be filled
✓ Valid email format
✓ Student ID must be provided
✓ Marks must be 0-100 for evaluation
```

### Error Messages
- Clear, user-friendly error notifications
- Network error handling
- API response error messages
- Validation feedback

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Server won't start | Check if port 3000 is in use; change PORT in .env |
| MongoDB connection fails | Verify MONGODB_URI in .env; check Atlas IP whitelist |
| File upload not working | Ensure `/backend/uploads` directory exists |
| Cannot access localhost:3000 | Server may not have started; check console for errors |
| File size error | Files must be < 10MB; only PDF/DOCX allowed |

---

## 📊 Project Statistics

- **Frontend Files**: 14 HTML/CSS/JS files
- **Backend Routes**: 3 route modules (submissions, grades, analytics)
- **Database Collections**: 3 (Submissions, Grades, Assignments)
- **API Endpoints**: 7+ fully functional endpoints
- **Responsive Breakpoints**: Mobile, tablet, desktop

---

## 📧 Support

For issues:
1. Check the Troubleshooting section
2. Review API endpoint documentation
3. Check browser console for errors
4. Open an issue in the repository

---

## 📄 License

This project is available under the **MIT License**.

---

## 🎉 Implementation Complete!

All features have been successfully implemented and integrated. The system is ready for:
- ✅ Student submissions and tracking
- ✅ Instructor evaluation and feedback
- ✅ Performance analytics and visualization
- ✅ File management and storage
- ✅ Full-stack deployment 

---


