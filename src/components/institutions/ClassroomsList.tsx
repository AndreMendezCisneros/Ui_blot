import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Classroom {
  id: string;
  name: string;
  type: string;
  capacity: number;
}

interface ClassroomsListProps {
  institutionId?: string;
}

// Mock data
const mockClassrooms: Record<string, Classroom[]> = {
  '1': [
    { id: '1', name: 'A-101', type: 'Lecture Hall', capacity: 120 },
    { id: '2', name: 'B-205', type: 'Laboratory', capacity: 30 },
    { id: '3', name: 'C-310', type: 'Seminar Room', capacity: 25 },
    { id: '4', name: 'D-150', type: 'Auditorium', capacity: 200 },
  ]
};

const ClassroomsList = ({ institutionId }: ClassroomsListProps) => {
  const [classrooms, setClassrooms] = useState<Classroom[]>(
    institutionId && mockClassrooms[institutionId] ? mockClassrooms[institutionId] : []
  );
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState<Classroom | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    capacity: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClassroom = (classroom: Classroom) => {
    setEditingClassroom(classroom);
    setFormData({
      name: classroom.name,
      type: classroom.type,
      capacity: classroom.capacity.toString()
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newClassroom = {
      id: editingClassroom ? editingClassroom.id : Math.random().toString(36).substring(2, 9),
      name: formData.name,
      type: formData.type,
      capacity: parseInt(formData.capacity, 10) || 0
    };
    
    if (editingClassroom) {
      // Update existing classroom
      setClassrooms(classrooms.map(c => 
        c.id === editingClassroom.id ? newClassroom : c
      ));
    } else {
      // Add new classroom
      setClassrooms([...classrooms, newClassroom]);
    }
    
    resetForm();
  };

  const handleDeleteClassroom = (id: string) => {
    setClassrooms(classrooms.filter(c => c.id !== id));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      capacity: ''
    });
    setEditingClassroom(null);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Classrooms</CardTitle>
            <CardDescription>Manage classrooms for this institution</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingClassroom(null);
                setFormData({ name: '', type: '', capacity: '' });
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Classroom
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingClassroom ? 'Edit Classroom' : 'Add Classroom'}
                </DialogTitle>
                <DialogDescription>
                  Enter classroom details below
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., A-101"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">Type</Label>
                    <Input
                      id="type"
                      name="type"
                      placeholder="e.g., Lecture Hall"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="capacity" className="text-right">Capacity</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      placeholder="e.g., 30"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Classroom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classrooms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No classrooms found
                  </TableCell>
                </TableRow>
              ) : (
                classrooms.map((classroom) => (
                  <TableRow key={classroom.id}>
                    <TableCell className="font-medium">{classroom.name}</TableCell>
                    <TableCell>{classroom.type}</TableCell>
                    <TableCell>{classroom.capacity}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClassroom(classroom)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDeleteClassroom(classroom.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassroomsList;