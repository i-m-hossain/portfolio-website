// src/app/certifications/page.tsx
import Link from 'next/link';
import { getAllCertifications, deleteCertification } from '@/services/certificationService';
import RemoveItem from '@/components/RemoveItem';


export const metadata = {
  title: 'Certification Management',
  description: 'Manage your certification posts',
};

export default async function CertificationList() {
  const certifications = await getAllCertifications();


  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Certification list</h1>
        <Link
          href="/dashboard/certifications/create"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
        >
          Add a certification
        </Link>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No certification posts found</p>
          <Link href="/dashboard/certifications/create" className="text-blue-600 hover:underline mt-4 inline-block">
            Add a certification
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certification Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issued
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issued By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certifications.map((certification) => (
                <tr key={certification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{certification.certificationName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {certification.issued}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {certification.issuedBy }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/certifications/${certification.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/certifications/edit/${certification.id}`}
                        className="text-amber-600 hover:text-amber-900"
                      >
                        Edit
                      </Link>
                      <RemoveItem 
                        api={`/api/certifications/${certification.id}`}
                        redirectUrl="/dashboard/certifications"
                      />
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

