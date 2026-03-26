const API_BASE = 'http://localhost:3000/api';

async function loadSubmissions() {
  const studentId = document.getElementById('studentIdInput').value;

  if (!studentId.trim()) {
    showMessage('Please enter your Student ID', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/submissions/${studentId}`);
    const data = await response.json();

    if (response.ok && data.data && data.data.length > 0) {
      populateTable(data.data);
      showMessage('✅ Submissions loaded successfully', 'success');
      localStorage.setItem('studentId', studentId);
    } else if (response.ok && data.data && data.data.length === 0) {
      document.getElementById('submissionTableBody').innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; padding: 30px; color: #64748b;">No submissions found for this Student ID</td>
        </tr>
      `;
      showMessage('No submissions found', 'info');
    } else {
      showMessage(`Error: ${data.message || 'Failed to load submissions'}`, 'error');
      document.getElementById('submissionTableBody').innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; padding: 30px; color: #64748b;">No submissions found</td>
        </tr>
      `;
    }
  } catch (error) {
    showMessage(`Network error: ${error.message}`, 'error');
    console.error('Error:', error);
  }
}

function populateTable(submissions) {
  const tbody = document.getElementById('submissionTableBody');
  tbody.innerHTML = '';

  submissions.forEach((sub) => {
    const date = new Date(sub.uploadedAt).toLocaleDateString();
    const statusBadge = sub.status === 'evaluated' 
      ? '<span class="badge badge-success">Evaluated</span>' 
      : '<span class="badge badge-pending">Submitted</span>';

    const row = `
      <tr>
        <td>${sub.assignmentTitle}</td>
        <td>${date}</td>
        <td>${statusBadge}</td>
        <td>
          ${sub.fileUrl ? `<a href="${sub.fileUrl}" class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" target="_blank">Download</a>` : 'N/A'}
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
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

// Load student ID if exists
window.addEventListener('load', () => {
  const storedId = localStorage.getItem('studentId');
  if (storedId) {
    document.getElementById('studentIdInput').value = storedId;
    loadSubmissions();
  }
});
