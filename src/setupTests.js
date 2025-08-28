



import '@testing-library/jest-dom';


if (!window.scrollTo) {
  
  window.scrollTo = () => {};
}

if (!window.URL.createObjectURL) {
  window.URL.createObjectURL = () => 'blob:mock-url';
}
