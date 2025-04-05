import { get_session_information } from "https://davidnet.net/Scripts/Session.js";
d
ocument.addEventListener("DOMContentLoaded", async () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Load profile picture
    const sessioninfo = await get_session_information();
    console.log(sessioninfo);

    if (sessioninfo) {
        try {
            const response = await fetch("https://auth.davidnet.net/get_profile_picture", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: sessioninfo.userid }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                const profilepicture = result.profile_picture;
                const usericon = document.getElementById("usericon");
                usericon.src = profilepicture;
            } else {
    
                console.error("usericon collection failed:", result.error);
            }
        } catch (error) {
            console.error("Error during usericon collection:", error);
        }
    }
});