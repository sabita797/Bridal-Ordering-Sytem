import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;



const Container = styled.div`
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

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 60%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 180px;
  height: 40px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding:5px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Title = styled.h1`
  font-weight: 400;
  font-size: 20px;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 20px;
`;


const Product = ({ item }) => {
  debugger;
  return (
    <Link to={`/product/${item.id}`} underline="none" style={{ textDecoration: 'none',color: 'black'}}>
    <Container>
        <Image src={item.images[0].img} />
        <Title>{item.name}</Title>
        <Price>Rs. {item.price}</Price>
        {/* <Icon>
          <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{marginRight:10}}>Add To Cart</div>
            <ShoppingCartOutlined />
          </div>       
        </Icon> */}
    </Container>
    </Link>
  );
};

export default Product;
