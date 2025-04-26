import React, { useState, useEffect } from 'react';
import { createEnrollment, getHealthPrograms, HealthProgram } from '../services/api';

interface ClientEnrollmentFormProps {
  clientId: string;
  onSuccess: () => void;
}

const ClientEnrollmentForm: React.FC<ClientEnrollmentFormProps> = ({ clientId, onSuccess }) => {
  const [programs, setPrograms] = useState<HealthProgram[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [enrollmentDate, setEnrollmentDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getHealthPrograms();
        setPrograms(data);
      } catch (err) {
        setError('Failed to fetch programs');
      }
    };
    fetchPrograms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createEnrollment({
        client_id: clientId,
        health_program_id: selectedProgram,
        enrollment_date: enrollmentDate,
        status: 'Active'
      });
      onSuccess();
    } catch (err) {
      setError('Failed to enroll client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      
      <div>
        <label htmlFor="program" className="block text-sm font-medium text-gray-700">
          Program
        </label>
        <select
          id="program"
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select a program</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="enrollmentDate" className="block text-sm font-medium text-gray-700">
          Enrollment Date
        </label>
        <input
          type="date"
          id="enrollmentDate"
          value={enrollmentDate}
          onChange={(e) => setEnrollmentDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? 'Enrolling...' : 'Enroll Client'}
      </button>
    </form>
  );
};

export default ClientEnrollmentForm; 