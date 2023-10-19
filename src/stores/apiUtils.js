// user de prueba
// nombre de Usuario: a
// contraseña: a
// mail: a@a.com
// token para autorización:
// bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIzLCJpYXQiOjE2OTc1NDE0Mjg1MzUsImV4cCI6MTY5NzU0NDAyMDUzNX0.HJj7VF4dsO3yMa-ceEuOIu63xdTopxhWubnUTIbYN5M

export const API_BASE_URL = "http://localhost:8080/api";

async function makeApiCall(apiEndpoint, data = null, token = null) {
    const url = `${apiEndpoint.path}`;
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
    }
    if (apiEndpoint.requiresAuth)
        headers['Authorization'] = `bearer ${token}`
    const init = {
        method: apiEndpoint.method,
        headers: headers
    }
    if (data)
        init.body = JSON.stringify(data);

    let response = await fetch(url, init);
    const result = {
        success: response.ok,
        status: response.status,
        data: null,
        error: null
    };
    if (response.ok) {
        try{
            result.data = await response.json();
        } catch (e) {
            result.data = null;
        }
    } else {
        const errorData = await response.json();
        result.error = errorData.error;
        result.code = errorData.code;
        result.details = errorData.details;
    }
    return result;
}

export {makeApiCall};
