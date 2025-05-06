import { GenericDetail } from '@/components/GenericDetail';
import { ExperienceData } from '@/types/experience';

export default function ExperienceDetailPage({ params }: { params: { id: string } }) {
  
  return (
    <GenericDetail<ExperienceData>
      resourceName="experiences"
      apiEndpoint="/api/experiences"
      id={params.id}
      fields={[
        { key: 'title', label: 'Position' },
        { key: 'company', label: 'Company' },
        { key: 'location', label: 'Location' },
        { key: 'duration', label: 'Duration' },
        { key: 'description', label: 'Description', type: 'html' },
        { key: 'stack', label: 'Tech Stack' }
      ]}
    />
  );
}