let chart;

async function fetchAnalytics() {
  const id = document.getElementById("studentId").value;

  const res = await fetch(`http://localhost:3000/api/analytics/${id}`);
  const data = await res.json();

  document.getElementById("avg").innerText = data.average || 0;

  // TABLE FIX
  const table = document.querySelector("#resultTable tbody");
  table.innerHTML = "";

  const results = data.results || [];

  results.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.assignmentTitle}</td>
        <td>${item.marks ?? "Not graded"}</td>
        <td>${item.feedback}</td>
      </tr>
    `;
  });

  // CHART
  const scores = results.map(r => r.marks || 0);

  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: scores.map((_, i) => `A${i+1}`),
      datasets: [{
        label: "Performance",
        data: scores,
        borderWidth: 2
      }]
    }
  });
}
