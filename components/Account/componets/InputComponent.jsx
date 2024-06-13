import React from "react";

const InputField = ({ label, type, value, onChange, options, name }) => {
  const isTextarea = type === "textarea";
  const isSelect = type === "select";

  return (
    <div className={`mb-4 ${isTextarea ? "flex flex-col" : ""}`}>
      <label className="block text-gray-950">{label}</label>
      {isTextarea ? (
        <textarea
          value={value}
          onChange={onChange}
          className="w-96 p-2 border border-gray-300 rounded-md resize-none"
          rows="4"
        />
      ) : isSelect ? (
        <select
          value={value}
          onChange={onChange}
          className="w-96 p-2 border border-gray-300 rounded-md"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-96 p-2 border border-gray-300 rounded-md"
          name={name}
        />
      )}
    </div>
  );
};

export default InputField;
