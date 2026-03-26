const API_BASE = 'http://localhost:3000/api';

async function fetchAssignments() {
  const studentId = document.getElementById('studentId').value;

  if (!studentId.trim()) {
    showMessage('Please enter a Student ID', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/submissions/${studentId}`);
    const data = await response.json();

    if (response.ok && data.data && data.data.length > 0) {
      populateTable(data.data, studentId);
      showMessage('✅ Assignments loaded successfully', 'success');
    } else if (response.ok && data.data && data.data.length === 0) {
      document.getElementById('assignmentTableBody').innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; padding: 30px; color: #64748b;">No assignments found for this Student ID</td>
        </tr>
      `;
      showMessage('No assignments found', 'info');
    } else {
      showMessage(`Error: ${data.message || 'Failed to load assignments'}`, 'error');
    }
  } catch (error) {
    showMessage(`Network error: ${error.message}`, 'error');
    console.error('Error:', error);
  }
}

function populateTable(submissions, studentId) {
  const tbody = document.getElementById('assignmentTableBody');
  tbody.innerHTML = '';

  submissions.forEach((sub) => {
    const date = new Date(sub.uploadedAt).toLocaleDateString();
    const statusBadge = sub.status === 'evaluated' 
      ? '<span class="badge badge-success">Evaluated</span>' 
      : '<span class="badge badge-pending">Pending</span>';

    const row = `
      <tr>
        <td>${sub.assignmentTitle}</td>
        <td>${date}</td>
        <td>${statusBadge}</td>
        <td>
          <button class="btn" style="padding: 6px 12px; font-size: 12px;" onclick="goToEvaluate('${sub._id}', '${studentId}')">Evaluate</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function goToEvaluate(submissionId, studentId) {
  localStorage.setItem('evaluateSubmissionId', submissionId);
  localStorage.setItem('evaluateStudentId', studentId);
  window.location.href = `evaluate.html?submissionId=${submissionId}&studentId=${studentId}`;
}

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
  } else if (type === 'info') {
    messageDiv.className = 'alert alert-info';
  }
}
