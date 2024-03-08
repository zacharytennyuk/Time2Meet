import React from 'react';

function CreateAccountTextBox ({ label, name, type, value, onChange }) {
    return (
      <div>
        <label className="block text-blue-900">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 p-2 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
      </div>
    );
  };
  
  export default CreateAccountTextBox;