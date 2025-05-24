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
import { Plus, Pencil, Trash2, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Career {
  id: string;
  name: string;
  code: string;
  cycles: number;
}

interface CareersListProps {
  institutionId?: string;
}

// Mock data
const mockCareers: Record<string, Career[]> = {
  '1': [
    { id: '1', name: 'Computer Science', code: 'CS', cycles: 8 },
    { id: '2', name: 'Business Administration', code: 'BA', cycles: 8 },
    { id: '3', name: 'Mechanical Engineering', code: 'ME', cycles: 10 },
    { id: '4', name: 'Psychology', code: 'PSY', cycles: 9 },
  ]
};

const CareersList = ({ institutionId }: CareersListProps) => {
  const navigate = useNavigate();
  const [careers, setCareers] = useState<Career[]>(
    institutionId && mockCareers[institutionId] ? mockCareers[institutionId] : []
  );
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    cycles: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditCareer = (career: Career) => {
    setEditingCareer(career);
    setFormData({
      name: career.name,
      code: career.code,
      cycles: career.cycles.toString()
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCareer = {
      id: editingCareer ? editingCareer.id : Math.random().toString(36).substring(2, 9),
      name: formData.name,
      code: formData.code,
      cycles: parseInt(formData.cycles, 10) || 0
    };
    
    if (editingCareer) {
      // Update existing career
      setCareers(careers.map(c => 
        c.id === editingCareer.id ? newCareer : c
      ));
    } else {
      // Add new career
      setCareers([...careers, newCareer]);
    }
    
    resetForm();
  };

  const handleDeleteCareer = (id: string) => {
    setCareers(careers.filter(c => c.id !== id));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      cycles: ''
    });
    setEditingCareer(null);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Careers</CardTitle>
            <CardDescription>Manage careers for this institution</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingCareer(null);
                setFormData({ name: '', code: '', cycles: '' });
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Career
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingCareer ? 'Edit Career' : 'Add Career'}
                </DialogTitle>
                <DialogDescription>
                  Enter career details below
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Computer Science"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">Code</Label>
                    <Input
                      id="code"
                      name="code"
                      placeholder="e.g., CS"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cycles" className="text-right">Cycles</Label>
                    <Input
                      id="cycles"
                      name="cycles"
                      type="number"
                      placeholder="e.g., 8"
                      value={formData.cycles}
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
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Cycles</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No careers found
                  </TableCell>
                </TableRow>
              ) : (
                careers.map((career) => (
                  <TableRow key={career.id}>
                    <TableCell className="font-medium">{career.name}</TableCell>
                    <TableCell>{career.code}</TableCell>
                    <TableCell>{career.cycles}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditCareer(career)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            // In a real app, navigate to cycle management
                            console.log(`Navigate to cycles for career ${career.id}`);
                          }}
                        >
                          <Layers className="h-4 w-4" />
                          <span className="sr-only">Manage Cycles</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDeleteCareer(career.id)}
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

export default CareersList;