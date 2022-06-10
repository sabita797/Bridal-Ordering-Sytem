import {
  ADD_ORDER_URL,
  GET_ORDER_URL,
  GET_ADDRESS_URL,
  ADD_ADDRESS_URL,
  UPDATE_ADDRESS_URL,
} from "../constants/api";
import { getUserInfo } from "./authServices";

export async function placeOrder(address, products) {
  debugger;
  const user = await getUserInfo();
  const jwtToken = user.jwtToken;
  const requestBody = {
    userId: user.id,
    address: {
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
    },
    orderedProducts: products,
  };
  debugger;
  try {
    const response = await fetch(ADD_ORDER_URL, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getOrders() {
  const user = await getUserInfo();
  const jwtToken = user.jwtToken;
  const url = GET_ORDER_URL + "/" + user.id;
  debugger;
  try {
    const response = await fetch(url, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getAddress() {
  const user = await getUserInfo();
  const jwtToken = user.jwtToken;
  var url = GET_ADDRESS_URL + "/" + user.id;
  debugger;
  try {
    const response = await fetch(GET_ADDRESS_URL, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
    });
    const data = await response.json();
    debugger;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function addAddress(address) {
  const user = await getUserInfo();
  const jwtToken = user.jwtToken;
  debugger;
  try {
    const response = await fetch(ADD_ADDRESS_URL, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
      body: JSON.stringify(address),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateAddress(address, id) {
  const user = await getUserInfo();
  const jwtToken = user.jwtToken;
  const url = UPDATE_ADDRESS_URL + "/" + id;
  debugger;
  try {
    const response = await fetch(url, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
      body: JSON.stringify(address),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
