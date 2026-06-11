import "../styles/HomePage.css";

function HomePage() {
    return (
        <div className="page">
        {/* HERO SECTION */}
        <section className="hero-section">
            <h1 className="hero-title">GoEvent</h1>
            <p className="hero-subtitle">
            The easiest way to discover, book, and manage events in one place.
            </p>
            <div className="hero-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">Browse Events</button>
            </div>
        </section>

        {/* FEATURES */}
        <section className="section">
            <h2 className="section-title">Why GoEvent?</h2>
            <div className="grid">
            <div className="card">⚡ Fast Booking</div>
            <div className="card">🎟 Instant Tickets</div>
            <div className="card">📅 Easy Event Management</div>
            <div className="card">🔒 Secure System</div>
            </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section">
            <h2 className="section-title">How It Works</h2>
            <div className="grid">
            <div className="card">1. Browse Events</div>
            <div className="card">2. Book Your Seat</div>
            <div className="card">3. Get Confirmation</div>
            </div>
        </section>

        {/* PREVIEW EVENTS */}
        <section className="section">
            <h2 className="section-title">Popular Events</h2>
            <div className="grid">
            <div className="event-card">🔥 Tech Conference 2026</div>
            <div className="event-card">🎶 Music Festival</div>
            <div className="event-card">🚀 Startup Meetup</div>
            </div>
        </section>

        {/* FINAL CTA */}
        <section className="cta-section">
            <h2 className="cta-title">Ready to join amazing events?</h2>
            <button className="primary-btn" style={{ marginTop: "20px" }}>
            Sign Up Now
            </button>
        </section>
        </div>
    );
}

export default HomePage;