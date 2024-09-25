import { useState, useEffect } from 'react';
import { Section } from '@/types/sections'; // Assuming the types file is in /types

export const useJsonHandler = (jsonInput: string) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the input is empty, and if so, clear sections and error
    if (!jsonInput.trim()) {
      setSections([]);
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);

      // Check if parsed is an array
      if (Array.isArray(parsed)) {
        // Ensure each element in the array is one of the Section types
        const isValid = parsed.every((section: Section) => 
          ['hero', 'image-text', 'data'].includes(section.type)
        );

        if (isValid) {
          setSections(parsed as Section[]); // Type cast after validation
          setError('');
        } else {
          throw new Error('Invalid section type in JSON.');
        }
      } else {
        throw new Error('JSON must be an array of sections');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError('Invalid JSON: ' + err.message);
      } else {
        setError('An unknown error occurred');
      }
      setSections([]); // Clear sections in case of error
    }
  }, [jsonInput]);

  return { sections, error };
};