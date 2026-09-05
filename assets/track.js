const statusLabels = {
  pending: "Pending",
  under_review: "Under Review",
  interview: "Interview",
  approved: "Approved",
  rejected: "Rejected",
};

document.getElementById("track-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const statusEl = document.getElementById("track-status");
  const resultEl = document.getElementById("track-result");
  const number = document.getElementById("app_number").value.trim();

  statusEl.textContent = "";
  statusEl.className = "form-status";
  resultEl.style.display = "none";

  if (!number) return;

  statusEl.textContent = "Checking...";

  try {
    const { data, error } = await supabaseClient.rpc("track_application", { p_number: number });
    if (error) throw error;

    if (!data || data.length === 0) {
      statusEl.textContent = "No application found with that number. Please check and try again.";
      statusEl.className = "form-status error";
      return;
    }

    const app = data[0];
    statusEl.textContent = "";
    document.getElementById("r-number").textContent = app.application_number;
    document.getElementById("r-category").textContent = app.category.replace("_", " ");
    document.getElementById("r-name").textContent = app.full_name;
    document.getElementById("r-date").textContent = new Date(app.created_at).toLocaleDateString();

    const badge = document.createElement("span");
    badge.className = "status-badge status-" + app.status;
    badge.textContent = statusLabels[app.status] || app.status;
    const statusCell = document.getElementById("r-status");
    statusCell.innerHTML = "";
    statusCell.appendChild(badge);

    resultEl.style.display = "block";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Something went wrong. Please try again later.";
    statusEl.className = "form-status error";
  }
});
