import React from 'react';

const InputField = ({ label, type, value, onChange }) => {
  const isTextarea = type === 'textarea';

  return (
    <div className={`mb-4 ${isTextarea ? 'flex flex-col' : ''}`}>
      <label className="block text-gray-950">{label}</label>
      {isTextarea ? (
        <textarea
          value={value}
          onChange={onChange}
          className="w-96 p-2 border border-gray-300 rounded-md resize-none"
          rows="4" 
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-96 p-2 border border-gray-300 rounded-md"
        />
      )}
    </div>
  );
};

export default InputField;
