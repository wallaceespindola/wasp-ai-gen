import React, { useState } from 'react';
import { useQuery, useAction, getUserAIData, createAIData } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { data: aIData, isLoading, error } = useQuery(getUserAIData);
  const createAIDataFn = useAction(createAIData);
  const [newAIDataContent, setNewAIDataContent] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateAIData = () => {
    createAIDataFn({ content: newAIDataContent });
    setNewAIDataContent('');
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='New AIData Content'
          className='px-1 py-2 border rounded text-lg'
          value={newAIDataContent}
          onChange={(e) => setNewAIDataContent(e.target.value)}
        />
        <button
          onClick={handleCreateAIData}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded ml-2'
        >
          Add AIData
        </button>
      </div>
      {aIData.map((data) => (
        <div
          key={data.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{data.content}</div>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;