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
│   ├── index.html                
│   ├── css/
│   │   └── styles.css            
│   ├── student/
│   │   ├── dashboard.html        
│   │   ├── submit.html           
│   │   ├── submit.js             
│   │   ├── submissions.html     
│   │   ├── submissions.js       
│   │   ├── results.html          
│   │   └── results.js          
│   │
│   └── instructor/
│       ├── dashboard.html         
│       ├── view.html              
│       ├── view.js                
│       ├── evaluate.html          
│       ├── evaluate.js            
│       ├── analytics.html         
│       └── analytics.js           
│
├── backend/
│   ├── server.js                 
│   ├── package.json              
│   ├── .env                      
│   │
│   ├── config/
│   │   └── db.js                 
│   │
│   ├── models/
│   │   ├── Submission.js         
│   │   ├── Grade.js              
│   │   └── Assignment.js         
│   │
│   ├── routes/
│   │   ├── submissions.js         
│   │   ├── grades.js              
│   │   └── analytics.js           
│   │
│   ├── middleware/
│   │   └── upload.js              
│   │
│   └── uploads/                   
│
├── .gitignore                     
├── Readme.md                       
└── .git/                        

```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (MongoDB Atlas - Cloud recommended)
- **npm** 
- **Git**

### Installation Steps

#### 1. Clone Repository
```bash
git clone https://github.com/Deekshith1983/Assignment-Submission-and-Evaluation-System.git
cd Assignment_Submission_and_Evaluation_System
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

#### 3. Start Backend Server
```bash
npm start
```
**Output:** `🚀 Server running on http://localhost:3000`

#### 4. Access Application
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

## 🎉 Implementation Complete!

All features have been successfully implemented and integrated. The system is ready for:
- ✅ Student submissions and tracking
- ✅ Instructor evaluation and feedback
- ✅ Performance analytics and visualization
- ✅ File management and storage
- ✅ Full-stack deployment 

---


