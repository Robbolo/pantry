const API_BASE_URL = "http://localhost:8000";

export async function apiFetch(
    endpoint: string,
    options?: RequestInit,
) {

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        options,
    );

    if (!response.ok) {
        throw new Error(
            `Request failed: ${response.status}`
        );
    }

    return response;

}