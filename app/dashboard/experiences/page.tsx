// app/experience/page.tsx
import { GenericListView } from '@/components/GenericListView';
import { ExperienceData } from '@/types/experience';

export default function ExperienceListPage() {
  return (
    <GenericListView<ExperienceData>
      resourceName="experiences"
      apiEndpoint="/api/experiences"
      displayFields={[
        { key: 'company', label: 'Company', width: '20%' },
        { key: 'title', label: 'Position', width: '25%' },
        { key: 'duration', label: 'Duration', width: '15%' },
      ]}
    />
  );
}