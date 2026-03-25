const express = require('express');
const router = express.Router();

const Grade = require('../models/Grade');
const Submission = require('../models/Submission');

// POST /api/grade/:submissionId
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

    // 🔹 Step 1: Find submission
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found - cannot grade"
      });
    }

    // 🔹 Step 2: Prevent duplicate grading
    const existing = await Grade.findOne({ submissionId });
    if (existing) {
      return res.status(400).json({
        message: "This submission is already graded"
      });
    }

    // 🔹 Step 3: Save grade
    const grade = new Grade({
      submissionId,
      studentId: submission.studentId,
      marks,
      feedback
    });

    await grade.save();

    // 🔹 Step 4: Update submission status
    submission.status = "evaluated";
    await submission.save();

    // 🔹 Step 5: Send response (IMPORTANT FIX)
    res.status(200).json({
      message: "Graded successfully",
      submission: {
        id: submission._id,
        studentId: submission.studentId,
        name: submission.name,
        assignmentTitle: submission.assignmentTitle,
        file: submission.file,
        fileUrl: submission.fileUrl,
        status: submission.status,
        uploadedAt: submission.uploadedAt
      },
      grade: {
        id: grade._id,
        marks: grade.marks,
        feedback: grade.feedback,
        evaluatedAt: grade.evaluatedAt
      }
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;