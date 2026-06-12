import './App.css'
import { Routes, Route, Router } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RegisterPage from './pages/RegisterPage'
import EventPage from './pages/EventPage'
import EventDetailsPage from './pages/EventDetailsPage'
import CreateEventPage from './pages/CreateEventPage'
function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/events/new" element={<CreateEventPage />} />

      </Route>
      
    </Routes>
  )
}

export default App
