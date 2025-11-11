import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post("http://localhost:5001/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setImageURL(res.data.url);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>🖼️ Upload Image to Cloudinary</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginTop: "20px" }}
      />
      <br />
      <button
        onClick={handleUpload}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#fb8500",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload
      </button>

      {imageURL && (
        <div style={{ marginTop: "30px" }}>
          <h4>✅ Uploaded Image:</h4>
          <img
            src={imageURL}
            alt="uploaded"
            width="300"
            style={{ borderRadius: "10px", marginTop: "10px" }}
          />
          <p style={{ wordWrap: "break-word", marginTop: "10px" }}>{imageURL}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
