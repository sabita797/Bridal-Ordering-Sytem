import styled from "styled-components";
import { mobile } from "../responsive";
import Box from "@mui/material/Box";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import * as React from "react";
import UserProfile from "../components/UserProfile.jsx";
import  Order  from "../components/Order.jsx";

const Container = styled.div``;
const Container2 = styled.div`
  width: 98.7vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 0, 0, 0.5)),
    url("http://static1.squarespace.com/static/5654f20ee4b08c62b9ba7ccf/56550611e4b0c377c442ad09/60c3bfaa90c123526c65d427/1640177407418/Heidi-Paul-KEK-257.jpg?format=1500w")
      center;
  background-size: cover;
  justify-content: center;
`;

const ImgContainer = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 80%;
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
  align-items: center;
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

const Button = styled.button`
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
  display: flex;
  margin: 10px 20px 0px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputStyle = styled.div`
  width: 100%;
  display: flex;
  margin: 10px 20px 0px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Danger = styled.div`
  color: red;
`;

const Profile = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Navbar />
      <ImgContainer>
        <Container2>
          <Wrapper>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="Profile Tabs"
                  >
                    <Tab label="Profile" value="1" />
                    <Tab label="Orders" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1"><UserProfile/></TabPanel>
                <TabPanel value="2"><Order/></TabPanel>
              </TabContext>
            </Box>
          </Wrapper>
        </Container2>
      </ImgContainer>
      <Footer />
    </Container>
  );
};

export default Profile;
