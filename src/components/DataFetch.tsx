import { TEXT_CONSTANTS } from '@/utils/textConstants';
import React, { useState, useEffect, useCallback } from 'react';

interface DataFetchProps {
  url: string;
}

const DataFetch: React.FC<DataFetchProps> = ({ url }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(`${TEXT_CONSTANTS.DATA_FETCH_ERROR} ${err}`);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, url]);

  return (
    <div className='mb-8'>
      {error ? (
        <div className='text-red-500'>{error}</div>
      ) : (
        <div className='flex items-start gap-2'>
          <button
            className='rounded bg-blue-500 p-2 text-white shadow-md'
            onClick={fetchData}
          >
            Refresh
          </button>
          <pre className='overflow-scroll rounded bg-gray-900 p-2 h-96 text-white'>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DataFetch;
