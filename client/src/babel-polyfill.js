// Babel polyfill setup for older browsers
// This file ensures that modern JavaScript features work across different browsers

// Core-js polyfills for ECMAScript features
import 'core-js/stable';

// Regenerator runtime for async/await and generators
import 'regenerator-runtime/runtime';

// Optional: Additional polyfills for specific features
// Uncomment as needed:

// For fetch API support in older browsers
// import 'whatwg-fetch';

// For Symbol polyfill
// import 'core-js/es6/symbol';

// For Promise polyfill
// import 'core-js/es6/promise';

// For Array methods like .includes(), .find(), etc.
// import 'core-js/es7/array';

console.log('Babel polyfills loaded successfully');
