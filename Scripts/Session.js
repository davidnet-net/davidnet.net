
async function Sublink_get_session_token() {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = "https://account.davidnet.net/links/sublink";
    document.body.appendChild(iframe);

    // Send an get_session_token request to sublink
    iframe.onload = function () {
        iframe.contentWindow.postMessage("get_session_token", "https://account.davidnet.net/links/sublink");
    };

    // Listen for the response
    window.addEventListener("message", function receiveMessage(event) {
        if (!event.origin.endsWith(".davidnet.net")) return; // Security check

        console.log("Sublink Connection Succesfull!");
        console.debug("Sublink Data:", event.data);

        document.body.removeChild(iframe);
        window.removeEventListener("message", receiveMessage);
    });
}

















////////////////////////
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
    const localstorge_token = localStorage.getItem("session-token");
    const requestData = {
        token: localstorge_token,
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
        return localstorge_token;
    } else {
        const sublink_token = await Sublink_get_session_token();
        localStorage.setItem("session-token", sublink_token);
        return sublink_token;
    }

}

export async function require_login() {
    if (!await is_session_valid()) {
        window.location.href = "https://account.davidnet.net/login/";
    }
}