import "./newCarousel.css";
import React, { useState } from "react";
import { addCarousel } from "../../services/carousel.service";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewCarousel(props) {
  const [open, setOpen] = React.useState(false);
  const [vertical, setVertical] = React.useState("top");
  const [horizontal, setHorizontal] = React.useState("center");
  const [message, setMessage] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [images, setImages] = useState("");

  function uploadSingleFile(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const imgBase64Path = e.target.result;
          const data = {
            image: {
              img: imgBase64Path,
              type: 0,
            },
          };
          setImages(data);
          debugger;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  const addCarouselClick = async () => {
    setIsProcessing(true);
    debugger;
    //check if all fields are filled
    if (images==="") {
      alert("Please fill all fields");
      setIsProcessing(false);
      return;
    }
      
      
    const response = await addCarousel(images);
    if (response.isSuccess) {
      debugger;
      setOpen(true);
      setMessage("Carousel Added Sucessfully");
      setSeverity("success");

      const clearImg = [];
      setImages(clearImg);
      
    } else {
      debugger;
      setOpen(true);
      setMessage("Carousel could not be added");
      setSeverity("error");
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
      <h1 className="addProductTitle">New Carousel</h1>
      <div className="addProductForm">
        <div className="form-group multi-preview">
          {/* {(images || []).map(url => (
            <img style={{ height: 80 }} src={url.img} alt="..." />
          ))} */}
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" onChange={uploadSingleFile} multiple />
        </div>

        <button
          type="submit"
          onClick={addCarouselClick}
          className="addProductButton"
        >
          Create
        </button>
      </div>
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
