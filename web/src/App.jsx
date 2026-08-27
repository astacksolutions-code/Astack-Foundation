import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Programs from './pages/Programs';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';

import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import GalleryManager from './admin/GalleryManager';
import EventsManager from './admin/EventsManager';
import ProgramsManager from './admin/ProgramsManager';
import ContactInbox from './admin/ContactInbox';
import FeedbackAnalytics from './admin/FeedbackAnalytics';
import UserManagement from './admin/UserManagement';
import TeamManager from './admin/TeamManager';
import AdminProfile from './admin/AdminProfile';

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
      <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
      <Route path="/programs" element={<PublicLayout><Programs /></PublicLayout>} />
      <Route path="/team" element={<PublicLayout><Team /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/feedback" element={<PublicLayout><Feedback /></PublicLayout>} />

      {/* Admin — single role, every signed-in admin has full access */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="gallery" element={<GalleryManager />} />
        <Route path="events" element={<EventsManager />} />
        <Route path="programs" element={<ProgramsManager />} />
        <Route path="inbox" element={<ContactInbox />} />
        <Route path="feedback" element={<FeedbackAnalytics />} />
        <Route path="team" element={<TeamManager />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}
