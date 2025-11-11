import React, { useState } from "react";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    sizes: "",
    colors: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!image) return alert("Please select an image!");

    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    form.append("image", image);

    try {
      const res = await fetch("http://localhost:5001/api/products/add", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Product added successfully!");
        setFormData({
          name: "",
          price: "",
          description: "",
          category: "",
          sizes: "",
          colors: "",
        });
        setImage(null);
        setPreview("");
      } else {
        setMessage("❌ Failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server Error");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "700px" }}>
      <h2 className="fw-bold mb-4 text-center">🛍️ Add New Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Shirt, Shoes)"
          value={formData.category}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <input
          type="text"
          name="sizes"
          placeholder="Sizes (comma separated, e.g. S,M,L,XL)"
          value={formData.sizes}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <input
          type="text"
          name="colors"
          placeholder="Colors (comma separated)"
          value={formData.colors}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <div className="mb-3">
          <label className="form-label">Product Image:</label>
          <input type="file" onChange={handleImageChange} className="form-control" />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="img-thumbnail mt-3"
              style={{ maxHeight: "250px" }}
            />
          )}
        </div>

        <button className="btn btn-warning w-100 fw-bold py-2">Add Product</button>
      </form>

      {message && <p className="text-center mt-4 fw-semibold">{message}</p>}
    </div>
  );
};

export default AddProductPage;
