// src/app/blogs/page.tsx
import Link from 'next/link';
import { getAllBlogs, deleteBlog } from '@/services/blogService';
import RemoveBlog from '@/components/RemoveBlog';


export const metadata = {
  title: 'Blog Management',
  description: 'Manage your blog posts',
};

export default async function BlogList() {
  const blogs = await getAllBlogs();


  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link
          href="/dashboard/blogs/create"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
        >
          Add a blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No blog posts found</p>
          <Link href="/dashboard/blogs/create" className="text-blue-600 hover:underline mt-4 inline-block">
            Add a blog
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published channel
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {blog.publishedAt}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {blog.url ? (
                      <a
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {new URL(blog.url).hostname}
                      </a>
                    ) : (
                      'No URL'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/blogs/${blog.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/blogs/edit/${blog.id}`}
                        className="text-amber-600 hover:text-amber-900"
                      >
                        Edit
                      </Link>
                      <RemoveBlog blogId={blog.id}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

