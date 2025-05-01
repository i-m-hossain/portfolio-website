// src/app/blogs/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogById } from '@/services/blogService';
import Redirection from '@/components/Redirection';
import RemoveBlog from '@/components/RemoveBlog';



export default async function BlogDetail({
    params,
  }: {
    params: { id: string };
  }) {
    const { id } = params;
    const blog = await getBlogById(id);

    if (!blog) {
        notFound();
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Blog Details</h1>
                    <Redirection
                        href="/dashboard/blogs"
                        text='Back to List'
                    />
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">{blog.title}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Published Channel</p>
                            <p className="text-gray-800">
                                {blog.publishedAt}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500">URL</p>
                            {blog.url ? (
                                <a
                                    href={blog.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline break-all"
                                >
                                    {blog.url}
                                </a>
                            ) : (
                                <p className="text-gray-800">No URL provided</p>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex space-x-4">
                            <Link
                                href={`/dashboard/blogs/edit/${blog.id}`}
                                className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded transition-colors"
                            >
                                Edit
                            </Link>

                            <RemoveBlog blogId={blog.id} styles='bg-red-700 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors cursor-pointer'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}