import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import { getCarousel } from "../services/carouselService";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Container = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 60vh;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  width: 100%;
 
`;

const Image = styled.img`
  width: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      carousels: [],
      isProcessing: true,
    };
  }

  componentDidMount = async () =>{
      debugger;
      const response = await getCarousel();
      this.setState({
        carousels: response,
        isProcessing: false
      })
  
      const data = this.state.carousels;
      debugger;
    
  }

  handleClick = (direction) => {
    if (direction === "left") {
      this.setState({
        slideIndex : this.state.slideIndex > 0 ? this.state.slideIndex -1 : this.state.carousels.length-1
      })
    } else {
      this.setState({
        slideIndex : this.state.slideIndex < this.state.carousels.length-1  ? this.state.slideIndex +1 : 0
      })
    }
  };

  render(){

    if (this.state.isProcessing) {
      return (
        <Box sx={{ display: 'flex', alignItems:'center',justifyContent:'center',height:'40vh'  }}>
          <CircularProgress />
        </Box>
      );
    } else {

  return (
    <Container>
      <Arrow direction="left" onClick={() => this.handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={this.state.slideIndex}>
        {this.state.carousels.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.image.img} />
            </ImgContainer>
            {/* <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer> */}
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => this.handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
}}};

