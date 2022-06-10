import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct, clearCart } from "../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  height: 200px;
  padding: 10px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  console.log(cart);

  //onCHeckout funtion to redirect to checkout page if cart is not empty && user is logged in
  const onCheckout = () => {
    //get user from localStorage
    const user = JSON.parse(localStorage.getItem("LogedIn"));
    
    if (cart.products.length > 0) {
      if (user) {
      window.location.href = "/checkout";
      }
      else {
        alert("Please login to checkout");
      }
    } else {
      alert("Cart is empty");
    }
  }
 
  //clearCart function to clear the cart
  const onClearCart = () => {
    dispatch(clearCart());
  }
  //removeProduct function to remove the product from the cart
  const removeProduct = (id) => {
    
  }


  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
        <Link to="/products" style={{ textDecoration: 'none' }}>
          <TopButton >CONTINUE SHOPPING</TopButton>
        </Link>
          <TopButton onClick={onClearCart} >Clear Cart</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            {/* <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product=>(
            <Product>
              <ProductDetail>
                <Image src={product.product.images[0].img}/>
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.product.name}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product.product.id}
                  </ProductId>
                  {/* <ProductColor color="black" /> */}
                  <ProductSize>
                    <b>Brand:</b> {product.product.brand}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  {/* <Add /> */}
                  <b>Items: </b> {product.quantity}
                  {/* <ProductAmount>{product.quantity}</ProductAmount> */}
                  {/* <Remove /> */}
                </ProductAmountContainer>
                <ProductPrice>Rs. {product.product.price}</ProductPrice>
              </PriceDetail>
            </Product>
            ))}
            <Hr />

            {cart.products.length===0?(<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}><Title>Cart is empty.</Title></div>):(null)}
            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. 100</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-Rs 100</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total}</SummaryItemPrice>
            </SummaryItem>



              <Button onClick={onCheckout}>CHECKOUT NOW</Button>
            {/* </Link> */}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
