const API_EVENT_URL = 'http://localhost:8080/api/events';

export async function getAllEvents() {
    const response = await fetch(API_EVENT_URL);
    if(!response.ok) {
        throw new Error('Failed to fetch events');
    }
    return await response.json();
}

export async function getEventById(id) {
    const response = await fetch(`${API_EVENT_URL}/${id}`);
    if(!response.ok) {
        throw new Error('Failed to fetch event');
    }
    return await response.json();
}