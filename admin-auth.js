// If already logged in, go straight to dashboard
(async function checkSession() {
  const { data } = await supabaseClient.auth.getSession();
  if (data.session) window.location.href = "admin.html";
})();

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const statusEl = document.getElementById("login-status");
  statusEl.textContent = "Logging in...";
  statusEl.className = "form-status";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    statusEl.textContent = "Login failed: " + error.message;
    statusEl.className = "form-status error";
    return;
  }

  window.location.href = "admin.html";
});
