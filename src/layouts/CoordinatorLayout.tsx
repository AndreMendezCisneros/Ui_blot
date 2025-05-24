import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/coordinator/Dashboard';
import Institutions from '@/pages/coordinator/Institutions';
import Users from '@/pages/coordinator/Users';
import Availability from '@/pages/coordinator/Availability';
import Schedules from '@/pages/coordinator/Schedules';
import Profile from '@/pages/coordinator/Profile';
import { ScrollArea } from '@/components/ui/scroll-area';

// Icons
import { LayoutDashboard, Building2, Users2, CalendarClock, CalendarRange, UserCircle } from 'lucide-react';

const CoordinatorLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { href: '/coordinator', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/coordinator/institutions', label: 'Institutions', icon: Building2 },
    { href: '/coordinator/users', label: 'Users', icon: Users2 },
    { href: '/coordinator/availability', label: 'Availability', icon: CalendarClock },
    { href: '/coordinator/schedules', label: 'Schedules', icon: CalendarRange },
    { href: '/coordinator/profile', label: 'Profile', icon: UserCircle },
  ];

  useEffect(() => {
    if (location.pathname === '/coordinator') {
      document.title = 'Dashboard | Coordinator';
    } else {
      const currentItem = navItems.find(item => 
        location.pathname.startsWith(item.href) && item.href !== '/coordinator'
      );
      if (currentItem) {
        document.title = `${currentItem.label} | Coordinator`;
      }
    }
  }, [location.pathname]);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar navItems={navItems} userRole="coordinator" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar username={user.name} role="Coordinator" />
        
        <ScrollArea className="flex-1">
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/institutions/*" element={<Institutions />} />
              <Route path="/users" element={<Users />} />
              <Route path="/availability" element={<Availability />} />
              <Route path="/schedules" element={<Schedules />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CoordinatorLayout;