import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Schedules = () => {
  // Mock data for schedule
  const schedules = [
    {
      day: 'Monday',
      time: '08:00 - 10:00',
      course: 'Mathematics I',
      classroom: 'A-101',
      institution: 'Central University'
    },
    {
      day: 'Tuesday',
      time: '14:00 - 16:00',
      course: 'Physics II',
      classroom: 'B-205',
      institution: 'Central University'
    },
    {
      day: 'Wednesday',
      time: '10:00 - 12:00',
      course: 'Calculus',
      classroom: 'A-103',
      institution: 'Technical Institute'
    }
  ];

  return (
    <div>
      <PageHeader 
        title="My Schedule" 
        subtitle="View your teaching schedule"
      >
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Current Schedule</CardTitle>
          <CardDescription>Your assigned classes for this period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Classroom</TableHead>
                  <TableHead>Institution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No schedules found
                    </TableCell>
                  </TableRow>
                ) : (
                  schedules.map((schedule, index) => (
                    <TableRow key={index}>
                      <TableCell>{schedule.day}</TableCell>
                      <TableCell>{schedule.time}</TableCell>
                      <TableCell>{schedule.course}</TableCell>
                      <TableCell>{schedule.classroom}</TableCell>
                      <TableCell>{schedule.institution}</TableCell>
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