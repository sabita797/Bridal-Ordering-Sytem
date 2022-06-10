import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { signUpService } from "../services/authServices";
import { postContactUs } from "../services/contactUs.service";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from "@mui/material";

const Container = styled.div``;
const Container2 = styled.div`
width: 98.7vw;
height: 100vh;
display: flex;
align-items: center;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 0, 0, 0.5)
    ),
    url("https://media.istockphoto.com/photos/hindu-wedding-ritual-wherein-bride-and-groom-hand-picture-id1186214696?k=20&m=1186214696&s=170667a&w=0&h=CxxDA51EcUq4OLVHoVoWVmemVFTTwk6OnZH7oKrR-Gg=")
      center;
  background-size: cover;
  justify-content: center;
`;

const ImgContainer = styled.div`
  width: 100%;
 
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

const Input1 = styled.input`
width: 100%;
max-width: 100%;
height: 120px;
padding: 12px 20px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
`;


const Button1 = styled.button`
  border: none;
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
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Contactus = () => {
  let history = useHistory();
  const [inputValues, setInputValue] = useState({
    name: "",
    email: "",
    phone:"",
    message: "",
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

  const route = () => {
    history.push('/')
  }

  const contactUs = async () => {
    //check if all fields are filled
    if (inputValues.name === "" || inputValues.email === "" || inputValues.phone === "" || inputValues.message === "") {
      alert("Please fill all the fields")
    }
      else{
        try {
        const response = await postContactUs(inputValues);
        debugger;
        if (response.isSuccess) {
          if (!response.isError) {
            debugger;
            setOpen(true);
            setTimeout(route, 2000)
          } else {
            setOpen(true);
            setMessage(response.message)
          }
        }
        debugger;
      } catch (error) {
        debugger;
        setOpen(true);
        setMessage('Error!! Try Later')
      }}
    
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
          Thankyou for Contacting Us!!
        </Alert>
      </Snackbar>
      <Navbar />
      <ImgContainer>
        <Container2>
          <Wrapper>
            <Title>CONTACT US</Title>
            <Form>
              <div>
                <Input
                  name="name"
                  onChange={(e) => handleChange(e)}
                  placeholder="Name"
                  type="text"
                  value={inputValues.name} />
              </div>
              <div>
                <Input
                  name="email"
                  onChange={(e) => handleChange(e)}
                  placeholder="Email"
                  type="email"
                  value={inputValues.email} />
              </div>
              <div>
                <Input
                  name="phone"
                  onChange={(e) => handleChange(e)}
                  placeholder="Phone"
                  type="phone"
                  value={inputValues.phone} />
              </div>
              {/* </InputStyle> */}
              <div>
                <Input1
                  name="message"
                  onChange={(e) => handleChange(e)}
                  placeholder="Write something.."
                  type="text"
                  value={inputValues.message} />
              </div>
              <Mystyle>
                <Button1
                  type="submit"
                  onClick={contactUs}
                >SEND</Button1>
              </Mystyle>
            </Form>
          </Wrapper>
        </Container2>
      </ImgContainer>
      <Footer />
    </Container>
  );
};

export default Contactus;
