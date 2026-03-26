const API_BASE = 'http://localhost:3000/api';
let performanceChart = null;

async function loadResults() {
  const studentId = document.getElementById('studentIdInput').value;

  if (!studentId.trim()) {
    showMessage('Please enter your Student ID', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/analytics/${studentId}`);
    const data = await response.json();

    if (response.ok) {
      // Update stats
      document.getElementById('totalAssignments').textContent = data.totalAssignments || 0;
      document.getElementById('evaluatedCount').textContent = data.gradedCount || 0;
      document.getElementById('averageScore').textContent = Math.round(data.average) || 0;

      // Populate table
      populateResultsTable(data.results);

      // Draw chart
      drawPerformanceChart(data.results);

      showMessage('✅ Results loaded successfully', 'success');
      localStorage.setItem('studentId', studentId);
    } else {
      showMessage(`Error: ${data.message || 'Failed to load results'}`, 'error');
    }
  } catch (error) {
    showMessage(`Network error: ${error.message}`, 'error');
    console.error('Error:', error);
  }
}

function populateResultsTable(results) {
  const tbody = document.getElementById('resultsTableBody');
  tbody.innerHTML = '';

  if (!results || results.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align: center; padding: 30px; color: #64748b;">No results available yet</td>
      </tr>
    `;
    return;
  }

  results.forEach((result) => {
    const marksDisplay = result.marks !== null && result.marks !== undefined ? result.marks : '⏳ Pending';
    const row = `
      <tr>
        <td>${result.assignmentTitle}</td>
        <td>${marksDisplay}</td>
        <td>${result.feedback || 'No feedback yet'}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function drawPerformanceChart(results) {
  if (!results || results.length === 0) return;

  const ctx = document.getElementById('performanceChart').getContext('2d');
  
  const marks = results.map(r => r.marks !== null ? r.marks : 0);
  const labels = results.map((r, i) => `${r.assignmentTitle.substring(0, 15)}...`);

  if (performanceChart) {
    performanceChart.destroy();
  }

  performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Your Marks',
        data: marks,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20
          }
        }
      }
    }
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

// Load student ID if exists and load results
window.addEventListener('load', () => {
  const storedId = localStorage.getItem('studentId');
  if (storedId) {
    document.getElementById('studentIdInput').value = storedId;
    loadResults();
  }
});
