# Assignment Submission and Evaluation System

A web platform where students can submit assignments and instructors can evaluate them with marks and feedback. Built with HTML, CSS, JavaScript, Express, and MongoDB.

---

## 🎯 Project Overview

- **Students** submit assignments using Student ID
- **Instructors** retrieve, evaluate, and provide feedback
- **System** stores and displays results with analytics
- **No authentication** → Student ID acts as identity

---

## 🏗️ Overall Architecture

### 1. Main Dashboard (Landing Page)
- Hero section introducing the project
- Two navigation buttons:
  - **Student** → Redirects to Student Dashboard
  - **Instructor** → Redirects to Instructor Dashboard

---

### 2. 🧑‍🎓 Student Dashboard

**Purpose:** Submit assignments & view results

**Sections:**
- **Submit Assignment**
  - Name
  - Student ID
  - Email
  - Assignment Title
  - File Upload (PDF/DOCX)
  - Save to database

- **View Submitted Assignments**
  - Shows all submissions using Student ID
  - Displays assignment title, upload date, status

- **View Results**
  - Displays marks and feedback
  - Shows average score across all assignments

---

### 3. 👨‍🏫 Instructor Dashboard

**Purpose:** Evaluate student work

**Sections:**
- **View Assignments**
  - Enter Student ID to retrieve all submissions
  - Display list of submitted assignments

- **Evaluate Assignments**
  - Provide marks (0-100)
  - Write feedback
  - Save to database

- **Analytics View**
  - View student performance
  - Display average scores
  - Optional: Performance charts/trends

---

---

## 📁 Project Structure

```
project-root/
├── frontend/
│   ├── index.html                 (Landing page)
│   ├── student/
│   │   ├── dashboard.html
│   │   ├── submit.js
│   │   └── results.js
│   ├── instructor/
│   │   ├── dashboard.html
│   │   ├── evaluate.js
│   │   └── analytics.js
│   ├── css/
│   │   └── styles.css
│   └── assets/
├── backend/
│   ├── server.js                  (Express setup)
│   ├── config/
│   │   └── db.js                  (MongoDB connection)
│   ├── models/
│   │   ├── Submission.js
│   │   ├── Grade.js
│   │   └── Assignment.js
│   ├── routes/
│   │   ├── submissions.js
│   │   ├── grades.js
│   │   └── analytics.js
│   ├── middleware/
│   │   └── upload.js              (File handling)
│   ├── uploads/                   (File storage)
│   └── package.json
├── Readme.md
└── .gitignore
```


## 📝 Features

✅ Student assignment submission with file upload  
✅ Instructor evaluation and feedback system  
✅ Student performance analytics  
✅ Average score calculation  
✅ PDF/DOCX file support  
✅ Responsive web interface  
✅ RESTful API architecture  

---

## 🔧 Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **File Storage:** Local `/uploads` folder
- **Architecture:** REST API, 

---


