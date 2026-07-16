// Silence Node.js Web Storage warning in Node v25+
if (typeof globalThis !== 'undefined') {
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0
      },
      writable: true,
      configurable: true,
      enumerable: true
    });
  } catch (e) {
    // ignore
  }
}
