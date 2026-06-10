function HomePage() {
    return (
        <div className="page">

            {/* HERO SECTION */}
            <div id="center" style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1 style={{ fontSize: "48px", color: "white" }}>
                    GoEvent
                </h1>

                <h3 style={{ color: "#e5e7eb", marginTop: "10px" }}>
                    Book events easily, manage everything in one place
                </h3>

                <div style={{ marginTop: "20px" }}>
                    <button style={btnPrimary}>Browse Events</button>
                    <button style={btnSecondary}>Login</button>
                </div>
            </div>

            {/* QUICK ACTIONS */}
            <div style={{ marginBottom: "40px" }}>
                <h2 style={{ color: "white", marginBottom: "16px" }}>
                    Quick Actions
                </h2>

                <div style={grid}>
                    <div style={card}>🎟 Browse Events</div>
                    <div style={card}>🔍 Search Events</div>
                </div>
            </div>

            <div>
                <h2 style={{ color: "white", marginBottom: "16px" }}>
                    Featured Events
                </h2>

                <div style={grid}>
                    <div style={eventCard}>Tech Conference 2026</div>
                    <div style={eventCard}>Music Festival</div>
                    <div style={eventCard}>Startup Meetup</div>
                </div>
            </div>

        </div>
    );
}

export default HomePage;

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px"
};

const card = {
    background: "rgba(255,255,255,0.15)",
    padding: "20px",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer",
    textAlign: "center",
    backdropFilter: "blur(10px)"
};

const eventCard = {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "12px",
    color: "white"
};

const btnPrimary = {
    padding: "10px 20px",
    marginRight: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer"
};

const btnSecondary = {
    padding: "10px 20px",
    border: "1px solid white",
    borderRadius: "8px",
    background: "transparent",
    color: "white",
    cursor: "pointer"
};