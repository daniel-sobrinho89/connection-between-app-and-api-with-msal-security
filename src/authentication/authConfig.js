const baseUrl = window.location.origin;

export const msalConfig = {
    auth: {
        clientId: "d28c2041-9b27-4e8c-89a5-17dbce6d3a77",
        authority: "https://login.microsoftonline.com/16904e7d-c4aa-4f87-b946-bd34d60a4237", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
        // clientId: "{your client ID}",
        // authority: "https://login.microsoftonline.com/{your tenant ID}", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
        redirectUri: baseUrl
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"]
};