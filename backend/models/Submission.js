const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  assignmentTitle: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['submitted', 'evaluated'],
    default: 'submitted'
  }
});

module.exports = mongoose.model('Submission', submissionSchema);
