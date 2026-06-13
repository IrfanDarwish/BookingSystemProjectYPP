function BookingCard({ booking, onCancel, onDelete, isCancelling, isDeleting }) {
    const isBookingCancelled = booking.bookingStatus === "CANCELLED";
    const isEventCancelled = booking.eventStatus === "CANCELLED";
    const showCancel = !isBookingCancelled && !isEventCancelled;
    const showDelete = isBookingCancelled || isEventCancelled;

    const formattedDate = new Date(booking.bookingDate).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric"
    });

    return (
        <div className="booking-card-info">
            <div className="booking-info">
                <div className="top-row">
                    <h3>{booking.eventTitle}</h3>
                    <span className={`booking-status ${booking.bookingStatus?.toLowerCase()}`}>
                        Booking Status: {booking.bookingStatus}
                    </span>
                    <span className={`booking-status-event ${booking.eventStatus?.toLowerCase()}`}>
                        Event Status: {booking.eventStatus}
                    </span>
                </div>
                <div className="details-row">
                    <span>📅 {formattedDate}</span>
                    <span>📍 {booking.eventVenue}</span>
                    <span>🎟 Seats: {booking.numberOfSeats}</span>
                    <span>💰 RM {booking.totalPrice}</span>
                </div>
            </div>
            <div className="booking-actions">
                {showCancel && (
                    <button 
                        className="cancel-btn" 
                        onClick={() => onCancel(booking.bookingId)}
                        disabled={isCancelling}
                    >
                        {isCancelling ? "Cancelling..." : "Cancel"}
                    </button>
                )}
                {showDelete && (
                    <button 
                        className="cancel-btn"  
                        onClick={() => onDelete(booking.bookingId)}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default BookingCard;