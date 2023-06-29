import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      console.log(formData.get("image"));

      const { data } = await axios.post(
        "/api/v1/products/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk4MzM0NGVlYzE4YjhmN2IxNTg2OTgiLCJpYXQiOjE2ODc5NjE1MzUsImV4cCI6MTY4OTE3MTEzNX0._sV6aVradY9jLdwDgfVkX9v61lvcnbSQZaDER-byd8g",
          },
        }
      );

      console.log(data);
      alert("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    }
  };

  //   fectch the all images

  const fetchImage = async () => {
    try {
      const response = await axios.get("/api/v1/products/get-products");

      //   console.log(response.data);
      if (response.data) {
        setImageUrl(response.data.encodedImages);
        // console.log(response.data.encodedImages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div>
      <h1>Image Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      <div>
        {imageUrl && (
          <>
            <h2>Image Preview:</h2>
            {imageUrl.length > 0 ? (
              imageUrl.map((image, index) => (
                <img
                  key={index}
                  src={`data:image/svg+xml;base64,${image.image}`}
                  alt={`Image ${index + 1}`}
                  style={{ width: "300px", marginBottom: "20px" }}
                />
              ))
            ) : (
              <p>No images found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
