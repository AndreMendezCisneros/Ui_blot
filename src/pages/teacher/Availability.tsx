import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AvailabilityCalendar from '@/components/availability/AvailabilityCalendar';
import { useAuth } from '@/contexts/AuthContext';
import { Download, Upload, Info } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const Availability = () => {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader 
        title="My Availability" 
        subtitle="Manage your teaching availability"
      >
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </PageHeader>
      
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Please set your availability for the current academic period. 
          Click on the time slots to toggle your availability.
          Remember to save your changes.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>My Availability</CardTitle>
          <CardDescription>
            Click on time slots to toggle your availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user && (
            <AvailabilityCalendar teacherId={user.id} isEditable={true} />
          )}
          <div className="mt-4 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Availability;