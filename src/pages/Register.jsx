import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { signUpService } from "../services/authServices";
import { useHistory } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import { IconButton } from "@material-ui/core";
import { Button } from "@mui/material";
import { Snackbar } from "@mui/material";
import { Close } from "@material-ui/icons";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 0, 0, 0.5)
    ),
    url("https://c4.wallpaperflare.com/wallpaper/189/32/933/gorgeous-bride-in-a-beautiful-dress-evening-wallpaper-preview.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.div`
border-radius: 5px;
background-color: #f2f2f2;
padding: 20px;
`;

const Input = styled.input`
width: 100%;
padding: 12px 20px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button2 = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Button1 = styled.button`
  border: none;
  margin: 0px 0px 0px 0px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Mystyle = styled.div`
  width: 100%;
  display:flex; 
  margin: 10px 20px 0px 0px;
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between;
`

const Danger = styled.div`
  color: red;
`

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  
  let history = useHistory();
  const [inputValues, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [open, setOpen] = React.useState(false);
  const [vertical, setVertical] = React.useState('top');
  const [horizontal, setHorizontal] = React.useState('center');
  const [message, setMessage] = React.useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
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
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const checkValidation = () => {
    let errors = validation;

    if (!inputValues.name.trim()) {
      errors.name = "Name is required";
    } else {
      errors.name = "";
    }

    const emailCond =
      "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
    if (!inputValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!inputValues.email.match(emailCond)) {
      errors.email = "Please ingress a valid email address";
    } else {
      errors.email = "";
    }

    const password = inputValues.password;
    if (!password) {
      errors.password = "password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be longer than 6 characters";
    } else {
      errors.password = "";
    }

    setValidation(errors);
  }

  const route = () => {
    history.push("/login")
  }

  const registerService = async () => {
    if (inputValues.name === "" || inputValues.email === "" || inputValues.password === "") {
      alert("Please fill all the fields")
    }  else {
      try {
        // if(validation.name && validation.email && validation.password === ""){
        const response = await signUpService(inputValues);
        const responseData = await response.json();
        debugger;
        if(response.ok){
          if(responseData.isError === false){
           setOpen(true);
            setMessage(response.message);
            setInputValue({
              name: '',
              email: '',
              password: '',
            })
            setTimeout(route,200);
  
          }else{
            setValidation({
              email: responseData.message
            })
            // alert(responseData.message)
          }
        }
        // } else {
        // }
        debugger;
      } catch {
  
      }
    }
    
  }
  return (
    <Container>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Registered Successfully!
        </Alert>
      </Snackbar>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <div>
            <Input
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Name"
              type="text"
              value={inputValues.name} />
            <Danger>
              {validation.name && <p>{validation.name}</p>}
            </Danger>
          </div>
          <div>
            <Input
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="email"
              type="email"
              value={inputValues.email} />
            <Danger>
              {validation.email && <p>{validation.email}</p>}
            </Danger>
          </div>
          {/* </InputStyle> */}
          <div>
            <Input
              name="password"
              onChange={(e) => handleChange(e)}
              placeholder="password"
              type="password"
              value={inputValues.password} />
            <Danger>
              {validation.password && <p>{validation.password}</p>}
            </Danger>
          </div>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Mystyle>
            <Button2
              type="submit"
              onClick={registerService}>CREATE</Button2>
            <Link to={'/login'}>
              <Button1>ALREADY HAVE AN ACCOUNT</Button1>
            </Link>
          </Mystyle>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
