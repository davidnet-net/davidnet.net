document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});

window.addEventListener("scroll", function() {
    let scrollMessage = document.getElementById("scrollMessage");
    if (window.scrollY > 100) {
        scrollMessage.classList.add("hidden");
    } else {
        scrollMessage.classList.remove("hidden");
    }
});
