import { Badge } from "@material-ui/core";
import {
  ShoppingCartOutlined,
  AccountCircleOutlined,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserInfo } from "../services/authServices.jsx";

const Container = styled.div`
  backgroundcolor: "blue";
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  backgroundcolor: "blue";
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const MenuItems = styled.div`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  color: "white";
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Button = styled.button`
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  console.log(quantity);
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getUserInfo();
      setData(response);
    }

    fetchMyAPI();
  }, []);

  function onLogout() {
    localStorage.removeItem("LogedIn");
    window.location.reload();
  }

  return (
    <div style={{ backgroundColor: "#ec008c", height: 60 }}>
      <Wrapper>
        <Left>
          <div>
            <Link to={"/"}>
              <img height="40px" src={Logo} />
            </Link>
          </div>
        </Left>
        <Center>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <MenuItems>HOME</MenuItems>
          </Link>

          <Link
            to="/products"
            style={{ color: "white", textDecoration: "none" }}
          >
            <MenuItems>PRODUCT & PACKAGES</MenuItems>
          </Link>

          <Link
            to="/aboutus"
            style={{ color: "white", textDecoration: "none" }}
          >
            <MenuItems>ABOUT US</MenuItems>
          </Link>

          <Link
            to="/contactus"
            style={{ color: "white", textDecoration: "none" }}
          >
            <MenuItems>CONTACT US</MenuItems>
          </Link>
        </Center>
        <Right>
          {/* <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}

          {data ? (
            <div
              style={{
                display: "flex",
                aliginItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Link style={{ color: "white", textDecoration: "none" }}>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </Link>
              <Link to="/profile">
                <MenuItem>
                  <Badge color="primary">
                    <AccountCircleOutlined style={{ color: "white" }} />
                  </Badge>
                </MenuItem>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <Link
                to="/register"
                style={{ color: "white", textDecoration: "none" }}
              >
                <MenuItem>REGISTER</MenuItem>
              </Link>

              <Link
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </div>
          )}

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined style={{ color: "white" }} />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </div>
  );
};

export default Navbar;
