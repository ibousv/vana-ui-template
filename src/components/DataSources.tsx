'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';
import type { DataSource } from '@/types';

export default function DataSources() {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDataSources();
  }, []);

  const loadDataSources = async () => {
    try {
      setIsLoading(true);
      const sources = await apiService.getDataSources();
      setDataSources(sources);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data sources');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: DataSource['status']) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data Sources</h2>
          <p className="text-gray-600">Manage your database connections</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Add Data Source
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataSources.map((source) => (
          <div key={source.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{source.name}</h3>
                <p className="text-sm text-gray-500">{source.type}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(source.status)}`}>
                {source.status}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Host:</span> {source.host}</p>
              <p><span className="font-medium">Port:</span> {source.port}</p>
              <p><span className="font-medium">Database:</span> {source.database}</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Test
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {dataSources.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500">No data sources configured yet.</p>
          <button className="mt-4 text-blue-500 hover:text-blue-600">
            Add your first data source
          </button>
        </div>
      )}
    </div>
  );
}
