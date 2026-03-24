const express = require('express');
const router = express.Router();

const Grade = require('../models/Grade');
const Submission = require('../models/Submission');

// POST /api/grade/:submissionId
router.post('/grade/:submissionId', async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { marks, feedback } = req.body;

    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    const existing = await Grade.findOne({ submissionId });
    if (existing) {
      return res.status(400).json({ message: "Already graded" });
    }

    const grade = new Grade({
      submissionId,
      studentId: submission.studentId,
      marks,
      feedback
    });

    await grade.save();

    res.json({
      message: "Grade saved successfully",
      data: grade
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;