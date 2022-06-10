import React from "react";

import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";
import styled from "styled-components";

const Title = styled.h1`
  margin: 20px;
`;

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Title>Packages</Title>
      <Categories />
      <Title>Products</Title>
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
