import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction, getAIData, updateAIData, deleteAIData } from 'wasp/client/operations';

const AIDataPage = () => {
  const { id } = useParams();
  const [editedContent, setEditedContent] = useState('');
  const { data: aidata, isLoading, error } = useQuery(() => getAIData({ id }));
  const updateAIDataFn = useAction(updateAIData);
  const deleteAIDataFn = useAction(deleteAIData);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateAIData = () => {
    updateAIDataFn({ id, content: editedContent });
  };

  const handleDeleteAIData = () => {
    deleteAIDataFn({ id });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>AIData Entry</h1>
      <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
        <div>{aidata.content}</div>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className='border p-2 rounded my-2'
        ></textarea>
        <button onClick={handleUpdateAIData} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>Update</button>
        <button onClick={handleDeleteAIData} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete</button>
      </div>
      <Link to={`/`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Back to Dashboard</Link>
    </div>
  );
}

export default AIDataPage;