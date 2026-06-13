import './App.css'
import { Routes, Route, Router } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import UserListBookingPage from './pages/UserListBookingPage'
import RegisterPage from './pages/RegisterPage'
import EventPage from './pages/EventPage'
import EventDetailsPage from './pages/EventDetailsPage'
import CreateEventPage from './pages/CreateEventPage'
import UpdateEventPage from './pages/UpdateEventPage'
import BookingPage from './pages/BookingPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import ProtectedRoute from './routes/ProtectedRoutes'

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="events" element={<EventPage />} />
        <Route path="events/:id" element={<EventDetailsPage />} />

        <Route 
          path="book/:id"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="my-bookings"
          element={
            <ProtectedRoute>
              <UserListBookingPage />
            </ProtectedRoute>
          }
        />

        <Route 
          path="events/new"
          element={
            <ProtectedRoute adminOnly={true}>
              <CreateEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="events/:id/edit"
          element={
            <ProtectedRoute adminOnly={true}>
              <UpdateEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin-dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404</h1>} />
      </Route>
      
    </Routes>
  )
}

export default App
