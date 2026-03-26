const express = require("express");
const router = express.Router();
const path = require('path');
const Submission = require("../models/Submission");
const upload = require("../middleware/upload");

// ✅ POST /api/submit - Submit assignment with file upload
router.post("/submit", upload.single('file'), async (req, res) => {
    try {
        const { name, studentId, email, assignmentTitle } = req.body;

        // Validate required fields
        if (!name || !studentId || !email || !assignmentTitle) {
            return res.status(400).json({
                message: "All fields are required (name, studentId, email, assignmentTitle)"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "File is required"
            });
        }

        // Create submission
        const submission = new Submission({
            name,
            studentId,
            email,
            assignmentTitle,
            file: req.file.filename,
            fileUrl: `/uploads/${req.file.filename}`,
            uploadedAt: new Date()
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

// ✅ GET /api/submissions/:studentId - Fetch submissions by student ID
router.get("/submissions/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;

        if (!studentId) {
            return res.status(400).json({
                message: "Student ID is required"
            });
        }

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