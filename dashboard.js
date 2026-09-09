const statusLabels = {
  pending: "Pending",
  under_review: "Under Review",
  interview: "Interview",
  approved: "Approved",
  rejected: "Rejected",
};

(async function init() {
  const { data: sessionData } = await supabaseClient.auth.getSession();
  if (!sessionData.session) {
    window.location.href = "login.html";
    return;
  }

  const user = sessionData.session.user;
  const fullName = user.user_metadata?.full_name || "there";

  document.getElementById("welcome-heading").textContent = `Welcome, ${fullName}`;
  document.getElementById("welcome-email").textContent = user.email;

  loadMyApplications();
})();

async function loadMyApplications() {
  const container = document.getElementById("my-applications");

  const { data, error } = await supabaseClient
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    container.innerHTML = `<p style="color:#C4291C;">Could not load applications: ${error.message}</p>`;
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = `<p style="color:var(--grey);">You haven't submitted any applications yet.</p>`;
    return;
  }

  container.innerHTML = `
    <div class="track-result">
      ${data
        .map(
          (a) => `
        <div class="track-row">
          <span>${a.application_number} &middot; ${a.category.replace("_", " ")}</span>
          <span class="status-badge status-${a.status}">${statusLabels[a.status]}</span>
        </div>`
        )
        .join("")}
    </div>
  `;
}

document.getElementById("logout-btn").addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  window.location.href = "index.html";
});
