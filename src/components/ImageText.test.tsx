import { render, screen } from '@testing-library/react';
import ImageText from './ImageText';

describe('ImageText Component', () => {
  it('renders the image, text, and title (if provided)', () => {
    const testImageURI = 'https://images.unsplash.com/photo-1579963333765-b4129b3250fc';
    const testText = 'This is a description';
    const testTitle = 'Sample Title';

    render(
      <ImageText
        imageURI={testImageURI}
        text={testText}
        title={testTitle}
        leftToRight={true}
      />
    );

    // Check if image is rendered with correct src and alt attributes
    const image = screen.getByAltText('image');
    expect(image).toHaveAttribute('src', testImageURI);
    expect(image).toHaveAttribute('alt', 'image');

    // Check if title is rendered
    expect(screen.getByText(testTitle)).toBeInTheDocument();

    // Check if text is rendered
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('renders the text without a title when no title is provided', () => {
    const testImageURI = 'https://images.unsplash.com/photo-1579963333765-b4129b3250fc';
    const testText = 'This is a description';

    render(
      <ImageText
        imageURI={testImageURI}
        text={testText}
        leftToRight={false} // To test the reverse layout
      />
    );

    // Check that the title is not rendered
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();

    // Check if image and text are still rendered
    const image = screen.getByAltText('image');
    expect(image).toHaveAttribute('src', testImageURI);
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('renders the layout based on leftToRight prop', () => {
    const testImageURI = 'https://images.unsplash.com/photo-1579963333765-b4129b3250fc';
    const testText = 'This is a description';

    const { container, rerender } = render(
      <ImageText
        imageURI={testImageURI}
        text={testText}
        leftToRight={true}
      />
    );

    // Check for the left-to-right layout by inspecting the parent div of the image and text
    const parentDiv = container.firstChild;
    expect(parentDiv).toHaveClass('flex-row');

    // Now test for the reverse layout
    rerender(
      <ImageText
        imageURI={testImageURI}
        text={testText}
        leftToRight={false}
      />
    );
    expect(parentDiv).toHaveClass('flex-row-reverse');
  });
});