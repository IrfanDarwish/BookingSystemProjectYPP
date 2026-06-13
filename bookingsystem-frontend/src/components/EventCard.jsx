import "../styles/EventCard.css";
import { useNavigate } from "react-router-dom";

function EventCard({event}) {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${event.id}`);
    };
    
    const formattedDate = new Date(event.eventDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); 
    return (
        <div className="event-card" onClick={handleClick}>
            <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <p className="event-venue">📍 {event.venue}</p>
                <p className="event-date">📅 {formattedDate}</p>
                <p className="event-price"><b>Price:</b> RM {event.price}</p>
                <p className="event-capacity"><b>Capacity:</b> {event.capacity}</p>
            </div>

            <div className="event-footer">
                <p>Available Seats: {event.seatsAvailable} left</p>
                <p className={`event-status ${event.status?.toLowerCase()}`}>
                    {event.status}
                </p>
            </div>

        </div>
    )
}

export default EventCard;