import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom"; 
import SearchBar from "../components/SearchBar";
import EventGrid from "../components/EventGrid";
import Pagination from "../components/Pagination"; 
import { getAllEvents } from "../services/eventApi";
import "../styles/EventPage.css";

function EventPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); 

    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function loadEvents() {
            try {
                setLoading(true);
                setError("");
                const data = await getAllEvents(currentPage - 1, pageSize, searchTerm); 
                setEvents(data.content || []);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                setError("Failed to load events. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadEvents();
    }, [searchTerm, currentPage, pageSize]); 
    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, pageSize]);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };


    return (
        <div className="event-page">
            <div className="event-page-header">
                <h1>All Events</h1>
                <p>Discover, book, and manage events in one place</p>

                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearch}
                />

                {loading ? (
                    <div className="loading-card">Loading events...</div>
                    ) : events.length === 0 ? (
                        <div className="empty-state">
                            <h2>No events found</h2>
                            <p>Check back later for new events.</p>
                        </div>
                    ) : (
                        <>
                            <EventGrid events={events} />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                pageSize={pageSize}
                                onPageChange={(newPage) => setCurrentPage(newPage)} 
                                onPageSizeChange={(newSize) => setPageSize(newSize)}
                            />
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default EventPage;