function BookingSummary({ bookings }) {

    const eventSummary = {
        total: bookings.length,
        upcoming: bookings.filter(b => b.eventStatus === "UPCOMING").length,
        cancelled: bookings.filter(b => b.eventStatus === "CANCELLED").length
    }

    const bookingSummary = {
        confirmed: bookings.filter(b => b.bookingStatus === "CONFIRMED").length,
        cancelled: bookings.filter(b => b.bookingStatus === "CANCELLED").length
    }

    return (
        <div>
            <div className="booking-summary-section">
                <div className="summary-card-header">
                    <h1>Event Summary</h1>
                </div>

                <div className="booking-summary">
                    <div className="summary-card">Total: {eventSummary.total}</div>
                    <div className="summary-card">Upcoming: {eventSummary.upcoming}</div>
                    <div className="summary-card">Cancelled: {eventSummary.cancelled}</div>
                </div>
            </div>

            <div className="booking-summary-section">
                <div className="summary-card-header">
                    <h1>Booking Summary</h1>
                </div>

                <div className="booking-summary">
                    <div className="summary-card">Confirmed: {bookingSummary.confirmed}</div>
                    <div className="summary-card">Cancelled: {bookingSummary.cancelled}</div>
                </div>
            </div>
        </div>
        
        
    );
}

export default BookingSummary;