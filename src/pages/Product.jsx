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
import ChatBot from "react-simple-chatbot";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { getReviewByProductId, postReview } from "../services/review.service";
import { getUserInfo } from "../services/authServices";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ReviewWrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
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
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

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

const SButton = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = (props) => {
  const [value, setValue] = React.useState(2);
  const [isProcessing, setIsProcessing] = React.useState(true);
  const [product, setProduct] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const [review, setReview] = React.useState("");
  const [reviews, setReviews] = React.useState();
  const [user, setUser] = React.useState("");
  const [productId, setProductId] = React.useState("");

  useEffect(() => {
    async function fetchMyAPI() {
      debugger;
      const id = props.match.params.id;
      setProductId(id);
      const product = await getProductById(id);
      setProduct(product);
      const rev = await getReviewByProductId(id);
      if (rev) {
        debugger;
        setReviews(rev);
      }
      const user = await getUserInfo();
      setUser(user);
      setIsProcessing(false);
    }

    fetchMyAPI();
  }, []);

  const handleChange = (event) => {
    setReview(event.target.value);
  };

  //function to return date from dateandtime
  function getDate(date) {
    var date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
  }

  function ReviewsCard(props) {
    const review = props.review;
    return (
      <React.Fragment>
        <CardContent>
          <Rating name="read-only" value={review.rating} readOnly />
          <Typography sx={{ mb: 1.5 }}>{review.message}</Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {review.userName}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {getDate(review.createdAt)}
            </Typography>
          </div>
        </CardContent>
      </React.Fragment>
    );
  }
  const reviewCard = (
    <React.Fragment>
      <CardContent>
        <Typography component="legend">Rate the product.</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        {/* <Typography component="legend">Rate the product.</Typography> */}
        <TextField
          id="outlined-multiline-flexible"
          label="Write your review..."
          fullWidth
          multiline
          maxRows={4}
          value={review}
          onChange={handleChange}
        />
      </CardContent>
    </React.Fragment>
  );

  function setIndexx(e) {
    e.stopPropagation();
    setIndex(e.target.id);
  }
  function handleIncrement(e) {
    e.stopPropagation();
    //check the quantity of the product before incerment
    if (product.stock>quantity) {
      var c = quantity + 1;
      setQuantity(c);
    }else{
      alert("Out of stock");
    }
  }

  function handleDecrement(e) {
    debugger;
    e.stopPropagation();
    if (quantity > 0) {
      var c = quantity - 1;
      setQuantity(c);
    }
  }

  function handleOnClick() {
    //check if quantity of product is more than 0
    if (quantity > 0) {
      dispatch(addProduct({ product, quantity }));
    }else
    {
      alert("Please choose atleast one quantity.");
    }
  }

  async function onReviewSubmit() {
    const producReview = {
      userName: user.name,
      productId: productId,
      message: review,
      rating: value,
    };
    const response = await postReview(producReview);
    //reload window
    window.location.reload();
  }

  function showChat() {
    setVisible(true);
  }

  function hideChat() {
    setVisible(false);
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
        <Wrapper>
          <ImgContainer>
            <Image src={product.images[index].img} />
            {product.images.map((item, index) => (
              <ThumbnailImage id={index} src={item.img} onClick={setIndexx} />
            ))}
          </ImgContainer>
          <InfoContainer>
            <Title>{product.name}</Title>
            <Desc>{product.description}</Desc>
            <Price>Rs. {product.price}</Price>
            <AddContainer>
              <AmountContainer>
                <Remove onClick={handleDecrement} />
                <Amount>{quantity}</Amount>
                <Add onClick={handleIncrement} />
              </AmountContainer>
              {product.stock>0?(<SButton onClick={handleOnClick}>Add to cart</SButton>):(<SButton disabled>Out of stock</SButton>)}
              {/* <SButton onClick={handleOnClick}>ADD TO CART</SButton> */}
            </AddContainer>
            <Desc>Stock: {product.stock}</Desc>

            <div
              style={{
                //background: "red",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                height: "50%",
                width: "100%",
              }}
            >
              {!visible ? (
                <SButton onClick={showChat}>CHAT</SButton>
              ) : (
                <SButton onClick={hideChat}>CLOSE</SButton>
              )}
              {visible ? (
                <ChatBot
                  steps={[
                    {
                      id: "1",
                      message: "What is your name?",
                      trigger: "name",
                    },
                    {
                      id: "name",
                      user: true,
                      trigger: "3",
                    },
                    {
                      id: "3",
                      message: "Hi {previousValue}! What is your gender?",
                      trigger: "gender",
                    },
                    {
                      id: "gender",
                      options: [
                        { value: "male", label: "Male", trigger: "5" },
                        { value: "female", label: "Female", trigger: "5" },
                      ],
                    },
                    {
                      id: "5",
                      message: "How old are you?",
                      trigger: "age",
                    },
                    {
                      id: "age",
                      user: true,
                      trigger: "end-message",
                      validator: (value) => {
                        if (isNaN(value)) {
                          return "value must be a number";
                        } else if (value < 0) {
                          return "value must be positive";
                        } else if (value > 120) {
                          return `${value}? Come on!`;
                        }

                        return true;
                      },
                    },

                    {
                      id: "end-message",
                      message: "Thanks! Your data was submitted successfully!",
                      end: true,
                    },
                  ]}
                />
              ) : null}
            </div>
          </InfoContainer>
        </Wrapper>

        <ReviewWrapper>
          {/* Review */}
          <Box
            sx={{
              minWidth: "45%",
              borderRadius: 3,
              border: 1,
              p: 2,
              borderColor: "#f8f4f4",
            }}
          >
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Add Your Review
            </Typography>
            <Card
              sx={{ borderRadius: 3, boxShadow: 3, mb: 2 }}
              variant="outlined"
            >
              {reviewCard}
            </Card>
            <SButton onClick={onReviewSubmit}>SUBMIT</SButton>
          </Box>
          {/* Reviews */}
          <Box
            sx={{
              minWidth: "45%",
              borderRadius: 3,
              border: 1,
              p: 2,
              borderColor: "#f8f4f4",
            }}
          >
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Product Reviews
            </Typography>
            {reviews.map((item, index) => (
              <Card
                sx={{ borderRadius: 3, boxShadow: 3, mb: 2 }}
                variant="outlined"
              >
                <ReviewsCard review={item} />
              </Card>
            ))}
          </Box>
        </ReviewWrapper>

        <Footer />
      </Container>
    );
  }
};
export default withRouter(Product);
