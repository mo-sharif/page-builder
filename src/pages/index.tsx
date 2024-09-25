import { useState, useCallback, useMemo } from 'react';
import DataFetch from "@/components/DataFetch";
import Hero from "@/components/Hero";
import ImageText from "@/components/ImageText";
import { useJsonHandler } from "@/hooks/useJsonHandler";
import { formatJson } from "@/utils/formatJson";
import useHotkey from "@/hooks/useHotkey";
import { Inconsolata } from 'next/font/google';
import { TEXT_CONSTANTS } from "@/utils/textConstants";

// Importing font for the JSON input panel
const codeFont = Inconsolata({ weight: '400', subsets: ['latin'] });

const Home = () => {
  const [jsonInput, setJsonInput] = useState('');
  const { sections, error } = useJsonHandler(jsonInput);

  // Memoize the hotkey callback to avoid unnecessary re-renders
  useHotkey(['Meta', 'f'], useCallback(() => {
    const formattedJson = formatJson(jsonInput);
    setJsonInput(formattedJson); // Format and set the JSON
  }, [jsonInput]));

  // Memoize the input change handler for input setting
  const handleJsonInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  }, []);

  // Memoize rendered sections to avoid unnecessary re-rendering
  const renderedSections = useMemo(() => {
    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    if (sections.length === 0) {
      return <div className="text-gray-500">{TEXT_CONSTANTS.DEFAULT_MESSAGE}</div>;
    }

    return sections.map((section, idx) => {
      switch (section.type) {
        case 'hero':
          return <Hero key={idx} imageURI={section.imageURI} />;
        case 'image-text':
          return (
            <ImageText
              key={idx}
              imageURI={section.imageURI}
              text={section.text}
              title={section.title}
              leftToRight={section.leftToRight}
            />
          );
        case 'data':
          return <DataFetch key={idx} url={section.url} />;
        default:
          return <div key={idx}>{TEXT_CONSTANTS.UNKNOWN_SECTION}</div>;
      }
    });
  }, [sections, error]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left panel: JSON Input */}
      <div className="w-full md:w-1/2 p-4 h-80 md:h-screen">
        <textarea
          value={jsonInput}
          onChange={handleJsonInputChange}
          className={`w-full h-full p-2 border-2 rounded bg-gray-900 text-green-500 ${codeFont.className} `}
          style={{
            fontSize: '1rem',
            borderColor: 'transparent',
            outline: 'none',
          }}
          placeholder={TEXT_CONSTANTS.PLACEHOLDER}
        />
      </div>

      {/* Right panel: Rendered sections */}
      <div className="w-full md:w-1/2 p-4 mt-4 mb-4 mr-4 text-gray-500 bg-gray-100 border-2 border-gray-300 rounded">
        {renderedSections}
      </div>
    </div>
  );
};

export default Home;