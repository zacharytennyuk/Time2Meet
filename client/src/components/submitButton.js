import React from 'react';

const SubmitButton = ({ children }) => {
  return (
      <button
          type="submit"
          className="bg-blue-800 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
          {children}
      </button>
  );
};
  
export default SubmitButton;