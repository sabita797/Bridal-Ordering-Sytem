export const BASE_URL ="https://localhost:5001";

//Products
export const GET_PRODUCTS = "/Product/get";
export const ADD_PRODUCTS = "/Product/add";
export const GET_PRODUCT_BY_ID = "/Product/:id";
export const DELETE_PRODUCT = "/Product/:id";


//Address
export const GET_ADDRESS = "/Address/getuseraddress";
export const ADD_ADDRESS = "/Address/add";
export const UPDATE_ADDRESS = "/Address/update";

//Contactus
export const ADD_CONTACTUS = "/ContactUs/add";


//Review
export const GET_REVIEW_BY_PRODUCTID = "/ProductRating/get";
export const ADD_REVIEWS = "/ProductRating/add";

//package
export const GET_PACKAGES = "/Package/get";
export const GET_PACKAGE_BY_ID = "/Package/get/:id";


//Authentication
export const LOGIN = "/Authentication/login";
export const REGISTER = "/Authentication/register";

//Carousel
export const GET_CAROUSEL = "/Carousel/get";

//Order
export const ADD_ORDER = "/Order/add"
export const GET_ORDER = "/Order/userorders";

//Payment Verification
export const PAYMENT_VERIFICATION = "/PaymentVerification";


//Products
export const GET_PRODUCTS_URL = `${BASE_URL}${GET_PRODUCTS}`;
export const ADD_PRODUCTS_URL = `${BASE_URL}${ADD_PRODUCTS}`;
export const GET_PRODUCT_BY_ID_URL = `${BASE_URL}${GET_PRODUCTS}`;
export const DELETE_PRODUCT_URL = `${BASE_URL}${DELETE_PRODUCT}`;

//packages
export const GET_PACKAGES_URL = `${BASE_URL}${GET_PACKAGES}`;
export const GET_PACKAGE_BY_ID_URL = `${BASE_URL}${GET_PACKAGE_BY_ID}`;

//Authentication
export const USER_LOGIN = `${BASE_URL}${LOGIN}`;
export const USER_REGISTER = `${BASE_URL}${REGISTER}`;

//Carousel
export const CAROUSEL = `${BASE_URL}${GET_CAROUSEL}`

//Order

export const ADD_ORDER_URL = `${BASE_URL}${ADD_ORDER}`;
export const GET_ORDER_URL = `${BASE_URL}${GET_ORDER}`;



//REVIEW
export const GET_REVIEW_BY_PRODUCTID_URL = `${BASE_URL}${GET_REVIEW_BY_PRODUCTID}`;
export const ADD_REVIEWS_URL = `${BASE_URL}${ADD_REVIEWS}`;

//Address
export const GET_ADDRESS_URL = `${BASE_URL}${GET_ADDRESS}`;
export const ADD_ADDRESS_URL = `${BASE_URL}${ADD_ADDRESS}`;
export const UPDATE_ADDRESS_URL = `${BASE_URL}${UPDATE_ADDRESS}`;

//Contactus
export const ADD_CONTACTUS_URL = `${BASE_URL}${ADD_CONTACTUS}`;

//Payment Verification
export const PAYMENT_VERIFICATION_URL = `${BASE_URL}${PAYMENT_VERIFICATION}`;

