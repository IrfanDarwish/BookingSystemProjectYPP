import { useEffect, useState } from "react";
import BookingSummary from "../components/user/BookingSummary";
import BookingCard from "../components/user/BookingCard";
import "../styles/UserListBookingPage.css";
import SearchBar from "../components/SearchBar";
import { getMyBookings, cancelBooking, deleteBooking } from "../services/bookingAPI";

function UserListBookingPage() {
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState('');
    const [cancellingId, setCancellingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        async function loadBookings() {
            try {
                setLoading(true);
                const data = await getMyBookings();
                console.log("data",data);
                setBookings(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadBookings();
    }, []);


    const handleCancelBooking = async(bookingId) => {
        const isConfirmed = window.confirm('Cancel booking? Seats will be released.');
        if(!isConfirmed) return;
        setCancellingId(bookingId);
        try{
            const updatedBooking =await cancelBooking(bookingId);
            setBookings(prevBookings => prevBookings.map(booking => booking.bookingId === bookingId ? updatedBooking : booking));
            alert('Booking cancelled successfully');
        } catch (err) {
            console.error(err);
        } finally {
            setCancellingId(null);
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        const isConfirmed = window.confirm('Delete booking?');
        if (!isConfirmed) return;
        setDeletingId(bookingId);
        try {
            await deleteBooking(bookingId);
            setBookings(prevBookings => prevBookings.filter(booking => booking.bookingId !== bookingId));
            alert('Booking deleted successfully');
        } catch (err) {
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    }

    const filteredBookings  = searchTerm ? bookings.filter(booking => booking.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())) : bookings;

    return (
        <div className="my-bookings-page">

            <div className="list-header">
                <h1>My Bookings</h1>
                <p>Manage your event bookings</p>
            </div>

            <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm}
                />

            <BookingSummary bookings={bookings} />

            <div className="booking-list">
                {filteredBookings.map((booking) => (
                    <BookingCard
                        key={booking.bookingId}
                        booking={booking}
                        onCancel={handleCancelBooking}
                        onDelete={handleDeleteBooking}
                        isCancelling = {cancellingId === booking.bookingId}
                        isDeleting = {deletingId === booking.bookingId}
                    />
                ))}
            </div>

        </div>
    );
}

export default UserListBookingPage;