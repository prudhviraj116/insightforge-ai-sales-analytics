function UploadButton({ onUpload }) {

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <label className="bg-white text-black px-6 py-3 rounded-lg cursor-pointer shadow-lg hover:scale-105 transition mb-6 inline-block">
      Upload Data File
      <input
        type="file"
        accept=".csv"
        hidden
        onChange={handleChange}
      />
    </label>
  );
}

export default UploadButton;
