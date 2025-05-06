// components/notion/GenericDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Field {
    key: string;
    label: string;
    type?: 'text' | 'html' | 'date' | 'tags';
}

interface GenericDetailProps<T> {
    resourceName: string;
    apiEndpoint: string;
    fields: Field[];
    id: string;
    item?: T;
}

export function GenericDetail<T>({
    resourceName,
    apiEndpoint,
    fields,
    id,
    item: initialItem
}: GenericDetailProps<T>) {
    const [item, setItem] = useState<T | null>(initialItem || null);
    const [loading, setLoading] = useState(!initialItem);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (!initialItem) {
            fetchItem();
        }
    }, [id, initialItem]);

    const fetchItem = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiEndpoint}/${id}`);
            if (!response.ok) throw new Error('Failed to fetch item');
            const data = await response.json();
            setItem(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const response = await fetch(`${apiEndpoint}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete');

            router.push(`/${resourceName}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!item) return <div>Item not found</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold capitalize text-gray-900">
                        {resourceName} Details
                    </h1>
                    <div className="space-x-2">
                        <Link
                            href={`/${resourceName}`}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-900"
                        >
                            Back to List
                        </Link>
                        <Link
                            href={`/${resourceName}/${id}/edit`}
                            className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200 text-gray-900"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="px-3 py-1 bg-red-100 rounded hover:bg-red-200 text-gray-900"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {fields.map((field) => {
                        const value = item[field.key as keyof T];

                        return (
                            <div key={field.key} className="border-b pb-3">
                                <dt className="text-sm font-medium text-gray-500">
                                    {field.label}
                                </dt>
                                <dd className="mt-1 text-lg">
                                    {field.type === 'html' ? (
                                        <div dangerouslySetInnerHTML={{ __html: String(value) }} />
                                    ) : field.type === 'tags' && Array.isArray(value) ? (
                                        <div className="flex flex-wrap gap-1">
                                            {value.map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        String(value || '')
                                    )}
                                </dd>
                            </div>
                        );
                    })}
                </dl>
            </div>
        </div>
    );
}