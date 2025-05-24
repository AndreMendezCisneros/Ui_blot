import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AvailabilityCalendar from '@/components/availability/AvailabilityCalendar';
import { Download, Upload } from 'lucide-react';

const Availability = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  
  // Mock data for teachers
  const teachers = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Robert Brown' }
  ];

  return (
    <div>
      <PageHeader 
        title="Availability" 
        subtitle="Manage teacher availability for scheduling"
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
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Teacher Selection</CardTitle>
          <CardDescription>
            Select a teacher to view or edit their availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedTeacher}
            onValueChange={setSelectedTeacher}
          >
            <SelectTrigger className="w-full sm:w-[300px]">
              <SelectValue placeholder="Select a teacher" />
            </SelectTrigger>
            <SelectContent>
              {teachers.map((teacher) => (
                <SelectItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      
      {selectedTeacher && (
        <Card>
          <CardHeader>
            <CardTitle>
              Availability for {teachers.find(t => t.id === selectedTeacher)?.name}
            </CardTitle>
            <CardDescription>
              Click on time slots to toggle availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AvailabilityCalendar teacherId={selectedTeacher} isEditable={true} />
            <div className="mt-4 flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Availability;