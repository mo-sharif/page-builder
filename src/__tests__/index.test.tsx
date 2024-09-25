import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages';
import { TEXT_CONSTANTS } from '@/utils/textConstants';

describe('Home Component', () => {
  it('renders the input text area and default message', () => {
    render(<Home />);

    // Use regular expression to match the placeholder with special characters
    const textarea = screen.getByPlaceholderText(
      /Enter valid JSON to generate a landing page/i
    );
    expect(textarea).toBeInTheDocument();

    // Check for the default message in the right panel
    const defaultMessage = screen.getByText(TEXT_CONSTANTS.DEFAULT_MESSAGE);
    expect(defaultMessage).toBeInTheDocument();
  });

  it('updates textarea value on input change', () => {
    render(<Home />);

    const textarea = screen.getByPlaceholderText(
      /Enter valid JSON to generate a landing page/i
    );
    fireEvent.change(textarea, {
      target: { value: '{"type": "hero", "imageURI": "cats.jpg"}' },
    });

    expect(textarea).toHaveValue('{"type": "hero", "imageURI": "cats.jpg"}');
  });

  it('displays error for invalid JSON input', () => {
    render(<Home />);

    const textarea = screen.getByPlaceholderText(
      /Enter valid JSON to generate a landing page/i
    );
    fireEvent.change(textarea, {
      target: { value: '{"type": "hero", "imageURI": "cats.jpg"' },
    });

    const errorMessage = screen.getByText(/Invalid JSON/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders sections based on valid JSON input', () => {
    render(<Home />);

    const textarea = screen.getByPlaceholderText(
      /Enter valid JSON to generate a landing page/i
    );
    fireEvent.change(textarea, {
      target: { value: '[{"type": "hero", "imageURI": "cats.jpg"}]' },
    });

    const heroImage = screen.getByAltText('Hero');
    expect(heroImage).toBeInTheDocument();
  });
});
