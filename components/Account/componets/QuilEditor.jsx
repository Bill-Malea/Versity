import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import React from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const QuillEditor = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: ["Roboto"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline"],
          ["link"],
          ["clean"],
        ],
      }}
      formats={[
        "header",
        "font",
        "list",
        "bullet",
        "bold",
        "italic",
        "underline",
        "link",
      ]}
      style={{ height: "300px", width: "500px", fontFamily: "Roboto" }}
    />
  );
};

export default QuillEditor;
