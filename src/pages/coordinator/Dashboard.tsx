import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import DashboardCard from '@/components/DashboardCard';
import { Building2, CalendarClock, CalendarRange, Clock, Users2 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from an API
  const stats = {
    institutions: 5,
    users: 24,
    schedules: 36,
    availabilityCompletionRate: "75%",
    activePeriod: "2025-1"
  };

  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        subtitle="Overview of your academic scheduling system"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard 
          title="Institutions" 
          value={stats.institutions}
          description="Total number of institutions"
          icon={Building2}
          iconColor="text-blue-500"
          onClick={() => navigate('/coordinator/institutions')}
        />
        
        <DashboardCard 
          title="Users" 
          value={stats.users}
          description="Active teachers and coordinators"
          icon={Users2}
          iconColor="text-green-500"
          onClick={() => navigate('/coordinator/users')}
        />
        
        <DashboardCard 
          title="Schedules" 
          value={stats.schedules}
          description="Total created schedules"
          icon={CalendarRange}
          iconColor="text-purple-500"
          onClick={() => navigate('/coordinator/schedules')}
        />
        
        <DashboardCard 
          title="Availability" 
          value={stats.availabilityCompletionRate}
          description="Teachers who completed their availability"
          icon={CalendarClock}
          iconColor="text-amber-500"
          onClick={() => navigate('/coordinator/availability')}
        />
        
        <DashboardCard 
          title="Active Period" 
          value={stats.activePeriod}
          description="Current academic period"
          icon={Clock}
          iconColor="text-red-500"
          onClick={() => navigate('/coordinator/profile')}
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* These would be additional action cards */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;