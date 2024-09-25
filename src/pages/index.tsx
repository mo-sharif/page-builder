import { useState } from 'react';
import DataFetch from "@/components/DataFetch";
import Hero from "@/components/Hero";
import ImageText from "@/components/ImageText";
import { useJsonHandler } from "@/hooks/useJsonHandler";
import { formatJson } from "@/utils/formatJson";
import useHotkey from "@/hooks/useHotkey";

// Importing code-like font for the JSON input panel
import { Inconsolata } from 'next/font/google';

const codeFont = Inconsolata({ weight: '400', subsets: ['latin'] });

const Home = () => {
  const [jsonInput, setJsonInput] = useState('');
  const { sections, error } = useJsonHandler(jsonInput);

  // Hook to format JSON on CMD + F or Control + F
  useHotkey(['Meta', 'f'], () => {
    const formattedJson = formatJson(jsonInput);
    setJsonInput(formattedJson); // Format and set the JSON
  });

  const handleJsonInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left panel: JSON Input */}
      <div className="w-full md:w-1/2 p-4 h-80 md:h-svh">
        <textarea
          value={jsonInput}
          onChange={handleJsonInputChange}
          className={`w-full h-full p-2 border-2 rounded bg-gray-900 text-green-500 ${codeFont.className} `}
          style={{
            fontSize: '1rem',
            borderColor: 'transparent',
            outline: 'none',
          }}
          placeholder='Enter valid JSON to generate a landing page...'
        />
      </div>

      {/* Right panel: Rendered sections */}
      <div className="w-full md:w-1/2 p-4 mt-4 mb-4 mr-4 text-gray-500 bg-gray-100 border-2 border-gray-300 rounded">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          sections.length > 0 ? (
            sections.map((section, idx) => {
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
                  return <div key={idx}>Unknown section type</div>;
              }
            })
          ) : (
            <div className="text-gray-500">
              Start by entering a valid JSON on the left panel to generate the landing page!
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;