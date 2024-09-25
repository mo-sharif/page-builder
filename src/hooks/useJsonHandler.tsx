import { useState, useEffect } from 'react';
import { Section } from '@/types/sections'; // Assuming the types file is in /types
import { TEXT_CONSTANTS } from '@/utils/textConstants';

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
          throw new Error(`${TEXT_CONSTANTS.JSON_INVALID_SECTION_ERROR}`);
        }
      } else {
        throw new Error(`${TEXT_CONSTANTS.JSON_ARRAY_ERROR}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`${TEXT_CONSTANTS.JSON_INVALID_JSON_ERROR}` + err.message);
      } else {
        setError(`${TEXT_CONSTANTS.JSON_UNKNOWN_ERROR}`);
      }
      setSections([]); // Clear sections in case of error
    }
  }, [jsonInput]);

  return { sections, error };
};
