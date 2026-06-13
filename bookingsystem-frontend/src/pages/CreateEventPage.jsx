import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/eventApi';
import EventForm from '../components/EventForm';

function CreateEventPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreate = async (formData) => {
        setLoading(true);
        try {
        await createEvent(formData);
        setTimeout(() => navigate('/events'), 1500);
        } catch (err) {
        alert(err.message); 
        } finally {
        setLoading(false);
        }
    };

    return <EventForm onSubmit={handleCreate} submitLabel="Create" isLoading={loading} isEditMode={false} />;
}

export default CreateEventPage;