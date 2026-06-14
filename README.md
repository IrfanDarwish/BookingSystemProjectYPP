# Event Booking System Backend

A RESTful backend API for an Event Booking System built using Spring Boot, MongoDB, and JWT Authentication.

This application provides secure user authentication, event management, and booking-related functionalities through REST APIs.

---

# Technologies Used

| Technology | Version |
|------------|---------|
| Java | 21 |
| Spring Boot | 4.1.0 |
| Maven | Latest |
| MongoDB | Database |
| Spring Security | Authentication & Authorization |
| JWT (JSON Web Token) | Secure Authentication |
| Lombok | Reduce Boilerplate Code |
| Spring Data MongoDB | Database Access |
| Maven | Dependency Management |

---

# Features

## Authentication

- User Registration
- User Login
- JWT Token Generation
- JWT Token Validation
- Role-Based Access Control (RBAC)
- Secure Password Encryption using BCrypt

## Event Management

- Create Event
- View Events
- Update Event
- Delete Event
- Event Status Management

## Security

- JWT Authentication
- Spring Security Integration
- Protected Endpoints
- Stateless Authentication

## Validation

- Request Validation using Jakarta Validation
- Global Exception Handling
- Consistent Error Responses

---

# Project Structure

```text
src
├── main
│   ├── java
│   │   └── com.example.bookingsystem
│   │       ├── config
│   │       ├── controller
│   │       ├── dto
│   │       ├── exception
│   │       ├── model
│   │       ├── repository
│   │       ├── security
│   │       ├── service
│   │       └── BookingSystemApplication
│   │
│   └── resources
│       ├── application.properties
│       └── static
│
└── test
```

---

# Prerequisites

Before running the application, ensure you have the following installed:

- Java 21
- Maven
- MongoDB

Verify installations:

```bash
java --version
mvn --version
mongod --version
```

---

# MongoDB Configuration

Create a MongoDB database:

```javascript
use event_booking_system
```

Update your `application.properties` file:

```properties
spring.application.name=event-booking-system

# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/event_booking_system

# JWT
jwt.secret=your-super-secret-key
jwt.expiration=36000000

# Server
server.port=8080
```

---

# Environment Variables (Recommended)

Instead of hardcoding secrets, use environment variables:

```properties
spring.data.mongodb.uri=${MONGODB_URI}

jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION}
```

Example:

```bash
export MONGODB_URI=mongodb://localhost:27017/event_booking_system
export JWT_SECRET=your-super-secret-key
export JWT_EXPIRATION=86400000
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/IrfanDarwish/BookingSystemProjectYPP

cd bookingsystem
```

Install dependencies:

```bash
mvn clean install
```

---

# Running the Application

Start the application:

```bash
mvn spring-boot:run
```

Or run the generated JAR:

```bash
mvn clean package

java -jar target/event-booking-system-0.0.1-SNAPSHOT.jar
```

---

# Build

Create executable JAR:

```bash
mvn clean package
```

Output:

```text
target/
└── event-booking-system-0.0.1-SNAPSHOT.jar
```

---

# Authentication Flow

## Register

```http
POST /api/auth/register
```

Request:

```json
{
  "email": "user@example.com",
  "password": "Password123",
  "name": "John Doe"
}
```

---

## Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

## Access Protected Endpoints

Add JWT token to request header:

```http
Authorization: Bearer <token>
```

Example:

```http
GET /api/events
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

---

# Example API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|------------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

---

## Events

| Method | Endpoint | Description |
|----------|------------|-------------|
| GET | `/api/events` | Get All Events |
| GET | `/api/events/{id}` | Get Event By ID |
| POST | `/api/events` | Create Event |
| PUT | `/api/events/{id}` | Update Event |
| DELETE | `/api/events/{id}` | Delete Event |

---

## Booking

| Method | Endpoint | Description |
|----------|------------|-------------|
| GET | `/api/bookings/my-booking` | Get All Booking by User |
| GET | `/api/bookings/{id}` | Get Event By ID |
| POST | `/api/bookings/create` | Create Booking |
| PUT | `/api/bookings/{bookingId}/cancel` | Update Booking to Cancel |
| DELETE | `/api/bookings/{bookingId}/pemanent` | Delete Event |

---

# Error Response Example

```json
{
  "timestamp": "2026-06-14T12:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
}
```

---

# Security Notes

- Passwords are encrypted using BCrypt.
- JWT tokens are signed using a secret key.
- Protected endpoints require a valid JWT token.
- Authentication is stateless.
- Sensitive values should be stored in environment variables.

---

# Future Enhancements

- Refresh Token Support
- Email Verification
- Password Reset
- Docker Support

---

# Author

Developed by **IrfanDarwish**