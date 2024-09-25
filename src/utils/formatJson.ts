export const formatJson = (jsonInput: string) => {
  // Skip formatting if input is an empty array "[]" or has less than 6 characters
  if (jsonInput.trim() === '[]' || jsonInput.trim().length < 6) {
    return jsonInput;
  }

  try {
    const parsed = JSON.parse(jsonInput);
    return JSON.stringify(parsed, null, 2); // Prettify JSON with 2-space indentation
  } catch {
    return jsonInput; // Return original input if it's invalid
  }
};
