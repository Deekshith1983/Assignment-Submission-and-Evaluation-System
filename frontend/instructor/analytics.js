let selectedId = null;

// Load everything
async function loadAllData() {
  await fetchAssignments();
  await fetchAnalytics(); // from analytics.js
}

// Fetch assignments
async function fetchAssignments() {
  const studentId = document.getElementById("studentId").value;

  const res = await fetch(`http://localhost:5000/submissions/${studentId}`);
  const data = await res.json();

  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  data.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.title || item.assignmentTitle}</td>
        <td>${item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</td>
        <td>
          <button onclick="select('${item._id}')">Evaluate</button>
        </td>
      </tr>
    `;
  });
}

// Select assignment
function select(id) {
  selectedId = id;
  alert("Assignment selected");
}

// Submit evaluation
async function submitEvaluation() {
  const marks = document.getElementById("marks").value;
  const feedback = document.getElementById("feedback").value;

  if (!selectedId) {
    alert("Select assignment first");
    return;
  }

  await fetch(`http://localhost:5000/grade/${selectedId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ marks, feedback })
  });

  alert("Evaluation submitted!");
}
