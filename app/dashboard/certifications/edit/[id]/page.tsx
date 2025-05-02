'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Redirection from '@/components/Redirection';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

export default function EditCertification() {
    const router = useRouter();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        certificationName: "",
        certificationLink: "",
        issued: "",
        credentialId: "",
        issuedBy: ""
    });

    useEffect(() => {
        async function fetchCertification() {
            try {
                const response = await fetch(`/api/certifications/${id}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Certification not found');
                    }
                    throw new Error('Failed to fetch certification');
                }

                const data = await response.json();

                setFormData({
                    certificationName: data.certificationName,
                    certificationLink: data.certificationLink || '',
                    issued: data.issued,
                    credentialId: data.credentialId || '',
                    issuedBy: data.issuedBy
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            } finally {
                setIsLoading(false);
            }
        }

        fetchCertification();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`/api/certifications/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update certification');
            }

            toast.success("Certification updated successfully!")
            router.push('/dashboard/certifications')
            router.refresh(); // Refresh the page to show the updated data
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit Certification</h1>
                    <Redirection
                        href="/dashboard/certifications"
                        text='Back to List'
                    />
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label htmlFor="certificationName" className="block text-gray-700 text-sm font-bold mb-2">
                            Certification Name *
                        </label>
                        <input
                            type="text"
                            id="certificationName"
                            name="certificationName"
                            value={formData.certificationName}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="e.g. AWS Certified Solutions Architect"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="issuedBy" className="block text-gray-700 text-sm font-bold mb-2">
                            Issued By *
                        </label>
                        <input
                            type="text"
                            id="issuedBy"
                            name="issuedBy"
                            value={formData.issuedBy}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="e.g. Amazon Web Services"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="issued" className="block text-gray-700 text-sm font-bold mb-2">
                            Issue Date *
                        </label>
                        <input
                            type="date"
                            id="issued"
                            name="issued"
                            value={formData.issued}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="credentialId" className="block text-gray-700 text-sm font-bold mb-2">
                            Credential ID
                        </label>
                        <input
                            type="text"
                            id="credentialId"
                            name="credentialId"
                            value={formData.credentialId}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="e.g. AWS-ASA-12345"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="certificationLink" className="block text-gray-700 text-sm font-bold mb-2">
                            Certification Link
                        </label>
                        <input
                            type="url"
                            id="certificationLink"
                            name="certificationLink"
                            value={formData.certificationLink}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="https://example.com/verify-certification"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isSubmitting ? <FaSpinner className="animate-spin text-2xl text-gray-100" /> : 'Save Changes'}
                        </button>
                        <Link
                            href="/dashboard/certifications"
                            className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}