'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ShimmerUI from '@/components/ShimmerUI';
import ErrorMessage from '@/components/ErrorMessage';

export default function PdfList() {
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchResumes() {
            try {
                setLoading(true);
                // In client components, relative URLs work fine since they're resolved by the browser
                const response = await fetch('/api/resume');

                if (!response.ok) {
                    throw new Error('Failed to fetch PDFs');
                }

                const data = await response.json();

                setPdfs(data);
                setError('');
            } catch (err) {
                console.error('Error loading PDFs:', err);
                setError('Failed to load resumes. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        fetchResumes();
    }, []);

    if (loading) {
        return (
            <Layout>
                <ShimmerUI />
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <ErrorMessage error={error} title="resume" />
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="bg-white dark:bg-gray-900 py-12 px-4 md:px-8" id="resume">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        {pdfs.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <svg className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="mt-4">No resumes found</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {pdfs.map((pdf) => (
                                    <li key={pdf?.id} className="hover:bg-gray-50 flex justify-between items-center my-auto">
                                        <div className='p-4'>
                                            <Link href={`/resume/${pdf?.id}`}>
                                                <div className="flex items-center">
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-medium text-blue-600 truncate">
                                                            {pdf?.title}
                                                        </p>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0">
                                                        <svg
                                                            className="h-5 w-5 text-gray-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>

                                            </Link>
                                        </div>
                                        <div className="p-4">
                                            <a
                                                href={pdf.url}
                                                download="Md Imran Hossain [Software Engineer]"
                                                target='_blank'
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                            >
                                                Download PDF
                                                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </a>
                                        </div>
                                    </li>

                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
}