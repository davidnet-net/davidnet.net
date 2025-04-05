export async function is_session_valid() {
    const session_token = await get_session_token();
    const requestData = {
        token: session_token,
    };

    // Make the POST request
    const response = await fetch("https://auth.davidnet.net/get_session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    });

    if (response.ok) {
        console.log("Session valid!");
        return true;
    } else {
        console.log("Session invalid");
        console.debug("Response:", response);
        return false;
    }
}

export async function get_session_information() {
    const session_token = await get_session_token();
    const requestData = {
        token: session_token,
    };

    // Make the POST request
    const response = await fetch("https://auth.davidnet.net/get_session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    });
    const result = await response.json();

    if (response.ok) {
        const id = result.id;
        const userid = result.userid;
        const ip = result.ip;
        const created_at = result.created_at;
        const useragent = result.useragent;

        const session_info = {
            id: id,
            userid: userid,
            ip: ip,
            created_at,
            useragent
        };

        return session_info;
    } else {
        return false;
    }
}

export async function get_session_token() {
    const session_token = GetSessionFromCookie();
    localStorage.setItem("session_token", session_token);
    if (session_token) {
        return session_token;
    } else {
        return false;
    }
}

export async function require_login() {
    if (!await is_session_valid()) {
        window.location.href = "https://account.davidnet.net/login/";
    }
}

// Functie om de sessie token op te halen uit de cookie
function GetSessionFromCookie() {
    const cookieName = "session_token=";  // Naam van de cookie die je zoekt
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length); // Return de waarde van de sessie token
        }
    }
    return null;  // Return null als de sessie token niet gevonden is
}