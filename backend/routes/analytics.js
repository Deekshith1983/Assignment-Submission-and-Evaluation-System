const express = require('express');
const router = express.Router();

const Grade = require('../models/Grade');
const Submission = require('../models/Submission');

// GET /api/analytics/:studentId
router.get('/analytics/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    const grades = await Grade.find({ studentId });

    let total = 0;
    grades.forEach(g => total += g.marks);

    const average = grades.length ? (total / grades.length) : 0;

    const submissions = await Submission.find({ studentId });

    const results = submissions.map(sub => {
      const grade = grades.find(
        g => g.submissionId.toString() === sub._id.toString()
      );

      return {
        assignmentTitle: sub.assignmentTitle,
        status: sub.status || "pending",
        marks: grade ? grade.marks : null,
        feedback: grade ? grade.feedback : "Not graded"
      };
    });

    res.status(200).json({
      studentId,
      totalAssignments: submissions.length,
      gradedCount: grades.length,
      average,
      results
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;