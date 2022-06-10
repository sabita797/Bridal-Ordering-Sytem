import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { signUpService } from "../services/authServices";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    url("http://static1.squarespace.com/static/5654f20ee4b08c62b9ba7ccf/56550611e4b0c377c442ad09/60c3bfaa90c123526c65d427/1640177407418/Heidi-Paul-KEK-257.jpg?format=1500w")
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
  display:flex; 
  margin: 10px 20px 0px 0px;
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between;
`

const InputStyle = styled.div`
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

const AboutUs = () => {
    return (
        <Container>
            <Navbar />
            <ImgContainer>
            <Container2>
            <Wrapper>
                <Title>ABOUT US</Title>
                <Form>
                    <Agreement>
                        Welcome to Bride.com!

                        Bride.com provides a large selection of made-to-order wedding dresses, evening dresses, prom dresses, mother of the bride dresses, bridesmaid dresses, etc., online for customers to choose.

                        With a history of over 8 years, we have accompanied millions of ladies (women) through each special and memorable occasion, day and ceremony. Allagown will always be here to provide you personalized customer service, support by our wealth of experience in designing, tailoring, fitting, fabric selection and color choice. Our experienced dressmakers lovingly stitch each handcrafted detail and decoration, sewing happiness piece by piece to create a work of art that will be the centerpiece of your occasion celebration.

                        We strive to provide our customers with quality products at the best prices possible. With the unique style, tailor-made design and intimate service, each of our wedding dresses, evening dresses and prom dresses will make you the center of the attention. Allagown.com firmly believes that every woman deserves to be confident, comfortable and beautiful. We are happy to pass our expert experience and passion for dresses on to you.
                    </Agreement>
                </Form>
            </Wrapper>
            </Container2>
            </ImgContainer>
            <Footer />
        </Container>
    );
};

export default AboutUs;
