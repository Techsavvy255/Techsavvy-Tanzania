document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const statusEl = document.getElementById("register-status");
  statusEl.textContent = "Creating your account...";
  statusEl.className = "form-status";

  const full_name = document.getElementById("full_name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { full_name } },
  });

  if (error) {
    statusEl.textContent = "Error: " + error.message;
    statusEl.className = "form-status error";
    return;
  }

  if (data.session) {
    // Email confirmation is OFF in project settings — logged in immediately
    window.location.href = "dashboard.html";
  } else {
    // Email confirmation is ON — user must confirm before logging in
    statusEl.textContent = "Account created! Please check your email to confirm your account before logging in.";
    statusEl.className = "form-status success";
  }
});
