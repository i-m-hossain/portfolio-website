'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { RecommendationData } from '@/types/recommendations';
import Redirection from '@/components/Redirection';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { formatDate } from '@/lib/utils';

export default function EditRecommendation() {
    const router = useRouter();
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Omit<RecommendationData, 'id'>>({
        company: '',
        creationDate: '',
        firstName: '',
        lastName: '',
        jobTitle:'',
        text:'',
        status: 'active'
    });

    useEffect(() => {
        async function fetchRecommendation() {
            try {
                const response = await fetch(`/api/recommendations/${id}`);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Recommendation post not found');
                    }
                    throw new Error('Failed to fetch recommendation post');
                }

                const data = await response.json();
                const date =formatDate(data.creationDate, 'yyyy-MM-dd')
                setFormData({
                    company: data.company,
                    creationDate: date,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    jobTitle: data.jobTitle,
                    text: data.text,
                    status: data.status || 'active'
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            } finally {
                setIsLoading(false);
            }
        }

        fetchRecommendation();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`/api/recommendations/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update recommendation post');
            }
            toast.success("Recommendation updated successfully!")
            router.push("/dashboard/recommendations")
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
                    <h1 className="text-2xl font-bold">Edit Recommendation</h1>
                    <Redirection href='/dashboard/recommendations'/>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                                First Name *
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="First name"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Last name"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">
                                Company *
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Company name"
                            />
                        </div>
                        <div>
                            <label htmlFor="jobTitle" className="block text-gray-700 text-sm font-bold mb-2">
                                Job Title *
                            </label>
                            <input
                                type="text"
                                id="jobTitle"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Job title"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="creationDate" className="block text-gray-700 text-sm font-bold mb-2">
                            Creation Date *
                        </label>
                        <input
                            type="date"
                            id="creationDate"
                            name="creationDate"
                            value={formData.creationDate}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
                            Recommendation Text *
                        </label>
                        <textarea
                            id="text"
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Write the recommendation text here..."
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isSubmitting ? <FaSpinner className="animate-spin text-2xl text-gray-100" /> : 'Save Changes'}
                        </button>
                        <Link
                            href="/dashboard/recommendations"
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