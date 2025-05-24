import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import InstitutionsList from '@/components/institutions/InstitutionsList';
import InstitutionDetail from '@/components/institutions/InstitutionDetail';

const Institutions = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <PageHeader 
                title="Institutions" 
                subtitle="Manage your educational institutions"
              >
                <Button onClick={() => navigate('/coordinator/institutions/new')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Institution
                </Button>
              </PageHeader>
              <InstitutionsList />
            </>
          }
        />
        <Route path="/new" element={<InstitutionDetail />} />
        <Route path="/:id" element={<InstitutionDetail />} />
        <Route path="/:id/classrooms" element={<InstitutionDetail activeTab="classrooms" />} />
        <Route path="/:id/careers" element={<InstitutionDetail activeTab="careers" />} />
      </Routes>
    </div>
  );
};

export default Institutions;