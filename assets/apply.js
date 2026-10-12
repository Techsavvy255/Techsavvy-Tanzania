// Techsavvy Tanzania — Application form logic

const categoryFieldMap = {
  learner: [
    ["learner_interest", "interest"],
    ["learner_goals", "goals"],
    ["learner_availability", "availability"],
  ],
  team_member: [
    ["team_skills", "skills"],
    ["team_experience", "experience"],
    ["team_portfolio", "portfolio"],
    ["team_availability", "availability"],
    ["team_motivation", "motivation"],
  ],
  volunteer: [
    ["vol_interests", "interests"],
    ["vol_skills", "skills"],
    ["vol_availability", "availability"],
    ["vol_motivation", "motivation"],
  ],
  mentor: [
    ["mentor_expertise", "expertise"],
    ["mentor_experience", "experience"],
    ["mentor_areas", "mentorship_areas"],
    ["mentor_availability", "availability"],
    ["mentor_profile", "profile_link"],
  ],
  partner: [
    ["partner_org", "organization"],
    ["partner_contact", "contact_person"],
    ["partner_interest", "interest"],
    ["partner_details", "proposal"],
  ],
  sponsor: [
    ["sponsor_org", "organization"],
    ["sponsor_interest", "interest"],
    ["sponsor_budget", "budget_range"],
    ["sponsor_contact", "contact_details"],
  ],
};

let selectedCategory = null;

document.querySelectorAll(".category-pick").forEach((el) => {
  el.addEventListener("click", () => {
    document.querySelectorAll(".category-pick").forEach((c) => c.classList.remove("active"));
    el.classList.add("active");
    selectedCategory = el.dataset.category;
    document.getElementById("category").value = selectedCategory;

    document.querySelectorAll(".category-fields").forEach((f) => f.classList.remove("active"));
    document.querySelector(`.category-fields[data-for="${selectedCategory}"]`).classList.add("active");

    document.getElementById("apply-form").style.display = "block";
    document.getElementById("apply-form").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const form = document.getElementById("apply-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "";
  statusEl.className = "form-status";

  if (!selectedCategory) {
    statusEl.textContent = "Please choose a category above.";
    statusEl.className = "form-status error";
    return;
  }

  const fullName = document.getElementById("full_name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!fullName || !email) {
    statusEl.textContent = "Please fill in your name and email.";
    statusEl.className = "form-status error";
    return;
  }

  const details = {};
  (categoryFieldMap[selectedCategory] || []).forEach(([fieldId, key]) => {
    const el = document.getElementById(fieldId);
    if (el) details[key] = el.value.trim();
  });

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    // Submit through the secure database function (returns the Application Number)
    const { data: applicationNumber, error } = await supabaseClient.rpc("submit_application", {
      p_category: selectedCategory,
      p_full_name: fullName,
      p_email: email,
      p_phone: phone || null,
      p_details: details,
    });

    if (error) throw error;

    document.getElementById("category-step").style.display = "none";
    form.style.display = "none";
    document.getElementById("app-number-display").textContent = applicationNumber;
    document.getElementById("confirm-step").style.display = "block";
    document.getElementById("confirm-step").scrollIntoView({ behavior: "smooth" });

    // Fire-and-forget confirmation email (don't block the user if this fails)
    supabaseClient.functions
      .invoke("send-confirmation-email", {
        body: {
          email: email,
          full_name: fullName,
          application_number: applicationNumber,
          category: selectedCategory,
        },
      })
      .catch((err) => console.warn("Confirmation email failed to send:", err));
  } catch (err) {
    console.error(err);
    const reason = err && err.message ? " (Technical details: " + err.message + ")" : "";
    statusEl.textContent =
      "Something went wrong submitting your application. Please try again, or email us directly at techsavvymanagment@gmail.com." +
      reason;
    statusEl.className = "form-status error";
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Application";
  }
});
