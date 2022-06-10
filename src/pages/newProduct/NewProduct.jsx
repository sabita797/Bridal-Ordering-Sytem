import "./newProduct.css";
import React, { useState } from "react";
import { ProductModel } from "../../model/model";
import { addProducts } from "../../services/products.service";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewProduct() {
  const [open, setOpen] = React.useState(false);
  const [vertical, setVertical] = React.useState("top");
  const [horizontal, setHorizontal] = React.useState("center");
  const [message, setMessage] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const [inputValues, setInputValue] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
  });
  const [images, setImages] = useState([]);

  const [validation, setValidation] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
  });

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

  const addProductClick = async () => {
    setIsProcessing(true);
    //check if all the fields are filled or not
    if (
      inputValues.name === "" ||
      inputValues.description === "" ||
      inputValues.price === "" ||
      inputValues.brand === "" ||
      inputValues.stock === "" ||
      images.length === 0
    ) {
      alert("Please fill all the fields");

    } else {
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
      const response = await addProducts(data);
      debugger;
      if (!response.isError) {
        setOpen(true);
        setMessage("Products Added Sucessfully");
        setSeverity("success");
        const clearData = {
          name: "",
          description: "",
          price: "",
          brand: "",
          stock: "",
        };
        const clearImg = [];
        setImages(clearImg);
        setInputValue(clearData);
      } else {
        setOpen(true);
        setMessage("Product could not be added!!!");
        setSeverity("error");
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="newProduct">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <h1 className="addProductTitle">New Product</h1>
      <div className="addProductForm">
        <div className="addProductItem">
          <label>Product Name</label>
          <input
            name="name"
            value={inputValues.name}
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Product Name"
          />
          <span >{validation.name}</span>
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
          <span className="error">{validation.description}</span>
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
          <span className="error">{validation.brand}</span>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            value={inputValues.price}
            type="number"
            onChange={(e) => handleChange(e)}
            placeholder="Price"
          />
          <span className="error">{validation.price}</span>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input
            name="stock"
            value={inputValues.stock}
            type="number"
            onChange={(e) => handleChange(e)}
            placeholder="Stock"
          />
          <span className="error">{validation.stock}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: 200 }}>
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
          <span className="error">{validation.image}</span>

        </div>

        <button
          type="submit"
          onClick={addProductClick}
          className="addProductButton"
        >
          Create
        </button>
      </div>
      {/* Set processing bar in absolute center postion while isProcessing is true */}
      {isProcessing && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </div>
      )}

    </div>
  );
}
