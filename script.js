// ========================================
// TECHSAVVY TANZANIA
// WEBSITE JAVASCRIPT
// ========================================


// ================================
// MOBILE MENU
// ================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active");
});


// ================================
// CLOSE MENU AFTER CLICKING LINK
// ================================

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("active");
    });
});


// ================================
// NAVBAR SCROLL EFFECT
// ================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 5px 25px rgba(0,0,0,0.08)";
    } else {
        navbar.style.boxShadow = "none";
    }
});


// ================================
// SCROLL REVEAL - IMPROVED
// ================================

const revealElements = document.querySelectorAll(
    ".section, .program-card, .course-card, .project-card, .article-card"
);

const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

revealElements.forEach(function (element) {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
});


// ================================
// MODAL - CARD DETAILS
// ================================

// Create modal if it doesn't exist
function createModal() {
    if (document.getElementById("cardModal")) return;
    
    const modal = document.createElement("div");
    modal.id = "cardModal";
    modal.className = "card-modal";
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <div id="modalImage" class="modal-image"></div>
                <div class="modal-info">
                    <h2 id="modalTitle">Title</h2>
                    <p id="modalDescription">Description</p>
                    <a id="modalLink" href="#" class="modal-link">Learn More →</a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close button
    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    
    // Click outside to close
    modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
    });
}

function openModal(title, description, image, link) {
    createModal();
    const modal = document.getElementById("cardModal");
    
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalImage").innerHTML = image || title[0];
    
    if (link) {
        document.getElementById("modalLink").href = link;
        document.getElementById("modalLink").style.display = "inline-block";
    } else {
        document.getElementById("modalLink").style.display = "none";
    }
    
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("cardModal");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
});


// ================================
// CARD CLICK HANDLERS
// ================================

// Program Cards
document.querySelectorAll(".program-card").forEach(function (card) {
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
        const h3 = card.querySelector("h3").textContent;
        const p = card.querySelector("p").textContent;
        const link = card.querySelector("a").href;
        openModal(h3, p, "⌁", link);
    });
});

// Course Cards
document.querySelectorAll(".course-card").forEach(function (card) {
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
        const h3 = card.querySelector("h3").textContent;
        const p = card.querySelector("p").textContent;
        const icon = card.querySelector(".course-icon").textContent;
        const link = card.querySelector("a").href;
        openModal(h3, p, `<div class="modal-icon">${icon}</div>`, link);
    });
});

// Project Cards
document.querySelectorAll(".project-card").forEach(function (card) {
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
        const h3 = card.querySelector("h3").textContent;
        const p = card.querySelector("p").textContent;
        const tag = card.querySelector(".project-tag")?.textContent || "PROJECT";
        const link = card.querySelector("a").href;
        openModal(h3, p, `<div class="modal-tag">${tag}</div>`, link);
    });
});

// Article Cards
document.querySelectorAll(".article-card").forEach(function (card) {
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
        const h3 = card.querySelector("h3").textContent;
        const p = card.querySelector("p").textContent;
        const image = card.querySelector(".article-image").innerHTML;
        const link = card.querySelector("a").href;
        openModal(h3, p, `<div class="modal-image">${image}</div>`, link);
    });
});


// ================================
// CURRENT YEAR
// ================================

const year = new Date().getFullYear();
const footer = document.querySelector("footer p");

if (footer) {
    footer.innerHTML = `© ${year} Techsavvy Tanzania. Empowering Youth Through Technology.`;
}


// ================================
// CONSOLE MESSAGE
// ================================

console.log("🚀 Techsavvy Tanzania website loaded successfully.");
