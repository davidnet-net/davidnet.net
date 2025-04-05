import { get_session_information } from "./Scripts/Session.js";

window.addEventListener("scroll", function() {
    let scrollMessage = document.getElementById("scrollMessage");
    if (window.scrollY > 100) {
        scrollMessage.classList.add("hidden");
    } else {
        scrollMessage.classList.remove("hidden");
    }
});

document.addEventListener("DOMContentLoaded", async function() {
    const sessioninfo = await get_session_information();
    console.log(sessioninfo);
});