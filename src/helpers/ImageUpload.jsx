import React, { useState } from "react";

const ImageUpload = ({ onFileChange }) => {
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setError(null);
        if (onFileChange) {
          onFileChange(file);
        }
      } else {
        setError("Por favor, sube solamente archivos de imagen.");
        event.target.value = null;
      }
    } 
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <p style={{ color: "red", fontSize:'12px', margin:'5px' }}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
