import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import EventGrid from "../components/EventGrid";
import { getAllEvents } from "../services/eventApi";

function EventPage() {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadEvents() {
            try {
                setLoading(true);
                const data = await getAllEvents();
                setEvents(data);
            } catch (err) {
                setError("Failed to load events");
            } finally {
                setLoading(false);
            }
        }
        loadEvents();
    }, []);

    const filteredEvents = searchTerm ? events.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase())) : events;

    return (
        <div className="page">
            
            <div className="page-header">
                <h1>All Events</h1>
                <p>Discover, book, and manage events in one place</p>



                <SearchBar 
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />
            </div>

            <EventGrid events={filteredEvents}/>
        </div>
    )



}

export default EventPage;