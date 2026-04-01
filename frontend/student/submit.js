const API_BASE = 'http://localhost:3000/api';

// Store selected file
let selectedFile = null;

// File upload handling
document.getElementById('fileInput').addEventListener('change', (e) => {
  selectedFile = e.target.files[0];
  
  if (selectedFile) {
    const fileInfo = document.getElementById('fileInfo');
    document.getElementById('fileName').textContent = selectedFile.name;
    document.getElementById('fileSize').textContent = `Size: ${(selectedFile.size / 1024).toFixed(2)} KB`;
    fileInfo.style.display = 'block';
  }
});

// Drag & drop
const fileUploadBox = document.getElementById('fileUploadBox');

fileUploadBox.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileUploadBox.style.background = '#eff6ff';
  fileUploadBox.style.borderColor = '#2563eb';
});

fileUploadBox.addEventListener('dragleave', () => {
  fileUploadBox.style.background = '#f8fafc';
  fileUploadBox.style.borderColor = '#cbd5e1';
});

fileUploadBox.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    document.getElementById('fileInput').files = files;
    const event = new Event('change', { bubbles: true });
    document.getElementById('fileInput').dispatchEvent(event);
  }
  fileUploadBox.style.background = '#f8fafc';
  fileUploadBox.style.borderColor = '#cbd5e1';
});

// Form submission
document.getElementById('submitForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const studentId = document.getElementById('studentId').value;
  const email = document.getElementById('email').value;
  const title = document.getElementById('title').value;

  // Validate file
  if (!selectedFile) {
    showMessage('Please select a file to upload', 'error');
    return;
  }

  // Validate file type
  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowedTypes.includes(selectedFile.type)) {
    showMessage('Only PDF and DOCX files are allowed', 'error');
    return;
  }

  // Validate file size (10MB max)
  if (selectedFile.size > 10 * 1024 * 1024) {
    showMessage('File size must be less than 10MB', 'error');
    return;
  }

  try {
    // Send data to backend
    const formData = new FormData();
    formData.append('name', name);
    formData.append('studentId', studentId);
    formData.append('email', email);
    formData.append('assignmentTitle', title);
    formData.append('file', selectedFile);

    const response = await fetch(`${API_BASE}/submit`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      showMessage('✅ Assignment submitted successfully!', 'success');
      
      // Store student ID in localStorage
      localStorage.setItem('studentId', studentId);
      
      // Reset form
      document.getElementById('submitForm').reset();
      selectedFile = null;
      document.getElementById('fileInfo').style.display = 'none';

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 2000);
    } else {
      showMessage(`Error: ${data.message}`, 'error');
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

// Load student ID if exists
window.addEventListener('load', () => {
  const storedId = localStorage.getItem('studentId');
  if (storedId) {
    document.getElementById('studentId').value = storedId;
  }
});
