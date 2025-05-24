import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Filter, Plus, Upload } from 'lucide-react';

const Schedules = () => {
  const [selectedInstitution, setSelectedInstitution] = useState<string>('');
  const [selectedCareer, setSelectedCareer] = useState<string>('');
  
  // Mock data
  const institutions = [
    { id: '1', name: 'Central University' },
    { id: '2', name: 'Technical Institute' }
  ];
  
  const careers = [
    { id: '1', name: 'Computer Science' },
    { id: '2', name: 'Business Administration' }
  ];
  
  const schedules = [
    {
      day: 'Monday',
      time: '08:00 - 10:00',
      course: 'Mathematics I',
      teacher: 'John Doe',
      classroom: 'A-101',
      career: 'Computer Science'
    },
    {
      day: 'Tuesday',
      time: '14:00 - 16:00',
      course: 'Business Ethics',
      teacher: 'Jane Smith',
      classroom: 'B-205',
      career: 'Business Administration'
    }
  ];

  return (
    <div>
      <PageHeader 
        title="Schedules" 
        subtitle="Manage academic schedules"
      >
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Schedule
          </Button>
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
          <CardTitle>Filters</CardTitle>
          <CardDescription>Select institution and career to view schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select
              value={selectedInstitution}
              onValueChange={setSelectedInstitution}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select institution" />
              </SelectTrigger>
              <SelectContent>
                {institutions.map((institution) => (
                  <SelectItem key={institution.id} value={institution.id}>
                    {institution.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedCareer}
              onValueChange={setSelectedCareer}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select career" />
              </SelectTrigger>
              <SelectContent>
                {careers.map((career) => (
                  <SelectItem key={career.id} value={career.id}>
                    {career.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Schedules</CardTitle>
          <CardDescription>View and manage academic schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Classroom</TableHead>
                  <TableHead>Career</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No schedules found
                    </TableCell>
                  </TableRow>
                ) : (
                  schedules.map((schedule, index) => (
                    <TableRow key={index}>
                      <TableCell>{schedule.day}</TableCell>
                      <TableCell>{schedule.time}</TableCell>
                      <TableCell>{schedule.course}</TableCell>
                      <TableCell>{schedule.teacher}</TableCell>
                      <TableCell>{schedule.classroom}</TableCell>
                      <TableCell>{schedule.career}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedules;