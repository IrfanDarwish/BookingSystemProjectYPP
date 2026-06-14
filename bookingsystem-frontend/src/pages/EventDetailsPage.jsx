import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/EventDetailsPage.css';
import { getEventById } from "../services/eventApi";
import { deleteEvent, updateEvent } from "../services/eventApi";
import { useNavigate } from 'react-router-dom';

function EventDetailsPage(){
    
    const role = localStorage.getItem('role');
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

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

    async function handleDeleteEvent(id){

        const confirmDelete = window.confirm('Are you sure you want to delete this event?');
        if (!confirmDelete) {
            return;
        }

        setError('');
        setSuccessMessage('');
        try {
            await deleteEvent(id);
            setSuccessMessage('Event deleted successfully!');
            setTimeout(() => {
                navigate('/events');
            }, 1000);
        } catch (err) {
            setError(err.message || 'Failed to delete event');
        }
    }
    
    const handleRegister = () => {
        navigate(`/book/${event.id}`);
    };

    const isNotBookable = !event || event.seatsAvailable === 0 || event.status === "CANCELLED" || event.status === "COMPLETED";

    const formattedDate = event?.eventDate
        ? new Date(event.eventDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        : "";

    return(
        <div className="event-details">
            <div className="event-details-header">
                <h1 className="event-details-title">{event.title}</h1>
                <span className={`status-details ${event.status.toLowerCase()}`}>{event.status}</span>
            </div>

            <div className="event-details-meta">
                
                <div className="meta-item">
                    <i className="fa-solid fa-calendar fa-xl"></i>
                    <span>{formattedDate}</span>
                </div>

                <div className="meta-item">
                    <i className="fa-solid fa-location-crosshairs fa-xl"></i>
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
            {role === 'ADMIN' ? (
                <>
                <div className="admin-buttons">
                    <button className="edit-btn" onClick={() => navigate(`/events/${event.id}/edit`)}>Edit Event</button>
                    <button className="delete-btn" onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
                </div>
                </>
            ) : ( 
                <>
                
                <button 
                    className="register-btn" 
                    onClick={handleRegister}
                    disabled={isNotBookable}
                    >{isNotBookable ? "Unavailable" : "Register Now"}
                    </button>
                    <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                    >
                    ← Back
                    </button>
                </>
            )}
        </div>
    )

}

export default EventDetailsPage;