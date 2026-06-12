import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/eventApi';
import '../styles/CreateEventPage.css';

function CreateEventPage() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [venue, setVenue] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [price, setPrice] = useState('');
    const [capacity, setCapacity] = useState('');
    const [status, setStatus] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleCreateEvent() {

        if (!title || !description || !category || !venue || !eventDate || !price || !capacity || !status) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await createEvent({
                title,
                description,
                category,
                venue,
                eventDate,
                price,
                capacity,
                status
            });

            setSuccess('Event created successfully!');

            setTimeout(() => {
                navigate('/events');
            }, 1500);

        } catch (err) {
            setError(err.message || 'Failed to create event');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="create-event-container">
            <div className="create-event-card">
                <div className="create-event-card-body">

                    <div className="create-event-card-header">
                        <h1>Create Event</h1>
                        <p>Admin panel — add a new event</p>
                    </div>

                    {success && <div className="success-message">{success}</div>}
                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleCreateEvent();
                    }}>

                        <div className="form-group">

                            <label>Title</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} />

                            <label>Description</label>
                            <input value={description} onChange={(e) => setDescription(e.target.value)} />

                            <label>Category</label>
                            <input value={category} onChange={(e) => setCategory(e.target.value)} />

                            <label>Venue</label>
                            <input value={venue} onChange={(e) => setVenue(e.target.value)} />

                            <label>Event Date</label>
                            <input type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />

                            <label>Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                            <label>Capacity</label>
                            <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />

                            <label>Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="UPCOMING">UPCOMING</option>
                                <option value="CLOSED">CANCELLED</option>
                            </select>

                        </div>

                        <button
                            type="submit"
                            className="create-event-btn"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Event'}
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default CreateEventPage;