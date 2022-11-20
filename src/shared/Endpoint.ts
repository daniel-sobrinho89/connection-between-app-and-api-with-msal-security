export default class Endpoint {
    public static async Get(url: string, accessToken: string) {
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`;

        headers.append("Authorization", bearer);
        headers.append("Content-Type", 'application/json');

        const options = {
            method: "GET",
            headers: headers
        };

        return fetch(url, options)
            .then(response => response);
    }

    public static async Post(url: string, accessToken: string, body: Order) {
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`;

        headers.append("Authorization", bearer);
        headers.append("Content-Type", 'application/json');

        const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        };

        return fetch(url, options)
            .then(response => response);
    }
}