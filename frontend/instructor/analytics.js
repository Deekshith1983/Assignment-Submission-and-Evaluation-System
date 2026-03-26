let chart;
const API_BASE = 'http://localhost:3000/api';

async function fetchAnalytics() {
  const studentId = document.getElementById("studentId").value;

  if (!studentId.trim()) {
    showMessage('Please enter a Student ID', 'error');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/analytics/${studentId}`);
    const data = await res.json();

    if (!res.ok) {
      showMessage(`Error: ${data.message || 'Failed to load analytics'}`, 'error');
      return;
    }

    // Update stats
    document.getElementById("totalCount").textContent = data.totalAssignments || 0;
    document.getElementById("evaluatedCount").textContent = data.gradedCount || 0;
    document.getElementById("avg").textContent = Math.round(data.average) || 0;

    // Populate table
    const table = document.querySelector("#resultTable tbody");
    table.innerHTML = "";

    const results = data.results || [];

    if (results.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="3" style="text-align: center; padding: 30px; color: #64748b;">No results found for this student</td>
        </tr>
      `;
      showMessage('No data available for this student', 'info');
      return;
    }

    results.forEach(item => {
      const marksDisplay = item.marks !== null && item.marks !== undefined ? item.marks : '⏳ Pending';
      table.innerHTML += `
        <tr>
          <td>${item.assignmentTitle}</td>
          <td>${marksDisplay}</td>
          <td>${item.feedback || 'No feedback'}</td>
        </tr>
      `;
    });

    // Draw chart
    const scores = results.map(r => r.marks !== null ? r.marks : 0);
    const labels = results.map(r => r.assignmentTitle.substring(0, 15));

    const ctx = document.getElementById("chart").getContext('2d');

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Student Marks",
          data: scores,
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

    showMessage('✅ Analytics loaded successfully', 'success');
  } catch (error) {
    showMessage(`Network error: ${error.message}`, 'error');
    console.error('Error:', error);
  }
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
