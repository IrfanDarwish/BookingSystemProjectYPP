import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/EventDetailsPage.css';
import { getEventById } from "../services/eventApi";

function EventDetailsPage(){

    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadEventById() {
            try{
                setLoading(true);
                const data = await getEventById(id);
                setEvent(data);
            } catch (err) {
                setError("Failed to load event details");
            } finally {
                setLoading(false);
            }
        }
        loadEventById();
    }, [id]);

    if (loading){
        return <div>Loading...</div>;
    }

    if (error){
        return <div>{error}</div>;
    }

    if (!event){
        return <div>Event not found</div>;
    }


    return(
        <div className="event-details">
            <div className="event-details-header">
                <h1 className="event-details-title">{event.title}</h1>
                <span className={`status-details ${event.status.toLowerCase()}`}>{event.status}</span>
            </div>

            <div className="event-details-meta">
                
                <div className="meta-item">
                    <i class="fa-solid fa-calendar fa-xl"></i>
                    <span>{event.eventDate}</span>
                </div>

                <div className="meta-item">
                    <i class="fa-solid fa-location-crosshairs fa-xl"></i>
                    <span>{event.venue}</span>
                </div>
                <p className="meta-item"></p>
            </div>

            <div className="event-description-details">
                <h3>About this event</h3>
                <p>{event.description}</p>
            </div>

            <div className="event-info-grid">

                <div className="info-box">
                    <p className="label">Price</p>
                    <p className="value">RM {event.price}</p>
                </div>

                <div className="info-box">
                    <p className="label">Capacity</p>
                    <p className="value">{event.capacity}</p>
                </div>

                <div className="info-box">
                    <p className="label">Seats Left</p>
                    <p className="value highlight">{event.seatsAvailable}</p>
                </div>
            </div>

            <button className="register-btn">
                Register Now
            </button>
        </div>
    )

}

export default EventDetailsPage;