import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Component', () => {
  it('renders the hero image with correct src and alt attributes', () => {
    const testImageURI = 'https://example.com/hero-image.jpg';

    render(<Hero imageURI={testImageURI} />);

    // Get the image element by alt text
    const heroImage = screen.getByAltText('Hero');

    // Assert the image src is correct
    expect(heroImage).toHaveAttribute('src', testImageURI);

    // Assert the alt attribute is correct
    expect(heroImage).toHaveAttribute('alt', 'Hero');
  });
});
