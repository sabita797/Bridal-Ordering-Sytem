import styled from "styled-components";
import Box from "@mui/material/Box";
import UserImg from "../assets/user.png";
import { useEffect, useState, useRef } from "react";
import { getUserInfo } from "../services/authServices.jsx";
import {
  addAddress,
  getAddress,
  updateAddress,
} from "../services/orderServices.jsx";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import * as React from "react";
import Modal from "@mui/material/Modal";
import SimpleReactValidator from "simple-react-validator";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: relative;
`;
const MenuItem = styled.div`
  margintop: 10px;
  border: 2px solid teal;
  background-color: teal;
  color: white;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Image = styled.img`
  height: 60%;
  z-index: 2;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 20px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 20px;
`;

const Button = styled.button`
  margintop: 10px;
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Form = styled.div`
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 92%%;
  margin-top: 15px;
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

const Danger = styled.div`
  color: red;
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid teal",
  boxShadow: 24,
  p: 4,
};
const Mystyle = styled.div`
  width: 100%;
  display: flex;
  margin: 10px 20px 0px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserProfile = ({ item }) => {
  const [show, setShow] = useState(true);
  const [data, setData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [vertical, setVertical] = React.useState("top");
  const [horizontal, setHorizontal] = React.useState("center");
  const [message, setMessage] = React.useState("");
  const [address, setAddress] = React.useState("");

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getUserInfo();
      if (response) {
        setData(response);
        const address = await getAddress();
        if (address) {
          debugger;
          setAddress(address[0]);
        }
      }
    }

    fetchMyAPI();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputValues, setInputValue] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
  });

  const [Error, setError] = useState("");
  const simpleValidator = useRef(new SimpleReactValidator());
  function handleOnClick() {
    setInputValue({
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
    });
    handleOpen();
  }

  function handleChange(event) {
    setError("");
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  async function onSubmitClicked() {
    if (simpleValidator.current.allValid()) {
      debugger;
      try {
        if (address) {
          var response = await updateAddress(inputValues, address.id);
          debugger;
          if (response.isSuccess) {
            if (!response.isError) {
              debugger;
              setOpen(true);
              setMessage("Order Placed Successfully!");
              handleClose();
            } else {
              setOpen(true);
              setMessage(response.message);
            }
          }
        } else {
          var addResp = await addAddress(inputValues);
          debugger;
          if (addResp.isSuccess) {
            if (!addResp.isError) {
              debugger;
              setOpen(true);
              setMessage("Order Placed Successfully!");
              handleClose();
            } else {
              setOpen(true);
              setMessage(addResp.message);
            }
          }
        }
        window.location.reload();
      } catch (error) {
        debugger;
        setOpen(true);
        setMessage("Error!! Try Later");
      }
    } else {
      setError("Form Incomplete");
    }
  }

  const form = (
    <Box sx={style}>
      <Title>Shipping Address</Title>
      <Form>
        <div>
          <Input
            name="name"
            onChange={(e) => handleChange(e)}
            placeholder="Full Name"
            type="text"
            value={inputValues.name}
            onBlur={() => simpleValidator.current.showMessageFor("name")}
          />
          <Input
            name="phone"
            onChange={(e) => handleChange(e)}
            placeholder="Phone Number"
            type="number"
            value={inputValues.phone}
            onBlur={() => simpleValidator.current.showMessageFor("phone")}
          />
          <Danger>
            {simpleValidator.current.message(
              "phone",
              inputValues.phone,
              "required|min:10"
            )}
          </Danger>
        </div>
        <div>
          <Input
            name="street"
            onChange={(e) => handleChange(e)}
            placeholder="Street"
            type="text"
            value={inputValues.street}
            onBlur={() => simpleValidator.current.showMessageFor("street")}
          />
          <Danger>
            {simpleValidator.current.message(
              "street",
              inputValues.street,
              "required"
            )}
          </Danger>
        </div>
        <div>
          <Input
            name="city"
            onChange={(e) => handleChange(e)}
            placeholder="City"
            type="text"
            value={inputValues.city}
            onBlur={() => simpleValidator.current.showMessageFor("city")}
          />
          <Danger>
            {simpleValidator.current.message(
              "city",
              inputValues.city,
              "required"
            )}
          </Danger>
        </div>
        <div>
          <Input
            name="state"
            onChange={(e) => handleChange(e)}
            placeholder="State"
            type="text"
            value={inputValues.state}
            onBlur={() => simpleValidator.current.showMessageFor("state")}
          />
          <Danger>
            {simpleValidator.current.message(
              "state",
              inputValues.state,
              "required"
            )}
          </Danger>
        </div>
        <div>
          <Input
            name="country"
            onChange={(e) => handleChange(e)}
            placeholder="Country"
            type="text"
            value={inputValues.country}
            onBlur={() => simpleValidator.current.showMessageFor("country")}
          />
          <Danger>
            {simpleValidator.current.message(
              "country",
              inputValues.country,
              "required"
            )}
          </Danger>
        </div>
        <Danger>{Error}</Danger>
        <Mystyle>
          <Button type="submit" onClick={onSubmitClicked}>
            SUBMIT
          </Button>
        </Mystyle>
      </Form>
    </Box>
  );

  // <Snackbar
  //         anchorOrigin={{ vertical, horizontal }}
  //         open={open}
  //         autoHideDuration={4000}
  //         onClose={handleClose}
  //         key={vertical + horizontal}
  //       >
  //         <Alert
  //           onClose={handleClose}
  //           severity="success"
  //           sx={{ width: "100%" }}
  //         >
  //           {message}
  //         </Alert>
  //       </Snackbar>
  if (data) {
    return (
      <Container>
        <Box
          sx={{
            width: "50%",
            height: "100%",
            border: 1,
            borderColor: "#000",
            m: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={UserImg} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Title>{data.name}</Title>
            <Price>{data.email}</Price>
          </div>
        </Box>

        <Box
          sx={{
            width: "50%",
            height: "100%",
            border: 1,
            borderColor: "#000",
            m: 2,
            p: 2,
          }}
        >
          {!address ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                aliginItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Button onClick={handleOpen}>ADD SHIPPING ADDRESS</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                {form}
              </Modal>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  height: 25,
                  width: 200,
                  textAlign: "center",
                  backgroundColor: "teal",
                  position: "absolute",
                  right: "4%",
                  top: 0,
                  color: "white",
                }}
              >
                DEFAULT ADDRESS
              </div>
              <Price>Name</Price>
              <Title>{address.name}</Title>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Price>Address</Price>
                <Title>{address.street},</Title>
                <Title>
                  {address.city}, {address.state},
                </Title>
                <Title>{address.country}</Title>
              </div>

              <Price>Phone</Price>
              <Title>{address.phone}</Title>
              <Button onClick={handleOnClick}>EDIT</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                {form}
              </Modal>
            </div>
          )}
        </Box>
      </Container>
    );
  } else {
    return (
      <Container>
        <div>
          <Title>PLEASE LOGIN TO CONTINUE</Title>
          <div
            style={{
              display: "flex",
              aliginItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/register" style={{ textDecoration: "none" }}>
              <MenuItem>REGISTER</MenuItem>
            </Link>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <MenuItem>SIGN IN</MenuItem>
            </Link>
          </div>
        </div>
      </Container>
    );
  }
};

export default UserProfile;
