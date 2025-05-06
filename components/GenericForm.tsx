// components/notion/GenericForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Field {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'multiselect' | 'date' | 'checkbox';
    options?: string[]; // For select and multiselect
    required?: boolean;
}

interface GenericFormProps {
    fields: Field[];
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
    resourceName: string;
    isEdit?: boolean;
}

export function GenericForm({
    fields,
    initialData = {},
    onSubmit,
    resourceName,
    isEdit = false
}: GenericFormProps) {
    const [formData, setFormData] = useState<any>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    const handleMultiSelectChange = (name: string, value: string) => {
        const currentValues = formData[name] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v: string) => v !== value)
            : [...currentValues, value];

        setFormData({ ...formData, [name]: newValues });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await onSubmit(formData);
            router.push(`/dashboard/${resourceName}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 capitalize text-gray-900">
                {isEdit ? `Edit ${resourceName}` : `New ${resourceName}`}
            </h1>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div key={field.name} className="mb-4">
                        <label
                            htmlFor={field.name}
                            className="block text-sm font-medium text-gray-900 mb-1"
                        >
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>

                        {field.type === 'textarea' ? (
                            <textarea
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                required={field.required}
                                rows={4}
                                className="w-full p-2 border rounded text-gray-900 dark:border-gray-200"
                            />
                        ) : field.type === 'select' ? (
                            <select
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                required={field.required}
                                className="w-full p-2 border rounded text-gray-900"
                            >
                                <option value="">Select an option</option>
                                {field.options?.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === 'multiselect' ? (
                            <div className="space-y-2 text-gray-900">
                                {field.options?.map(option => (
                                    <div key={option} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`${field.name}-${option}`}
                                            checked={(formData[field.name] || []).includes(option)}
                                            onChange={() => handleMultiSelectChange(field.name, option)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`${field.name}-${option}`}>{option}</label>
                                    </div>
                                ))}
                            </div>
                        ) : field.type === 'checkbox' ? (
                            <input
                                type="checkbox"
                                id={field.name}
                                name={field.name}
                                checked={formData[field.name] || false}
                                onChange={handleChange}
                                className="mr-2"
                            />
                        ) : (
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                required={field.required}
                                className="w-full p-2 border rounded text-gray-900"
                            />
                        )}
                    </div>
                ))}

                <div className="flex justify-end mt-6 space-x-2">
                    <button
                        type="button"
                        onClick={() => router.push(`/${resourceName}`)}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
}

