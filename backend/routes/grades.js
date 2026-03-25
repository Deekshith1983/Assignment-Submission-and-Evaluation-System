const express = require('express');
const router = express.Router();

const Grade = require('../models/Grade');
const Submission = require('../models/Submission');


// ============================================
// ✅ 1. GET submissions for grading (NEW API)
// ============================================
router.get('/grade/submissions/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    const submissions = await Submission.find({ studentId });

    if (!submissions.length) {
      return res.status(404).json({
        message: "No submissions found for this student"
      });
    }

    // Send only useful info for instructor
    const formatted = submissions.map(sub => ({
      submissionId: sub._id,
      assignmentTitle: sub.assignmentTitle,
      status: sub.status,
      uploadedAt: sub.uploadedAt
    }));

    res.status(200).json({
      count: formatted.length,
      submissions: formatted
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});


// ============================================
// ✅ 2. POST grade using submissionId
// ============================================
router.post('/grade/:submissionId', async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { marks, feedback } = req.body;

    // 🔹 Validate input
    if (marks === undefined || feedback === undefined) {
      return res.status(400).json({
        message: "Marks and feedback are required"
      });
    }

    // 🔹 Find submission
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found"
      });
    }

    // 🔹 Prevent duplicate grading
    const existing = await Grade.findOne({ submissionId });
    if (existing) {
      return res.status(400).json({
        message: "Already graded"
      });
    }

    // 🔹 Save grade
    const grade = new Grade({
      submissionId,
      studentId: submission.studentId,
      marks,
      feedback
    });

    await grade.save();

    // 🔹 Update submission status
    submission.status = "evaluated";
    await submission.save();

    res.status(200).json({
      message: "Graded successfully",
      grade: {
        id: grade._id,
        marks: grade.marks,
        feedback: grade.feedback
      }
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;