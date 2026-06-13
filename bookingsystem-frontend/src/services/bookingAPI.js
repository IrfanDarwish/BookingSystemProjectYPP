const API_BOOKING_URL = 'http://localhost:8080/api/bookings';

export async function createBooking(booking) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BOOKING_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
            eventId: booking.eventId, 
            numberOfSeats: booking.numberOfSeats, 
        })
    });

    const data = await response.json();
    
    if(!response.ok){
        const error = new Error(data.error || 'Booking failed');
        error.status = response.status;
        throw error;
    }
    return data;
}

export async function getMyBookings() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BOOKING_URL}/my-bookings`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch bookings');
    }

    return data;
}

export async function cancelBooking(bookingId) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BOOKING_URL}/${bookingId}/cancel`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(data.message || 'Cancel failed');
    }

    return await response.json();
}

export async function deleteBooking(bookingId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BOOKING_URL}/${bookingId}/permanent`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Deletion failed');
}
