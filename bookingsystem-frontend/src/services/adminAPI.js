const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_ADMIN_URL = `${API_BASE_URL}/admin`;


function getAuthHeaders() {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
}
export async function getDashboardSummary() {
    const response = await fetch(`${API_ADMIN_URL}/dashboard/summary`, getAuthHeaders());
    if(!response.ok) {
        throw new Error('Failed to fetch admin dashboard summary');
    }
    return await response.json();
}

export async function getRecentBookings() {
    const response = await fetch(`${API_ADMIN_URL}/bookings/recent`, getAuthHeaders());
    if(!response.ok) {
        throw new Error('Failed to fetch recent bookings');
    }
    return await response.json();
}