// src/pages/UpdateEventPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, updateEvent, cancelEvent } from '../services/eventApi';
import EventForm from '../components/EventForm';

function UpdateEventPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadEvent() {
        try {
            const data = await getEventById(id);
            if (data.eventDate) {
            data.eventDate = new Date(data.eventDate).toISOString().slice(0, 16);
            }
            setInitialData(data);
        } catch (err) {
            console.error(err);
            navigate('/events'); 
        } finally {
            setLoading(false);
        }
        }
        loadEvent();
    }, [id, navigate]);

    const handleUpdate = async (formData) => {
        setSaving(true);
        try {
        await updateEvent(id, formData);
        navigate(`/events/${id}`); 
        } catch (err) {
        alert(err.message || 'Failed to update event');
        } finally {
        setSaving(false);
        }
    };

    const handleCancelEvent = async () => {
        const confirmCancel = window.confirm('Are you sure you want to cancel this event?');
        if (!confirmCancel) {
            return;
        }

        try {
            await cancelEvent(initialData.id)
            navigate(`/events/${initialData.id}`); 
        } catch (err) {
            alert(err.message || 'Failed to cancel event');
        }
    };

    if (loading) return <div>Loading event data...</div>;
    if (!initialData) return <div>Event not found</div>;

    return (
        <EventForm
        initialData={initialData}
        onSubmit={handleUpdate}
        submitLabel="Update"
        isLoading={saving}
        isEditMode={true}
        onCancelEvent={handleCancelEvent}
        />
    );
}

export default UpdateEventPage;