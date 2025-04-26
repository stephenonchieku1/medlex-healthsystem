import React, { useState } from 'react';
import { searchClients, Client } from '../services/api';

interface ClientSearchProps {
  onSelectClient: (client: Client) => void;
}

const ClientSearch: React.FC<ClientSearchProps> = ({ onSelectClient }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const data = await searchClients(query);
      setResults(data);
    } catch (err) {
      setError('Failed to search clients');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clients by name, email, or contact number"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="text-red-500">{error}</div>}

      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">Search Results</h3>
          <ul className="mt-2 divide-y divide-gray-200">
            {results.map((client) => (
              <li
                key={client.id}
                className="py-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelectClient(client)}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {client.first_name} {client.last_name}
                  </p>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {client.contact_number}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientSearch; 