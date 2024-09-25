import { formatJson } from '@/utils/formatJson';

describe('formatJson', () => {
  it('should return the same input if it is an empty array "[]"', () => {
    const input = '[]';
    const result = formatJson(input);
    expect(result).toBe(input);
  });

  it('should return the same input if the length of input is less than 6 characters', () => {
    const input = '12345';
    const result = formatJson(input);
    expect(result).toBe(input);
  });

  it('should return formatted JSON if the input is valid JSON', () => {
    const input = '{"name":"CoderMo","age":404}';
    const result = formatJson(input);
    expect(result).toBe(JSON.stringify({ name: 'CoderMo', age: 404 }, null, 2));
  });

  it('should return the original input if the input is invalid JSON', () => {
    const input = '{"name": "CoderMo", "age": 404'; // Missing closing curly brace
    const result = formatJson(input);
    expect(result).toBe(input);
  });

  it('should trim extra spaces and return the formatted JSON', () => {
    const input = '    { "name": "CoderMo", "age": 404 }    ';
    const result = formatJson(input.trim());
    expect(result).toBe(JSON.stringify({ name: 'CoderMo', age: 404 }, null, 2));
  });
});
