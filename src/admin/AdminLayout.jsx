import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Image, Calendar, TrendingUp, Inbox, Star, Users, UserSquare2, LogOut, Menu, X, UserCircle,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { logout } from '../firebase/authApi';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/events', label: 'Events', icon: Calendar },
  { to: '/admin/programs', label: 'Programs', icon: TrendingUp },
  { to: '/admin/inbox', label: 'Contact Inbox', icon: Inbox },
  { to: '/admin/feedback', label: 'Feedback', icon: Star },
  { to: '/admin/team', label: 'Team', icon: UserSquare2 },
  { to: '/admin/users', label: 'Admins', icon: Users },
  { to: '/admin/profile', label: 'My Profile', icon: UserCircle },
];

export default function AdminLayout() {
  const { user, demoMode } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const doLogout = async () => {
    await logout();
    toast.success('Signed out');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-accent/40 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-primary text-white transform transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
          <img src="/logo.png" alt="Astack Foundation" className="w-8 h-8 object-contain" />
          <span className="font-display font-bold">Astack Admin</span>
        </div>
        <nav className="p-4 space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-secondary text-white' : 'text-accent/80 hover:bg-white/10'
                }`
              }
            >
              <item.icon size={17} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link to="/admin/profile" className="text-xs text-accent/60 mb-2 px-2 block hover:text-white transition-colors">
            {user?.email} · <span className="text-secondary-200">Admin</span>
          </Link>
          <button onClick={doLogout} className="flex items-center gap-2 text-sm text-accent/80 hover:text-white px-2 py-2">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between bg-white px-4 py-3 border-b border-primary-100 sticky top-0 z-20">
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu className="text-primary" /></button>
          <span className="font-display font-semibold text-primary">Astack Admin</span>
          <span className="w-6" />
        </header>
        {demoMode && (
          <div className="bg-secondary/10 text-secondary-700 text-xs text-center py-2 px-4">
            Running in demo mode — data is stored locally in this browser. Connect Firebase in web/.env to go live.
          </div>
        )}
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
