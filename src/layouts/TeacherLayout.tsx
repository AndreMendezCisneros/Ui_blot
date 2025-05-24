import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/teacher/Dashboard';
import Availability from '@/pages/teacher/Availability';
import Schedules from '@/pages/teacher/Schedules';
import Profile from '@/pages/teacher/Profile';
import { ScrollArea } from '@/components/ui/scroll-area';

// Icons
import { LayoutDashboard, CalendarClock, CalendarRange, UserCircle } from 'lucide-react';

const TeacherLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { href: '/teacher', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/teacher/availability', label: 'My Availability', icon: CalendarClock },
    { href: '/teacher/schedules', label: 'My Schedule', icon: CalendarRange },
    { href: '/teacher/profile', label: 'Profile', icon: UserCircle },
  ];

  useEffect(() => {
    if (location.pathname === '/teacher') {
      document.title = 'Dashboard | Teacher';
    } else {
      const currentItem = navItems.find(item => 
        location.pathname.startsWith(item.href) && item.href !== '/teacher'
      );
      if (currentItem) {
        document.title = `${currentItem.label} | Teacher`;
      }
    }
  }, [location.pathname]);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar navItems={navItems} userRole="teacher" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar username={user.name} role="Teacher" />
        
        <ScrollArea className="flex-1">
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
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

export default TeacherLayout;