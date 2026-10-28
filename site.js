/* Techsavvy Tanzania — shared site script
   - marks the current page in the menu
   - shows Dashboard / Log Out instead of Log In when a member is signed in
   - fills social links from SITE_CONFIG below (the one place to edit)
*/
const SITE_CONFIG = {
  email: "techsavvymanagment@gmail.com",
  // Paste your real links between the quotes. Empty ones are simply not shown.
  social: {
    Instagram: "",
    LinkedIn: "",
    X: "",
    Facebook: "",
    YouTube: "",
    WhatsApp: "",
  },
};

(function () {
  try {
    // Which menu item is this page?
    const file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    let key = "";
    if (file === "about.html") key = "about";
    else if (file === "programs.html") key = "programs";
    else if (file === "courses.html" || file === "course.html") key = "courses";
    else if (file === "projects.html" || file.indexOf("project-") === 0) key = "projects";
    else if (file === "login.html" || file === "register.html" || file === "dashboard.html") key = "account";
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === key);
    });

    // Is a member signed in? (Supabase keeps its session in localStorage.)
    // This only changes what the menu shows. The pages themselves still check the real session.
    let signedIn = false;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (/^sb-.+-auth-token$/.test(k)) {
          const v = JSON.parse(localStorage.getItem(k));
          if (v && (v.refresh_token || v.access_token)) signedIn = true;
        }
      }
    } catch (e) { /* storage blocked: treat as signed out */ }

    if (signedIn) {
      const nav = document.querySelector(".main-nav");
      const cta = nav && nav.querySelector(".nav-cta");
      document.querySelectorAll('[data-auth="login"]').forEach(function (a) {
        if (nav && nav.contains(a)) {
          a.parentNode.removeChild(a); // the menu button becomes "My Dashboard" below
        } else {
          a.textContent = "Dashboard";
          a.setAttribute("href", "dashboard.html");
        }
      });
      if (nav && cta) {
        // A signed-in member is not sent back to "Join Us": the big button becomes their dashboard
        cta.textContent = "My Dashboard";
        cta.setAttribute("href", "dashboard.html");
        const out = document.createElement("a");
        out.setAttribute("href", "login.html?logout=1");
        out.textContent = "Log Out";
        nav.insertBefore(out, cta);
      }
    }

    // Social links (only the ones you filled in, and only real web links)
    const links = Object.keys(SITE_CONFIG.social).filter(function (name) {
      return /^https?:\/\//i.test(SITE_CONFIG.social[name]);
    });
    function fill(box, sep) {
      if (!box || !links.length) return false;
      links.forEach(function (name, i) {
        const a = document.createElement("a");
        a.setAttribute("href", SITE_CONFIG.social[name]);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
        a.textContent = name;
        box.appendChild(a);
        if (sep && i < links.length - 1) box.appendChild(document.createTextNode(" \u00b7 "));
      });
      return true;
    }
    fill(document.getElementById("footer-social"), false);
    const contactBox = document.getElementById("contact-social-links");
    if (fill(contactBox, true)) document.getElementById("contact-social").hidden = false;
  } catch (err) {
    console.warn("site.js:", err);
  }
})();
