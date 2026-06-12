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

export async function createEvent(event){
    const token = localStorage.getItem('token');
    if(!token) {
        throw new Error('Unauthorized');
    }
    const response = await fetch(API_EVENT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(event)
    });
    if(!response.ok) {
        throw new Error('Failed to create event');
    }
    return await response.json();
}