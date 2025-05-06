"use client"
import { GenericForm } from '@/components/GenericForm';
import { ExperienceData } from '@/types/experience';

export default function NewExperiencePage() {
    const handleSubmit = async (data: Partial<ExperienceData>) => {
        const response = await fetch('/api/experiences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to create item');
        }
    };

    return (
        <GenericForm
            fields={[
                { name: 'title', label: 'Title', type: 'text', required: true },
                { name: 'company', label: 'Company', type: 'text', required: true },
                { name: 'location', label: 'Location', type: 'select', options: ['Dhaka', 'San Francisco', 'New York', 'London'] },
                { name: 'duration', label: 'Duration', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'stack', label: 'Tech Stack', type: 'multiselect', options:['Nodejs','Java','Go', 'React', 'Spring-boot', 'Laravel', 'Nestjs', 'Docker', 'Kubernetes', 'Mysql', 'Mongodb', 'Python', 'Shellscript', 'AWS amplify', 'DynamoDB', 'AWS Lambda', 'AWS S3', 'Redis', 'Redis-sentinel', 'Nginx']}
            ]}
            onSubmit={handleSubmit}
            resourceName="experiences"
            initialData={{
                title: "",
                company: "",
                location: "",
                duration: '',
                description:'',
                stack:[]
            }}
        />
    );
}