import React, { useState ,useRef} from "react";
import "./updatePackages.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getProducts } from "../../services/products.service";
import { useEffect } from "react";
import { PackageModel } from "../../model/packageModel";
import { updatePackage } from "../../services/package.service";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getPackageById } from "../../services/package.service";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";






const animatedComponents = makeAnimated();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const action = (
//   <React.Fragment>
//     <Button color="secondary" size="small" onClick={handleClose}>
//       UNDO
//     </Button>
//     <IconButton
//       size="small"
//       aria-label="close"
//       color="inherit"
//       onClick={handleClose}
//     >
//       <CloseIcon fontSize="small" />
//     </IconButton>
//   </React.Fragment>
// );

export default function UpdatePackages() {
  
  const [inputValues, setInputValue] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
  });
  const [images, setImages] = useState("");
  const [products, setProducts] = useState([]);
  const [options, setOptions] = useState([]);
  const [vertical, setVertical] = React.useState('top');
  const [horizontal, setHorizontal] = React.useState('center');
  const [message, setMessage] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const selectInputRef = useRef();
  const location = useLocation();
  const id = location.state.any;
  const [isProcessing, setIsProcessing] = useState(false);
   // set value for default selection
   const [selectedValue, setSelectedValue] = useState([]);

   const [defaultValue, setDefaultValue] = useState([]);
   //delete the image of index
   function deleteImage(e, index) {
    setImages([...images.slice(0, index), ...images.slice(index + 1)]);
  }


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

  const [validation, setValidation] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
  });

  useEffect(() => {
    async function fetchMyAPI() {
      setIsProcessing(true);
      debugger;
      let response = await getPackageById(id);

      //set the values of product to the inputValue
      setInputValue({
        name: response.name,
        description: response.description,
        price: response.price,
        brand: response.brand,

      });
      setImages(response.image);
    
      //Set All Products to the dropdown
      let products = await getProducts();
      if (products) {
        products.forEach((item) => {
          setOptions((options) => [
            ...options,
            { value: item.id, label: item.name },
          ]);
        });
      }
      setProducts(products);
      
      response.products.forEach((item) => {
        debugger;
        setDefaultValue([
         
          ...defaultValue,
          { value: item.id, label: item.name },
        ]);
      });

      response.products.forEach((item) => {
        setSelectedValue([
          ...selectedValue,
          item.id,
        ]);
      });
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
 

  // handle onChange event of the dropdown
  const handlepackageChange = (e) => {
    console.log("Hit");
    var chk = Array.isArray(e) ? e.map((x) => x.value) : [];
    debugger;
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const defaultValues = (e) => {
    
    setSelectedValue(e);
  };

  const updatePackageClick = async () => {
    const data = new PackageModel(
      inputValues.name,
      inputValues.description,
      inputValues.price,
      selectedValue,
      images,
    );
    debugger;
    const response = await updatePackage(id,data);
    if (response.isError) {
      setOpen(true);
      setMessage(response.message);
    } else {
      setOpen(true);
      setMessage("Package updated Sucessfully");
      // const clearData = {
      //   name: "",
      //   description: "",
      //   price: "",
      //   brand: "",
      // };
      // clearSelected();
      // const clearImg = [];
      // setImages(clearImg);
      // setInputValue(clearData);
      window.location.reload();
    }
  };
  if(isProcessing){
    return (
      <div className="productList">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "80vh",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </div>
    );
  }
  else{return (
    <div className="newProduct">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Package Updated Successfully!
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
            defaultValue={defaultValue}
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
        <div className="form-group multi-preview">
          <div>
            <img
              style={{ height: 80, padding: 2 }}
              src={images.img}
              alt="preview"
            />
           
          </div>
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" onChange={uploadMultipleFiles} multiple />
        </div>

        <button
          onClick={updatePackageClick}
          type="submit"
          className="addProductButton"
        >
          Update
        </button>
      </div>
    </div>
  );}

  
}
