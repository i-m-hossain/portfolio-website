// src/app/recommendations/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRecommendationById } from '@/services/recommendationService';
import Redirection from '@/components/Redirection';
import RemoveItem from '@/components/RemoveItem';
import { formatDate } from '@/lib/utils';

export const revalidate = 86400
type tParams = Promise<{ id: string }>;
export default async function RecommendationDetail(
    props: { params: tParams }

) {
    const { id } = await props.params;
    const recommendation = await getRecommendationById(id);

    if (!recommendation) {
        notFound();
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Recommendation Details</h1>
                    <Redirection
                        href="/dashboard/recommendations"
                        text='Back to List'
                    />
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <p className="text-xl pb-2 mb-4 text-gray-900 border-b border-gray-300">{recommendation.text}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Full name</p>
                            <p className="text-gray-800">
                                {recommendation.firstName + " "+ recommendation.lastName}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Company</p>
                            <p className="text-gray-800">
                                {recommendation.company}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500">Job title</p>
                            <p className="text-gray-800">{recommendation.jobTitle}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Created At</p>
                            <p className="text-gray-800">{recommendation.creationDate}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex space-x-4">
                            <Link
                                href={`/dashboard/recommendations/edit/${recommendation.id}`}
                                className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded transition-colors"
                            >
                                Edit
                            </Link>

                            <RemoveItem  
                                api={`/api/recommendations/${recommendation.id}`}
                                redirectUrl="/dashboard/recommendations"
                                styles='bg-red-700 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors cursor-pointer' 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}