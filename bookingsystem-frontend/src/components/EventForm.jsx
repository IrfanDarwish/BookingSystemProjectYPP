import { useState } from 'react';
import '../styles/EventForm.css';

function EventForm({ initialData = {}, onSubmit, submitLabel, isLoading, isEditMode = false, onCancelEvent }) {
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [category, setCategory] = useState(initialData.category || '');
    const [venue, setVenue] = useState(initialData.venue || '');
    const [eventDate, setEventDate] = useState(initialData.eventDate || '');
    const [price, setPrice] = useState(initialData.price || '');
    const [capacity, setCapacity] = useState(initialData.capacity || '');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const now = new Date();
        const selectedDate = new Date(eventDate);

        if (!title || !description || !category || !venue || !eventDate || !price || !capacity ) {
        setError('All fields are required');
        return;
        }

        if (selectedDate.getTime() <= now.getTime()) {
        setError('Event date must be in the future');
        return;
        }

        setError('');
        onSubmit({ title, description, category, venue, eventDate, price, capacity });
    };

    return (
        <div className="create-event-container">
        <div className="create-event-card">
            <div className="create-event-card-body">
            <div className="create-event-card-header">
                <h1>{submitLabel} Event</h1>
                <p>Admin panel — {submitLabel.toLowerCase()} an event</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
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
                    <input 
                        type="datetime-local" 
                        value={eventDate} 
                        min={new Date().toISOString().slice(0, 16)}
                        onChange={(e) => setEventDate(e.target.value)} 
                    />

                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                    <label>Capacity</label>
                    <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                </div>

                <button type="submit" className="create-event-btn" disabled={isLoading}>
                {isLoading ? 'Saving...' : submitLabel}
                </button>

                {isEditMode && (
                    <button
                        type="button"
                        className="cancel-event-btn"
                        onClick={onCancelEvent}
                        >
                        Cancel Event
                    </button>
                )}
            </form>
            </div>
        </div>
        </div>
    );
}

export default EventForm;