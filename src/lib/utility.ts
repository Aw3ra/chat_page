// src/lib/api.js or a similar file

export async function postRequest(url: string, data: object) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        // Handle HTTP errors
        return response.json();
    }
    return response.json();
}


