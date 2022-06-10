import { useHistory, useLocation } from "react-router-dom";
import "./product.css";
import { useEffect, useState } from "react";
import { getProductById } from "../../services/products.service";
import React from "react";
import { ProductModel } from "../../model/model";
import { updateProduct } from "../../services/products.service";

const Product = (props) => {
  const location = useLocation();
  const id = location.state.any;
  const [isProcessing, setIsProcessing] = React.useState(true);
  const [product, setProduct] = React.useState({});

  const [inputValues, setInputValue] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
  });
  const [images, setImages] = useState([]);
  const [fileObj, setFileObj] = useState([]);

  const [validation, setValidation] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
  });

  useEffect(() => {
    async function fetchMyAPI() {
      const product = await getProductById(id);
      setProduct(product);
      debugger;
      setIsProcessing(false);

      //set the values of product to the inputValue
      setInputValue({
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        stock: product.stock,
      });
      setImages(product.images);
    }
    fetchMyAPI();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  function uploadMultipleFiles(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const imgBase64Path = e.target.result;
          const data = {
            type: 1,
            img: imgBase64Path,
          };
          setImages([...images, data]);
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  //delete the image of index
  function deleteImage(e, index) {
    setImages([...images.slice(0, index), ...images.slice(index + 1)]);
  }

  const updateProductClick = async () => {
    const data = new ProductModel(
      inputValues.name,
      inputValues.description,
      inputValues.price,
      inputValues.brand,
      inputValues.stock,
      images,
      "",
      ""
    );
    const response = await updateProduct(product.id, data);
    if (response.isError) {
      // setOpen(true);
      // setMessage(response.message);
    } else {
      // setOpen(true);
      // setMessage("Products Added Sucessfully");
      //reload window
      window.location.reload();
      // const clearData = {
      //   name: "",
      //   description: "",
      //   price: "",
      //   brand: "",
      //   stock: "",
      // };
      // const clearImg = [];
      // setImages(clearImg);
      // setInputValue(clearData);
    }
  };

  if (isProcessing) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Product</h1>
        </div>
        <div className="productTop">
          <div className="productTopRight">
            <div className="productInfoTop">
              <img
                src={product.images[0].img}
                alt=""
                className="productInfoImg"
              />
              <span className="productName">{product.name}</span>
            </div>
            <div className="productInfoBottom">
              <div style={{ display: "flex", width: "100%" }}>
                <span style={{ width: 100 }}>Id:</span>
                <span className="productInfoValue">{product.id}</span>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <span style={{ width: 100 }}>Description:</span>
                <span className="productInfoValue">{product.description}</span>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <span style={{ width: 100 }}>Price:</span>
                <span className="productInfoValue">Rs. {product.price}</span>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <span style={{ width: 100 }}>Stock:</span>
                <span className="productInfoValue">{product.stock}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          <h1 className="addProductTitle">Update Product</h1>
          <div className="productForm">
            <div className="productFormLeft">
              <div className="addProductItem">
                <label>Product Name</label>
                <input
                  name="name"
                  value={inputValues.name}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  placeholder="Product Name"
                />
              </div>
              <div className="addProductItem">
                <label>Description</label>
                <input
                  name="description"
                  value={inputValues.description}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  placeholder="Description of Product"
                />
              </div>
              <div className="addProductItem">
                <label>Brand</label>
                <input
                  name="brand"
                  value={inputValues.brand}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  placeholder="Brand"
                />
              </div>
              <div className="addProductItem">
                <label>Price</label>
                <input
                  name="price"
                  value={inputValues.price}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  placeholder="Price"
                />
              </div>
              <div className="addProductItem">
                <label>Stock</label>
                <input
                  name="stock"
                  value={inputValues.stock}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  placeholder="Stock"
                />
              </div>
            </div>
            <div className="productFormRight">
              <div
                style={{ display: "flex", flexDirection: "row", width: 200 }}
              >
                {images.map((url, index) => {
                  return (
                    <div
                      key={url}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <img
                        style={{ height: 80, padding: 2 }}
                        src={url.img}
                        alt="..."
                      />
                      <button
                        onClick={(e) => deleteImage(e, index)}
                        className="addProductButton"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="addProductItem">
                <label>Image</label>
                <input type="file" onChange={uploadMultipleFiles} multiple />
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={updateProductClick}
            className="addProductButton"
          >
            Update
          </button>
        </div>
      </div>
    );
  }
};
export default Product;
