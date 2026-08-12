import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";

function UploadButton({ onUpload, disabled = false }) {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (file.name.toLowerCase().endsWith(".csv")) {
      onUpload(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    handleFile(file);
  };

  return (
    <label
      onDragOver={(event) => {
        event.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      className={`flex cursor-pointer items-center justify-center rounded-[24px] border border-dashed px-4 py-4 transition ${
        disabled
          ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
          : dragActive
            ? "border-blue-400 bg-blue-50 text-blue-700"
            : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
      }`}
    >
      <input type="file" accept=".csv" hidden onChange={handleChange} disabled={disabled} />
      <div className="flex items-center gap-3">
        <span className={`rounded-2xl p-3 ${disabled ? "bg-slate-200 text-slate-400" : "bg-blue-600 text-white"}`}>
          <FaUpload />
        </span>
        <div>
          <p className="text-sm font-semibold">Upload sales CSV</p>
          <p className="text-xs text-slate-500">Drag and drop or browse</p>
        </div>
      </div>
    </label>
  );
}

export default UploadButton;