import React, { useEffect, useState } from "react";
import KPICards from "../components/admin/KPICards";
import BookingTable from "../components/admin/BookingTable";
import ReportSummary from "../components/admin/ReportSummary";
import "../styles/AdminDashboardPage.css";
import { getDashboardSummary, getRecentBookings } from "../services/adminAPI";

function AdminDashboardPage() {
    const [stats, setStats] = useState({});
    const [bookings, setBookings] = useState([]);
    const [reports, setReports] = useState({});

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const dashboardSummary = await getDashboardSummary();
            const recentBookings = await getRecentBookings();
            setBookings(recentBookings || []);
            setReports({
                topEvent: dashboardSummary.mostPopularEvents,
                totalSeats: dashboardSummary.totalSeatsBooked,
                todayBookings: dashboardSummary.todaysBookings,
                totalRevenue: dashboardSummary.totalRevenue,
                todaysRevenue: dashboardSummary.todaysRevenue
            });

            setStats({
                totalEvents: dashboardSummary.totalEvents,
                totalBookings: dashboardSummary.totalBookings,
                activeEvents: dashboardSummary.eventStatusSummary.active,
                upcomingEvents: dashboardSummary.eventStatusSummary.upcoming,
                completedEvents: dashboardSummary.eventStatusSummary.completed,
                cancelledEvents: dashboardSummary.eventStatusSummary.cancelled,
                totalUsers: dashboardSummary.totalUsers
            })

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <KPICards stats={stats} />

            <BookingTable bookings={bookings} />

            <ReportSummary reports={reports} />
        </div>
    );
}

export default AdminDashboardPage;