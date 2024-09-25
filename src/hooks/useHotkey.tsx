import { useEffect } from 'react';

const useHotkey = (keyCombo: string[], callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if all keys in the keyCombo are pressed
      const isKeyComboPressed = keyCombo.every((key) => {
        if (key === 'Meta' && event.metaKey) return true;
        if (key === 'Control' && event.ctrlKey) return true;
        if (key === 'Shift' && event.shiftKey) return true;
        if (key.toLowerCase() === event.key.toLowerCase()) return true;
        return false;
      });

      if (isKeyComboPressed) {
        event.preventDefault(); // Prevent default behavior
        callback(); // Trigger the callback when the hotkey is pressed
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyCombo, callback]);
};

export default useHotkey;