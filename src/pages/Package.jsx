import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import React from "react";
import { withRouter } from "react-router";
import { getProductById } from "../services/products.service";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPackageById } from "../services/package.service";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;
const ThumbnailImage = styled.img`
  height: 15vh;
  object-fit: cover;
  padding: 10px;
  ${mobile({ height: "3vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
  text-align: center;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const CTitle = styled.h1`
  font-weight: 400;
  font-size: 20px;
`;

const CDesc = styled.p`
  margin: 20px 0px;
`;

const CPrice = styled.span`
  font-weight: 100;
  font-size: 20px;
`;

const CImage = styled.img`
  height: 60%;
  z-index: 2;
`;
const CContainer = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
`;
const COLEND = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
`;

const PButton = styled.button`
  width: 10%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  display: flex;
  justify-content: center;
 
`;

const Package = (props) => {
  const [data, setData] = React.useState([]);
  const [isProcessing, setIsProcessing] = React.useState(true);
  const [packages, setPackage] = React.useState({});
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMyAPI() {
      const id = props.match.params.id;
      const packages = await getPackageById(id);
      debugger;
      setPackage(packages);
      setIsProcessing(false);
    }

    fetchMyAPI();
  }, []);



  
  

  function handleOnClick() {
    packages.products.map((product) => {
      dispatch(addProduct({product,quantity:1 }));
    });
    
  }

  if (isProcessing) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Container>
        <Navbar />
        <Title>{packages.name}</Title>
        <Wrapper>
         
          {packages.products.map((item, index) => (
            <CContainer>
              <CImage src={item.images[0].img} />
              <CTitle>{item.name}</CTitle>
              <CPrice>Rs. {item.price}</CPrice>
              <CDesc>{item.description}</CDesc>
            </CContainer>
          ))}
        </Wrapper>
      <COLEND>
        <PButton  onClick={handleOnClick}>Add to Cart</PButton>
      </COLEND>  

      

        <Footer />
      </Container>
    );
  }
};
export default withRouter(Package);
