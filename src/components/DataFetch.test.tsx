import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DataFetch from '@/components/DataFetch';
import { TEXT_CONSTANTS } from '@/utils/textConstants';

// Mocking the fetch API globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Mocked data' }),
  })
) as jest.Mock;

describe('DataFetch Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display fetched data correctly', async () => {
    render(<DataFetch url="https://cat-fact.herokuapp.com/facts" />);

    // Waiting for the data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText(/Mocked data/)).toBeInTheDocument();
    });
  });

  it('should display an error message if the fetch fails', async () => {
    // Mock fetch to throw an error
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Fetch error'))
    );

    render(<DataFetch url="https://cat-fact.herokuapp.com/facts" />);

    // Waiting for the error to be displayed using a more flexible matcher (regex or function)
    await waitFor(() => {
      expect(screen.getByText((content, element) => 
        content.includes(TEXT_CONSTANTS.DATA_FETCH_ERROR) && content.includes('Fetch error')
      )).toBeInTheDocument();
    });
  });

  it('should allow the user to refresh the data', async () => {
    render(<DataFetch url="https://cat-fact.herokuapp.com/facts" />);

    // Click the refresh button
    const refreshButton = screen.getByText('Refresh');
    fireEvent.click(refreshButton);

    // Check if the fetch was called again
    expect(fetch).toHaveBeenCalledTimes(2);

    // Wait for the refreshed data to display
    await waitFor(() => {
      expect(screen.getByText(/Mocked data/)).toBeInTheDocument();
    });
  });
});