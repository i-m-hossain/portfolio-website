import Layout from '@/components/Layout';
import { getPdfById } from '@/services/resumeService';
import Link from 'next/link';
interface PdfDetailPageProps {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PdfDetailPage({ params }: PdfDetailPageProps) {
    try {
        const { id } = await params;
        const pdf = await getPdfById(id);
        return (
            <Layout>
                <div className="container mx-auto py-8 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <Link
                                href="/resume"
                                className="text-blue-600 hover:text-blue-800 flex items-center"
                            >
                                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to resume page
                            </Link>
                        </div>

                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-4">{pdf.title}</h1>

                                <div className="mb-6">
                                    <p className="text-sm text-gray-500">
                                        Last updated: {new Date(pdf.lastModified).toLocaleString()}
                                    </p>
                                </div>

                                <div className="border rounded-lg overflow-hidden">
                                    <iframe
                                        src={pdf.url}
                                        className="w-full h-screen"
                                        title={pdf.title}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    } catch (error) {
        return (
            <Layout>
                <div className="container mx-auto py-8 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <Link
                                href="/resume"
                                className="text-blue-600 hover:text-blue-800 flex items-center"
                            >
                                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to resume page
                            </Link>
                        </div>

                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-6 text-center">
                                <svg className="h-12 w-12 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h1 className="mt-4 text-xl font-bold text-gray-900">PDF Not Found</h1>
                                <p className="mt-2 text-gray-500">The PDF you're looking for could not be loaded.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}