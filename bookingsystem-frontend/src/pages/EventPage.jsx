import { useState } from "react";
import SearchBar from "../components/SearchBar";
import EventGrid from "../components/EventGrid";

function EventPage() {

    const [searchTerm, setSearchTerm] = useState('');

    const events = [
        {
            id: 1,
            title: "Tech Conference",
            venue: "KLCC",
            eventDate: "2026-07-01",
            price: 100,
            capacity: 200,
            seatsAvailable: 50,
            status: "active",
            imgUrl: ""
        },
        {
            id: 2,
            title: "Laptop Conference",
            venue: "KLCC",
            eventDate: "2026-07-01",
            price: 100,
            capacity: 200,
            seatsAvailable: 50,
            status: "active",
            imgUrl: ""
        },
        {
            id: 3,
            title: "AI Conference",
            venue: "KLCC",
            eventDate: "2026-07-01",
            price: 100,
            capacity: 200,
            seatsAvailable: 50,
            status: "active",
            imgUrl: ""
        },
        {
            id: 4,
            title: "Medical Conference",
            venue: "KLCC",
            eventDate: "2026-07-01",
            price: 100,
            capacity: 200,
            seatsAvailable: 50,
            status: "active",
            imgUrl: ""
        },
        {
            id: 5,
            title: "HEHE Conference",
            venue: "KLCC",
            eventDate: "2026-07-01",
            price: 100,
            capacity: 200,
            seatsAvailable: 50,
            status: "active",
            imgUrl: ""
        },
    ]

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