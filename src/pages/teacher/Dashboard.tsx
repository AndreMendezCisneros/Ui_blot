import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import DashboardCard from '@/components/DashboardCard';
import { Calendar, CalendarClock, CalendarRange, UserCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from an API
  const stats = {
    currentPeriod: "2025-1",
    scheduledHours: 18,
    availabilityStatus: "Completed",
    upcomingClasses: [
      { day: "Monday", time: "08:00 - 10:00", course: "Algebra I", location: "Room A-101" },
      { day: "Tuesday", time: "14:00 - 16:00", course: "Calculus", location: "Room B-205" }
    ]
  };

  return (
    <div>
      <PageHeader 
        title="Teacher Dashboard" 
        subtitle="Welcome to your academic scheduling dashboard"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard 
          title="My Availability" 
          value={stats.availabilityStatus}
          description="Your availability status for this period"
          icon={CalendarClock}
          iconColor="text-blue-500"
          onClick={() => navigate('/teacher/availability')}
        />
        
        <DashboardCard 
          title="My Schedule" 
          value={`${stats.scheduledHours} hours`}
          description="Total scheduled hours per week"
          icon={CalendarRange}
          iconColor="text-green-500"
          onClick={() => navigate('/teacher/schedules')}
        />
        
        <DashboardCard 
          title="Active Period" 
          value={stats.currentPeriod}
          description="Current academic period"
          icon={Calendar}
          iconColor="text-purple-500"
        />
        
        <DashboardCard 
          title="Profile" 
          value="View Details"
          description="Review your profile information"
          icon={UserCircle}
          iconColor="text-amber-500"
          onClick={() => navigate('/teacher/profile')}
          className="lg:col-span-2"
        />
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your next scheduled classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-medium">{classItem.course}</h3>
                    <p className="text-sm text-muted-foreground">
                      {classItem.day}, {classItem.time}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">{classItem.location}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;