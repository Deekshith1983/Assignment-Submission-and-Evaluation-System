const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");

// ✅ POST /submit
router.post("/submit", async (req, res) => {
    try {
        const { name, studentId, email, assignmentTitle, file } = req.body;

        const submission = new Submission({
            name,
            studentId,
            email,
            assignmentTitle,
            file
        });

        await submission.save();

        res.status(201).json({
            message: "Assignment submitted successfully",
            data: submission
        });

    } catch (error) {
        res.status(500).json({
            message: "Error submitting assignment",
            error: error.message
        });
    }
});

// ✅ GET /submissions/:studentId
router.get("/submissions/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;

        const submissions = await Submission.find({ studentId });

        res.status(200).json({
            count: submissions.length,
            data: submissions
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching submissions",
            error: error.message
        });
    }
});

module.exports = router;