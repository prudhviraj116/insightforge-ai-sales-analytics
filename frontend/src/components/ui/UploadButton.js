function UploadButton({ onUpload, disabled = false }) {
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      e.target.value = ""; // reset input so same file can be uploaded again
    }
  };

  return (
    <label
      className={`px-6 py-3 rounded-lg shadow-lg transition mb-6 inline-block
        ${disabled 
          ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
          : "bg-white text-black cursor-pointer hover:scale-105"}
      `}
    >
      Upload Data File
      <input
        type="file"
        accept=".csv"
        hidden
        onChange={handleChange}
        disabled={disabled}
      />
    </label>
  );
}

export default UploadButton;