import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Pencil, Trash2, Building2 } from 'lucide-react';

// Mock data
const mockInstitutions = [
  { id: '1', name: 'Central University', location: 'Downtown', type: 'University' },
  { id: '2', name: 'Technical Institute', location: 'North Campus', type: 'Institute' },
  { id: '3', name: 'Arts Academy', location: 'Cultural District', type: 'Academy' },
  { id: '4', name: 'Science College', location: 'Research Park', type: 'College' },
  { id: '5', name: 'Business School', location: 'Financial District', type: 'School' },
];

const InstitutionsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredInstitutions = mockInstitutions.filter(institution => 
    institution.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    institution.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institution.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <Input
            placeholder="Search institutions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstitutions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Building2 className="h-8 w-8 mb-2" />
                      <p>No institutions found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredInstitutions.map((institution, index) => (
                  <TableRow key={institution.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell 
                      className="font-medium hover:text-primary cursor-pointer"
                      onClick={() => navigate(`/coordinator/institutions/${institution.id}`)}
                    >
                      {institution.name}
                    </TableCell>
                    <TableCell>{institution.location}</TableCell>
                    <TableCell>{institution.type}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => navigate(`/coordinator/institutions/${institution.id}`)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/coordinator/institutions/${institution.id}/classrooms`)}>
                            <Building2 className="mr-2 h-4 w-4" />
                            Manage Classrooms
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default InstitutionsList;