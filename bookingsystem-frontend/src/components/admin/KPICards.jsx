import "../../styles/AdminDashboardPage.css";

function KPICards({ stats }) {
    return (
        <div className="kpi-grid">
        <div className="kpi-card">
            <h3>Total Events</h3>
            <p>{stats.totalEvents}</p>
        </div>

        <div className="kpi-card">
            <h3>Total Bookings</h3>
            <p>{stats.totalBookings}</p>
        </div>

        <div className="kpi-card">
            <h3>Active Events</h3>
            <p>{stats.activeEvents}</p>
        </div>

        <div className="kpi-card">
            <h3>Upcoming Events</h3>
            <p>{stats.upcomingEvents}</p>
        </div>

        <div className="kpi-card">
            <h3>Completed Events</h3>
            <p>{stats.completedEvents}</p>
        </div>

        <div className="kpi-card">
            <h3>Cancelled Events</h3>
            <p>{stats.cancelledEvents}</p>
        </div>

        <div className="kpi-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
        </div>
        </div>
    );
}

export default KPICards;