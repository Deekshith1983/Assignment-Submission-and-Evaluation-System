async function submitEvaluation() {
  const id = localStorage.getItem("submissionId");
  const marks = document.getElementById("marks").value;
  const feedback = document.getElementById("feedback").value;

  await fetch(`http://localhost:3000/api/grade/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ marks, feedback })
  });

  alert("Submitted");
}
