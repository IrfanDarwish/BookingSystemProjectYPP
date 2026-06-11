import "../styles/EventCard.css";
import { useNavigate } from "react-router-dom";

function EventCard({event}) {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${event.id}`);
    };
    
    
    
    return (
        <div className="event-card" onClick={handleClick}>
            <div className="event-image">
                
            </div>

            <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <p className="event-venue">📍 {event.venue}</p>
                <p className="event-date">📅 {event.eventDate}</p>
                <p className="event-price">💰 RM {event.price}</p>
                <p className="event-capacity">👥{event.capacity}</p>
            </div>

            <div className="event-footer">
                <p>🎟 {event.seatsAvailable} left</p>
                <p className={`event-status ${event.status?.toLowerCase()}`}>
                    {event.status}
                </p>
            </div>

        </div>
    )
}

export default EventCard;