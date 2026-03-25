let chartInstance = null;

async function fetchAnalytics() {
  const studentId = document.getElementById("studentId").value;

  const res = await fetch(`http://localhost:3000/api/analytics/${studentId}`);
  const data = await res.json();

  // Update cards
  document.getElementById("avgScore").innerText = data.average || 0;
  document.getElementById("totalAssign").innerText = data.total || 0;

  // Chart data (safe fallback)
  const scores = data.scores || [50, 60, 70]; 

  const ctx = document.getElementById('chart').getContext('2d');

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: scores.map((_, i) => `A${i+1}`),
      datasets: [{
        label: 'Performance',
        data: scores,
        borderWidth: 2,
        tension: 0.3
      }]
    },
    options: {
      responsive: true
    }
  });
}
