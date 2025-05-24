import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ClassroomsList from '@/components/institutions/ClassroomsList';
import CareersList from '@/components/institutions/CareersList';

interface InstitutionDetailProps {
  activeTab?: string;
}

const InstitutionDetail = ({ activeTab = "details" }: InstitutionDetailProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewInstitution = id === 'new';
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: ''
  });

  useEffect(() => {
    if (!isNewInstitution) {
      // In a real app, this would be an API call
      // For demo purposes, using mock data
      if (id === '1') {
        setFormData({
          name: 'Central University',
          location: 'Downtown',
          type: 'University'
        });
      }
    }
  }, [id, isNewInstitution]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log('Saving institution:', formData);
    navigate('/coordinator/institutions');
  };

  return (
    <div>
      <PageHeader
        title={isNewInstitution ? "Add Institution" : "Edit Institution"}
        subtitle={isNewInstitution ? "Create a new educational institution" : "Update institution details"}
      >
        <Button variant="outline" onClick={() => navigate('/coordinator/institutions')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </PageHeader>

      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger 
            value="details" 
            onClick={() => {
              if (!isNewInstitution && activeTab !== "details") {
                navigate(`/coordinator/institutions/${id}`);
              }
            }}
          >
            Details
          </TabsTrigger>
          <TabsTrigger 
            value="classrooms" 
            disabled={isNewInstitution}
            onClick={() => {
              if (!isNewInstitution && activeTab !== "classrooms") {
                navigate(`/coordinator/institutions/${id}/classrooms`);
              }
            }}
          >
            Classrooms
          </TabsTrigger>
          <TabsTrigger 
            value="careers" 
            disabled={isNewInstitution}
            onClick={() => {
              if (!isNewInstitution && activeTab !== "careers") {
                navigate(`/coordinator/institutions/${id}/careers`);
              }
            }}
          >
            Careers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Institution Information</CardTitle>
              <CardDescription>
                Enter the basic details for this educational institution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Institution Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter institution name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Institution Type</Label>
                    <Input
                      id="type"
                      name="type"
                      placeholder="University, College, Institute, etc."
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Institution location or address"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    {isNewInstitution ? 'Create Institution' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="classrooms">
          <ClassroomsList institutionId={id} />
        </TabsContent>
        
        <TabsContent value="careers">
          <CareersList institutionId={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstitutionDetail;