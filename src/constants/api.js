export const BASE_URL ="https://localhost:5001";


//Products

export const GET_PRODUCTS = "/Product/get";
export const ADD_PRODUCTS = "/Product/add";
export const GET_PRODUCT_BY_ID = "/Product/getById";
export const UPDATE_PRODUCT = "/Product/update";
export const DELETE_PRODUCT = "/Product/delete";

export const GET_PACKAGES = "/Package/get";
export const ADD_PACKAGE = "/Package/add";
export const DElETE_PACKAGE = "/Package/delete";
export const GET_PACKAGE_BY_ID = "/Package/getById";

export const UPDATE_PACKAGE = "/Package/update";


//Productss

export const GET_CAROUSEL = "/Carousel/get";
export const ADD_CAROUSEL = "/Carousel/add";
export const DELETE_CAROUSEL = "/Carousel/delete";

//Contact Us
export const GET_CONTACT_US = "/ContactUs/get";

//Orders
export const GET_ORDERS = "/Order/get";

//Authentication
export const LOGIN = "/Authentication/login";
export const REGISTER = "/Authentication/register";


//Products
export const GET_PRODUCTS_URL = `${BASE_URL}${GET_PRODUCTS}`;
export const ADD_PRODUCTS_URL = `${BASE_URL}${ADD_PRODUCTS}`;
export const GET_PRODUCT_BY_ID_URL = `${BASE_URL}${GET_PRODUCTS}`;
export const DELETE_PRODUCT_URL = `${BASE_URL}${DELETE_PRODUCT}`;
export const UPDATE_PRODUCT_URL = `${BASE_URL}${UPDATE_PRODUCT}`;
export const ADD_PACKAGE_URL = `${BASE_URL}${ ADD_PACKAGE}`;
export const GET_PACKAGE_URL = `${BASE_URL}${GET_PACKAGES}`;
export const GET_PACKAGE_BY_ID_URL = `${BASE_URL}${GET_PRODUCTS}`;

export const DElETE_PACKAGE_URL = `${BASE_URL}${DElETE_PACKAGE}`;
export const UPDATE_PACKAGE_URL = `${BASE_URL}${UPDATE_PACKAGE}`;


//Authentication
export const USER_LOGIN = `${BASE_URL}${LOGIN}`;
export const USER_REGISTER = `${BASE_URL}${REGISTER}`;

//Carousel
export const GET_CAROUSEL_URL = `${BASE_URL}${GET_CAROUSEL}`;
export const ADD_CAROUSEL_URL = `${BASE_URL}${ADD_CAROUSEL}`;
export const DELETE_CAROUSEL_URL = `${BASE_URL}${DELETE_CAROUSEL}`;

//Contact Us
export const GET_CONTACT_US_URL = `${BASE_URL}${GET_CONTACT_US}`;

//Order
export const GET_ORDERS_URL = `${BASE_URL}${GET_ORDERS}`;

