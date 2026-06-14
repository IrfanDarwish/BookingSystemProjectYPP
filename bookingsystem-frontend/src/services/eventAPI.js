const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_EVENT_URL = `${API_BASE_URL}/events`;

export async function getAllEvents(page = 0, size = 20, search = '') {
    const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
    });
    if (search) {
        params.set('search', search);
    }
    const response = await fetch(`${API_EVENT_URL}?${params.toString()}`);
    if (!response.ok) {
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

export async function deleteEvent(id){
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_EVENT_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if(!response.ok) {
        throw new Error('Failed to delete event');
    }
    return;
}

export async function updateEvent(id, event){
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_EVENT_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(event)
    });
    if(!response.ok) {
        throw new Error('Failed to update event');
    }
    return await response.json();
}

export async function cancelEvent(id){
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_EVENT_URL}/${id}/cancel`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    if(!response.ok) {
        throw new Error('Failed to cancel event');
    }
    return await response.json();
}