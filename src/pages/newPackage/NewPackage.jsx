import React, { useState ,useRef} from "react";
import "./newPackage.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getProducts } from "../../services/products.service";
import { useEffect } from "react";
import { PackageModel } from "../../model/packageModel";
import { addPackage } from "../../services/package.service";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import { CircularProgress } from "@mui/material";


const animatedComponents = makeAnimated();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function NewPackage() {
  const [inputValues, setInputValue] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
  });
  const [images, setImages] = useState();
  const [products, setProducts] = useState([]);
  const [options, setOptions] = useState([]);
  const [vertical, setVertical] = React.useState('top');
  const [horizontal, setHorizontal] = React.useState('center');
  const [message, setMessage] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const selectInputRef = useRef();
  const [severity, setSeverity] = useState("success");


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



  function clearSelected() {
    debugger;
    selectInputRef.current.clearValue();
    // selectInputRef.current.select.select.clearValue();
  }

  useEffect(() => {
    async function fetchMyAPI() {
      setIsProcessing(true);
      let response = await getProducts();
      if (response) {
        response.forEach((item) => {
          setOptions((options) => [
            ...options,
            { value: item.id, label: item.name },
          ]);
        });
      }
      console.log(options);
      setProducts(response);
      setIsProcessing(false);
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
            type: 2,
            img: imgBase64Path,
          };
          //images.push(data);
          setImages(data);
          debugger;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);

  // handle onChange event of the dropdown
  const handlepackageChange = (e) => {
   console.log("Hit");
    var chk = Array.isArray(e) ? e.map((x) => x.value) : [];
    debugger;
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const addPackageClick = async () => {
    setIsProcessing(true);
    //check if all the fields are filled or not
    if (
      inputValues.name === "" ||
      inputValues.description === "" ||
      inputValues.price === "" ||
      selectedValue.length === 0
    ) {
      debugger;
      alert("Please fill all the fields");

    }else{
      const data = new PackageModel(
        inputValues.name,
        inputValues.description,
        inputValues.price,
        selectedValue,
        images
      );
      const response = await addPackage(data);
      if (!response.isError) {
        setOpen(true);
        setMessage("Package Added Sucessfully");
        setSeverity("success");
      
        const clearData = {
          name: "",
          description: "",
          price: "",
          brand: "",
        };
        clearSelected();
        const clearImg = [];
        setImages(clearImg);
        setInputValue(clearData);
      } else {
        setOpen(true);
        setMessage("Package could not be added!");
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
          Package Added Successfully!
        </Alert>
      </Snackbar>

      <h1 className="addProductTitle">New Package</h1>

      <div className="addProductForm">
        <div className="addProductItem">
          <label>Name</label>
          <input
            name="name"
            value={inputValues.name}
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Name"
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="description"
            value={inputValues.description}
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Description of the product"
          />
        </div>
        <div className="addProductItem">
          <label>Products</label>
          <Select
            ref={selectInputRef}
            placeholder="Select Products"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            onChange={handlepackageChange}
            isClearable
          />
         
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            value={inputValues.price}
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Rs 5000"
          />
        </div>
        
        {images?.img ? (<div className="form-group multi-preview">
          <div>
            <img
              style={{ height: 80, padding: 2 }}
              src={images?.img}
              alt="preview"
            />
           
          </div>
        </div>):(null)}
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" onChange={uploadMultipleFiles} multiple />
        </div>

        <button
          onClick={addPackageClick}
          type="submit"
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
