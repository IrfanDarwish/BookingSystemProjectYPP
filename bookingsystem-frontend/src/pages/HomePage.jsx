import "../styles/HomePage.css";

function HomePage() {
    return (
        <div className="goevent-homepage">
            <section className="goevent-hero">
                <div className="goevent-hero-content">
                <h1 className="goevent-hero-title">
                    Discover Amazing Events Near You
                </h1>

                <p className="goevent-hero-subtitle">
                    Book tickets, manage registrations, and explore unforgettable
                    experiences all in one platform.
                </p>

                <div className="goevent-hero-buttons">
                    <button className="goevent-primary-btn"
                    onClick={() => window.location.href = '/events'}
                    >
                    Explore Events
                    </button>

                    <button className="goevent-secondary-btn"
                    onClick={() => window.location.href = '/register'}
                    >
                    Get Started
                    </button>
                </div>
                </div>
            </section>

            <section className="goevent-section">
                <h2 className="goevent-section-title">
                Why Choose GoEvent?
                </h2>

                <div className="goevent-feature-grid">

                <div className="goevent-feature-card">
                    <div className="goevent-feature-icon">⚡</div>
                    <h3>Fast Booking</h3>
                    <p>Reserve your seat in seconds with a seamless process.</p>
                </div>

                <div className="goevent-feature-card">
                    <div className="goevent-feature-icon">🎟</div>
                    <h3>Instant Tickets</h3>
                    <p>Receive booking confirmations immediately.</p>
                </div>

                <div className="goevent-feature-card">
                    <div className="goevent-feature-icon">📅</div>
                    <h3>Easy Management</h3>
                    <p>Create and manage events effortlessly.</p>
                </div>

                <div className="goevent-feature-card">
                    <div className="goevent-feature-icon">🔒</div>
                    <h3>Secure Platform</h3>
                    <p>Protected accounts and secure transactions.</p>
                </div>

                </div>
            </section>

            <section className="goevent-section goevent-dark-section">
                <h2 className="goevent-section-title">
                How It Works
                </h2>

                <div className="goevent-steps">

                <div className="goevent-step-card">
                    <span>1</span>
                    <h3>Browse Events</h3>
                    <p>Find events that match your interests.</p>
                </div>

                <div className="goevent-step-card">
                    <span>2</span>
                    <h3>Book Your Seat</h3>
                    <p>Select tickets and confirm your booking.</p>
                </div>

                <div className="goevent-step-card">
                    <span>3</span>
                    <h3>Attend & Enjoy</h3>
                    <p>Receive confirmation and join the event.</p>
                </div>

                </div>
            </section>

            <section className="goevent-stats">
                <div className="goevent-stat-item">
                <h2>500+</h2>
                <p>Events Hosted</p>
                </div>

                <div className="goevent-stat-item">
                <h2>10K+</h2>
                <p>Bookings Made</p>
                </div>

                <div className="goevent-stat-item">
                <h2>5K+</h2>
                <p>Active Users</p>
                </div>
            </section>
        </div>
    );
}

export default HomePage;