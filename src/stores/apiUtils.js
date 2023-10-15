import storage from "@/storage/storage";

// token para autorización:
// bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTY5NzM5MTU1NjAzOSwiZXhwIjoxNjk3Mzk0MTQ4MDM5fQ.jP9DThwUJWdlRbaKI5qvwHejI4KRe13z5OKFJ7qrVB8

const API_BASE_URL = "http://localhost:8080/api";

async function makeApiCall(apiEndpoint, data = null) {
    const url = `${API_BASE_URL}${apiEndpoint.path}`;
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
    }
    if (apiEndpoint.requiresAuth)
        headers['Authorization'] = `bearer ${storage.token}`
    const init = {
        method: apiEndpoint.method,
        headers: headers
    }
    if (data)
        init.body = JSON.stringify(data);

    let response = await fetch(url, init);
    if (!response.ok) {
        console.error(`API Error for ${url}: ${response.statusText}`)
        throw Error(response.statusText);
    }
    return response.json();
}

export {makeApiCall};
