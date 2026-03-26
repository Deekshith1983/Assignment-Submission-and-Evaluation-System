const API_BASE = 'http://localhost:3000/api';

let submissionData = null;

async function loadSubmissionDetails() {
  const params = new URLSearchParams(window.location.search);
  const submissionId = params.get('submissionId') || localStorage.getItem('evaluateSubmissionId');
  const studentId = params.get('studentId') || localStorage.getItem('evaluateStudentId');

  if (!submissionId || !studentId) {
    showMessage('Error: No submission ID provided', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/submissions/${studentId}`);
    const data = await response.json();

    if (response.ok && data.data) {
      const submission = data.data.find(sub => sub._id === submissionId);
      
      if (submission) {
        submissionData = submission;
        populateDetails(submission);
      } else {
        showMessage('Submission not found', 'error');
      }
    }
  } catch (error) {
    showMessage(`Error loading submission: ${error.message}`, 'error');
    console.error('Error:', error);
  }
}

function populateDetails(submission) {
  document.getElementById('studentName').textContent = submission.name || 'N/A';
  document.getElementById('studentId').textContent = submission.studentId || 'N/A';
  document.getElementById('assignmentTitle').textContent = submission.assignmentTitle || 'N/A';
  document.getElementById('uploadDate').textContent = new Date(submission.uploadedAt).toLocaleDateString();
  
  if (submission.fileUrl) {
    document.getElementById('fileLink').href = submission.fileUrl;
    document.getElementById('fileLink').style.display = 'inline-block';
  } else {
    document.getElementById('fileLink').style.display = 'none';
  }
}

document.getElementById('evaluateForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!submissionData) {
    showMessage('Error: Submission not loaded', 'error');
    return;
  }

  const marks = parseInt(document.getElementById('marks').value);
  const feedback = document.getElementById('feedback').value;

  // Validate marks
  if (isNaN(marks) || marks < 0 || marks > 100) {
    showMessage('Please enter marks between 0 and 100', 'error');
    return;
  }

  if (!feedback.trim()) {
    showMessage('Please provide feedback', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/grade/${submissionData._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        marks: marks,
        feedback: feedback
      })
    });

    const data = await response.json();

    if (response.ok) {
      showMessage('✅ Evaluation submitted successfully!', 'success');
      
      setTimeout(() => {
        window.location.href = 'view.html';
      }, 2000);
    } else {
      showMessage(`Error: ${data.message || 'Failed to submit evaluation'}`, 'error');
    }
  } catch (error) {
    showMessage(`Network error: ${error.message}`, 'error');
    console.error('Error:', error);
  }
});

function showMessage(message, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.style.padding = '15px';
  messageDiv.style.borderRadius = '8px';
  messageDiv.style.marginBottom = '20px';

  if (type === 'success') {
    messageDiv.className = 'alert alert-success';
  } else if (type === 'error') {
    messageDiv.className = 'alert alert-error';
  }
}

// Load on page load
window.addEventListener('load', loadSubmissionDetails);
