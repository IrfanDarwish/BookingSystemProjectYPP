# Event Booking System - Frontend

A modern frontend web application for the Event Booking System built using **React (Vanilla JavaScript) + Vite**.  
This application allows users to browse events, search, view details, and perform authenticated actions using JWT-based login.

---

# Technologies Used

| Technology | Purpose |
|------------|--------|
| React | UI Library |
| Vite | Build Tool & Dev Server |
| JavaScript (ES6+) | Programming Language |
| React Router DOM | Routing |
| CSS | Styling |
| LocalStorage | JWT Storage |

---

# Features

## Authentication

- User Login
- User Registration
- JWT Token Storage (localStorage)
- Protected Routes
- Role-based UI (USER / ADMIN)

## Event Features

- View all events
- Search events
- View event details
- Admin event management 

## UI Features

- Responsive layout
- Reusable components
- Loading & error states


---

# Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

Check versions:

```bash
node -v
npm -v
```

---

# Installation

```bash
git clone https://github.com/IrfanDarwish/BookingSystemProjectYPP/tree/main/bookingsystem-frontend
cd booking-system-frontend
npm install
```

---

# Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Usage:

```javascript
const API_URL = import.meta.env.VITE_API_BASE_URL;
```

---

# Running the Application

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

# Build for Production

```bash
npm run build
```

Development build
```bash
npm run dev
```

---

# Authentication Flow

## Login

- User logs in using credentials
- Backend returns JWT + role
- Token and role are stored in `localStorage`

```javascript
localStorage.setItem("token", token);
localStorage.setItem("role", role);
```

---

## Protected Requests (Fetch API)

All protected API calls use native `fetch` with JWT in headers.

```javascript
function getAuthHeaders() {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
}
```

Example request:

```javascript
const response = await fetch(
  `${import.meta.env.VITE_API_BASE_URL}/events`,
  getAuthHeaders()
);

const data = await response.json();
```

---

## Protected Routes

Routes are protected using role-based checks with a custom `ProtectedRoute` component.

```javascript
<Route
  path="/admin"
  element={
    <ProtectedRoute role="ADMIN">
      <AdminPage />
    </ProtectedRoute>
  }
/>
```

---

# API Setup (Fetch-based)

Uses native `fetch` with environment-based configuration.

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
```

---

## Example API Calls

### Get All Events

```javascript
export async function getAllEvents() {
  const response = await fetch(`${API_BASE_URL}/events`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return await response.json();
}
```

---

### Get Event By ID

```javascript
export async function getEventById(id) {
  const response = await fetch(`${API_BASE_URL}/events/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event details");
  }

  return await response.json();
}
```

---

## Notes

- Uses native `fetch`
- JWT is attached manually via headers
- API base URL is controlled via `.env`
- Error handling is done using `response.ok` checks

---

# State Management

- useState for local state
- useEffect for lifecycle handling
- Props-based communication

---

# Error Handling

- UI shows error messages for:
  - Network errors
  - Unauthorized access
  - Validation errors

---

# Security Notes

- JWT stored in localStorage
- Token sent via Authorization header
- Backend enforces all security rules
- Frontend role checks are UI-only

---

# Future Improvements

- Replace localStorage with HttpOnly cookies
- Add refresh token support
- Improve UI 
- Add unit testing

---

# Deployment

```bash
npm run build
```

Deploy options:
- Vercel
- Netlify
- Firebase Hosting

---

# Author

Developed by **IrfanDarwish**