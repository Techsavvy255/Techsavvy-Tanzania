let allApplications = [];

const statusLabels = {
  pending: "Pending",
  under_review: "Under Review",
  interview: "Interview",
  approved: "Approved",
  rejected: "Rejected",
};

// --- Auth guard ---
(async function guard() {
  const { data } = await supabaseClient.auth.getSession();
  if (!data.session) {
    window.location.href = "admin-login.html";
    return;
  }
  loadApplications();
})();

document.getElementById("logout-btn").addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  window.location.href = "admin-login.html";
});

async function loadApplications() {
  const { data, error } = await supabaseClient
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    document.getElementById("app-table-body").innerHTML =
      `<tr><td colspan="6">Error loading applications: ${error.message}</td></tr>`;
    return;
  }

  allApplications = data || [];
  updateStats();
  renderTable();
}

function updateStats() {
  const count = (s) => allApplications.filter((a) => a.status === s).length;
  document.getElementById("stat-total").textContent = allApplications.length;
  document.getElementById("stat-pending").textContent = count("pending");
  document.getElementById("stat-review").textContent = count("under_review");
  document.getElementById("stat-interview").textContent = count("interview");
  document.getElementById("stat-approved").textContent = count("approved");
  document.getElementById("stat-rejected").textContent = count("rejected");
}

function renderTable() {
  const category = document.getElementById("filter-category").value;
  const status = document.getElementById("filter-status").value;
  const search = document.getElementById("filter-search").value.toLowerCase();

  let rows = allApplications.filter((a) => {
    if (category && a.category !== category) return false;
    if (status && a.status !== status) return false;
    if (search && !(a.full_name.toLowerCase().includes(search) || a.email.toLowerCase().includes(search))) return false;
    return true;
  });

  const tbody = document.getElementById("app-table-body");
  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">No applications match your filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map(
      (a) => `
      <tr data-id="${a.id}">
        <td>${a.application_number || "—"}</td>
        <td>${escapeHtml(a.full_name)}</td>
        <td>${a.category.replace("_", " ")}</td>
        <td>${escapeHtml(a.email)}</td>
        <td><span class="status-badge status-${a.status}">${statusLabels[a.status]}</span></td>
        <td>${new Date(a.created_at).toLocaleDateString()}</td>
      </tr>`
    )
    .join("");

  document.querySelectorAll("#app-table-body tr[data-id]").forEach((tr) => {
    tr.addEventListener("click", () => openDetail(tr.dataset.id));
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

["filter-category", "filter-status", "filter-search"].forEach((id) => {
  document.getElementById(id).addEventListener("input", renderTable);
});

function openDetail(id) {
  const app = allApplications.find((a) => a.id === id);
  if (!app) return;

  const detailsHtml = Object.entries(app.details || {})
    .filter(([, v]) => v)
    .map(([k, v]) => `<div class="track-row"><span>${k.replace(/_/g, " ")}</span><span>${escapeHtml(v)}</span></div>`)
    .join("");

  document.getElementById("modal-content").innerHTML = `
    <h2>${escapeHtml(app.full_name)}</h2>
    <p style="color:var(--grey);">${app.application_number} &middot; ${app.category.replace("_", " ")}</p>

    <div class="track-result" style="margin-top:16px;">
      <div class="track-row"><span>Email</span><span>${escapeHtml(app.email)}</span></div>
      <div class="track-row"><span>Phone</span><span>${escapeHtml(app.phone || "—")}</span></div>
      ${detailsHtml}
    </div>

    <div class="field" style="margin-top:20px;">
      <label>Status</label>
      <select id="status-select">
        <option value="pending" ${app.status === "pending" ? "selected" : ""}>Pending</option>
        <option value="under_review" ${app.status === "under_review" ? "selected" : ""}>Under Review</option>
        <option value="interview" ${app.status === "interview" ? "selected" : ""}>Interview</option>
        <option value="approved" ${app.status === "approved" ? "selected" : ""}>Approved</option>
        <option value="rejected" ${app.status === "rejected" ? "selected" : ""}>Rejected</option>
      </select>
    </div>

    <div class="field">
      <label>Internal Notes</label>
      <textarea id="notes-input">${escapeHtml(app.admin_notes || "")}</textarea>
    </div>

    <button class="form-submit" id="save-btn">Save Changes</button>
    <p class="form-status" id="modal-status"></p>
  `;

  document.getElementById("save-btn").addEventListener("click", () => saveChanges(app.id));
  document.getElementById("modal-overlay").classList.add("open");
}

async function saveChanges(id) {
  const status = document.getElementById("status-select").value;
  const notes = document.getElementById("notes-input").value;
  const modalStatus = document.getElementById("modal-status");
  modalStatus.textContent = "Saving...";
  modalStatus.className = "form-status";

  const { error } = await supabaseClient
    .from("applications")
    .update({ status, admin_notes: notes })
    .eq("id", id);

  if (error) {
    modalStatus.textContent = "Error: " + error.message;
    modalStatus.className = "form-status error";
    return;
  }

  modalStatus.textContent = "Saved.";
  modalStatus.className = "form-status success";
  await loadApplications();
  setTimeout(() => document.getElementById("modal-overlay").classList.remove("open"), 600);
}

document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.remove("open");
});
document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target.id === "modal-overlay") e.target.classList.remove("open");
});
