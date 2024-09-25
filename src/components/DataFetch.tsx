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
            setError(`Failed to fetch data ${err}`);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData, url]);

    return (
        <div className="mb-8">
            {error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="flex items-start gap-2">
                    <button className="bg-blue-500 shadow-md rounded text-white p-2" onClick={fetchData}>
                        Refresh
                    </button>
                    <pre className="bg-gray-900 text-white p-2 rounded overflow-scroll">
                        {JSON.stringify(data, null, 2).substring(0, 300)}...
                    </pre>
                </div>
            )}
        </div>
    );
};

export default DataFetch;