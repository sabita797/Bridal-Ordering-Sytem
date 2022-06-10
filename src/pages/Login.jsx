import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { loginService } from "../services/authServices";
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
    url("https://media.istockphoto.com/photos/engagement-ring-ceremony-indian-hindu-male-putting-ring-on-brides-picture-id1141906797?b=1&k=20&m=1141906797&s=170667a&w=0&h=nvMQMw5x5RYhp94jII9yklkImDpTCUKG8zkcm1cDFro=")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.div`
  display: flex;
  border-radius: 5px;
background-color: #f2f2f2;
padding: 20px;
  flex-direction: column;
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

const Button1 = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link1 = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Danger = styled.div`
  color: red;
`

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  let history = useHistory();
  const [inputValues, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = React.useState(false);
  const [vertical, setVertical] = React.useState('top');
  const [horizontal, setHorizontal] = React.useState('center');
  const [message, setMessage] = React.useState(false);

  const [validation, setValidation] = useState('');

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

  const route = () => {
    history.push("/")
  }

  const userlogin = async () => {
    debugger;
    try {
      debugger;
      const response = await loginService(inputValues);
      const responseData = await response.json();
      if (response.ok) {
        if (responseData.isError === false) {
          localStorage.setItem('LoginInfo', JSON.stringify(inputValues));
          localStorage.setItem('LogedIn', JSON.stringify(responseData.result));
          setOpen(true);
          setMessage(response.message);
          setTimeout(route,200)
        } else {
          setValidation(responseData.message)
        }
      }

      debugger;
    } catch {

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
          Logged In Successfully!
        </Alert>
      </Snackbar>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            name="email"
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            type="email"
            value={inputValues.email} />
          <Input
            name="password"
            onChange={(e) => handleChange(e)}
            placeholder="Password"
            type="password"
            value={inputValues.password} />
          <Danger>
            {validation && <p>{validation}</p>}
          </Danger>
          <Button1
            type="submit"
            onClick={userlogin}>LOGIN</Button1>
          {/* <Link1>DO NOT YOU REMEMBER THE PASSWORD?</Link1> */}
          <Link to={'/register'}>
            <Link1>CREATE A NEW ACCOUNT</Link1>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
