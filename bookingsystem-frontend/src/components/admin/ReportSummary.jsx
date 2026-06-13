import "../../styles/AdminDashboardPage.css";

function ReportSummary({ reports }) {
    return (
        <div className="report-section">
        <h2>Report Summary</h2>

        <div className="report-grid">
            <div className="report-card">
                <h4>Most Popular Event</h4>
                <p>{reports.topEvent}</p>
            </div>

            <div className="report-card">
                <h4>Total Seats Booked</h4>
                <p>{reports.totalSeats}</p>
            </div>

            <div className="report-card">
                <h4>Today's Bookings</h4>
                <p>{reports.todayBookings}</p>
            </div>
        </div>

        <div className="report-grid-2">
            <div className="report-card">
                <h4>Total Revenue</h4>
                <p>RM {reports.totalRevenue}</p>
            </div>

            <div className="report-card">
                <h4>Today's Revenue</h4>
                <p>RM {reports.todaysRevenue}</p>
            </div>
        </div>

        
        </div>
    );
}

export default ReportSummary;