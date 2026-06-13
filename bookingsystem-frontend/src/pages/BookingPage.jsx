import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/BookingPage.css";
import { createBooking } from "../services/bookingAPI";
import { getEventById } from "../services/eventApi";

function BookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [seats, setSeats] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [seatError, setSeatError] = useState("");

    const email = localStorage.getItem("email");

    useEffect(() => {
        getEventById(id)
            .then(data => setEvent(data))
            .catch(() => setError("Failed to load event"));
    }, [id]);

    const totalPrice = event ? event.price * seats : 0;

    const isInvalidSeats = event && (seats < 1 || seats > event.seatsAvailable);

    const handleBooking = async () => {

        if (isInvalidSeats) {
            setSeatError("Invalid number of seats");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            await createBooking({
                eventId: id,
                numberOfSeats: seats
            });

            alert("Booking successful!");
            navigate("/my-bookings");

        } catch (err) {
            setError(err.response?.data?.message || "Booking failed");
        } finally {
            setLoading(false);
        }
    };

    if (!event) return <div className="booking-loading">Loading...</div>;

    if (error) {return <div>{error}</div>;}

    const formattedDate = event?.eventDate
        ? new Date(event.eventDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        : "";

    return (
        <div className="booking-container">
            <div className="booking-card">
                <h2 className="booking-title">{event.title}</h2>

                <div className="booking-info">
                    <p><b>Date:</b> {formattedDate}</p>
                    <p><b>Venue:</b> {event.venue}</p>
                    <p><b>Price per seat:</b> RM {event.price}</p>
                    <p><b>Seats available:</b> {event.seatsAvailable}</p>
                </div>

                <div className="booking-input">
                    <label>Number of Seats</label>
                    <input
                        type="number"
                        min="1"
                        max={event.seatsAvailable}
                        value={seats}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setSeats(value);

                            if (value > event.seatsAvailable) {
                                setSeatError(`Only ${event.seatsAvailable} seats available`);
                            } else if (value < 1) {
                                setSeatError("Minimum of 1 seat");
                            } else {
                                setSeatError("");
                            }
                        }}
                    />
                    {seatError && <p className="error">{seatError}</p>}
                </div>

                <div className="booking-total">
                    Total Price: <span>RM {totalPrice}</span>
                </div>

                {error && <p className="error">{error}</p>}

                <div className="booking-button">
                    <button
                        onClick={() => navigate(`/events/${id}`)}
                        className="back-btn"
                        >
                        Back
                    </button>
                    <button
                        onClick={handleBooking}
                        disabled={loading || isInvalidSeats}
                        className="booking-btn"
                    >
                        {loading ? "Booking..." : "Confirm Booking"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default BookingPage;