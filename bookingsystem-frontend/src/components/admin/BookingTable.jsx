function BookingTable({ bookings }) {

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString("en-GB", {
            day: "numeric", month: "long", year: "numeric"
        });
    };

    return (
        <div className="table-section">
        <h2>Recent Bookings</h2>

        <table className="booking-table">
            <thead>
            <tr>
                <th>User Email</th>
                <th>Event</th>
                <th>Seats</th>
                <th>Total Price</th>
                <th>Date</th>
                <th>Booking Status</th>
                <th>Event Status</th>
            </tr>
            </thead>

            <tbody>
            {bookings.map((b) => (
                <tr key={b.bookingId}>
                <td>{b.userEmail}</td>
                <td>{b.eventTitle || "Event Deleted"}</td>
                <td>{b.numberOfSeats}</td>
                <td>{b.totalPrice}</td>
                <td>{formatDate(b.bookingDate)}</td>
                <td>{b.bookingStatus}</td>
                <td>{b.eventStatus}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default BookingTable;