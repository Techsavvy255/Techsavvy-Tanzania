```javascript
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

        navbar.style.boxShadow =
            "0 5px 25px rgba(0,0,0,0.08)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


// ================================
// SIMPLE SCROLL REVEAL
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

            }

        });

    },

    {
        threshold: 0.1
    }

);


revealElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});


// ================================
// CURRENT YEAR
// ================================

const year = new Date().getFullYear();

const footer = document.querySelector("footer p");

if (footer) {

    footer.innerHTML =
        `© ${year} Techsavvy Tanzania. Empowering Youth Through Technology.`;

}


// ================================
// CONSOLE MESSAGE
// ================================

console.log(
    "🚀 Techsavvy Tanzania website loaded successfully."
);
```
