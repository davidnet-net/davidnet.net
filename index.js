window.addEventListener("scroll", function() {
    let scrollMessage = document.getElementById("scrollMessage");
    if (window.scrollY > 100) {
        scrollMessage.classList.add("hidden");
    } else {
        scrollMessage.classList.remove("hidden");
    }
});
