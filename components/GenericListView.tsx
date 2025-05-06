// components/notion/GenericListView.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface GenericListViewProps<T> {
  resourceName: string;       // e.g., "experience", "project"
  apiEndpoint: string;        // e.g., "/api/experience"
  displayFields: Array<{
    key: keyof T;
    label?: string;
    width?: string;           // CSS width value, e.g. "30%", "200px"
  }>;
  items?: T[];                // Optional pre-fetched items
}

export function GenericListView<T extends { id: string }>({
  resourceName,
  apiEndpoint,
  displayFields,
  items: initialItems
}: GenericListViewProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems || []);
  const [loading, setLoading] = useState(!initialItems);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!initialItems) {
      fetchItems();
    }
  }, [initialItems]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint);
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`${apiEndpoint}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      // Remove the item from state
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold capitalize text-gray-900">{resourceName} List</h1>
        <Link 
          href={`/dashboard/${resourceName}/create`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New {resourceName}
        </Link>
      </div>

      {items.length === 0 ? (
        <p>No {resourceName} items found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {displayFields.map((field) => (
                  <th 
                    key={String(field.key)} 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={field.width ? { width: field.width } : {}}
                  >
                    {field.label || String(field.key)}
                  </th>
                ))}
                <th scope="col" className="relative px-6 py-3 w-40">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {displayFields.map((field) => (
                    <td 
                      key={`${item.id}-${String(field.key)}`} 
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {String(item[field.key] || '')}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        href={`/dashboard/${resourceName}/${item.id}`}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        View
                      </Link>
                      <Link 
                        href={`/dashboard/${resourceName}/${item.id}/edit`}
                        className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-100 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
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

