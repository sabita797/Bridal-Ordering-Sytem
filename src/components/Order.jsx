import styled from "styled-components";

import { useEffect, useState } from "react";
import { getOrders } from "../services/orderServices";
import { DataGrid } from "@mui/x-data-grid";

// function getDate(date:Date) {
//   return date.toISOString().slice(0,10).replace(/-/g,"");
// }

function getPrice(item) {
  let total = 0;
  for (let i = 0; i < item.length; i++) {
    total += item[i].product.price * item[i].quantity;
  }
  return total;
}

function getProducts(products) {
  //Return the name of products
  let productNames = [];
  for (let i = 0; i < products.length; i++) {
    productNames.push(products[i].product.name);
  }
  return productNames.join(", ");
}

const columns = [
  {
    field: "id",
    headerName: "Order Id",
    width: 200,
    renderCell: (params) => {
      return <div>#{params.row.id.substring(0, 5)}</div>;
    },
  },
  {
    field: "createdAt",
    headerName: "Date",
    width: 110,
    renderCell: (params) => {
      return (
        <div className="productListItem">{getDate(params.row.createdAt)}</div>
      );
    },
  },
  {
    field: "orderedProducts",
    headerName: "Products",
    width: 200,
    renderCell: (params) => {
      debugger;
      return <div>{getProducts(params.row.orderedProducts)}</div>;
    },
  },
  {
    field: "orderedProducts",
    headerName: "Total",
    width: 800,
    renderCell: (params) => {
      debugger;
      return (
        <div>
          Rs. {getPrice(params.row.orderedProducts)} for{" "}
          {getProducts(params.row.orderedProducts)}
        </div>
      );
    },
  },
];

//function to get date from dateandtime
function getDate(date) {
  var date = new Date(date);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return day + "/" + month + "/" + year;
}

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: row;
  padding: 10px;
  position: relative;
`;

const Image = styled.img`
  height: 60%;
  z-index: 2;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 20px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 20px;
`;

const Button = styled.button`
  margintop: 10px;
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Order = ({ item }) => {
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      setIsProcessing(true);
      const response = await getOrders();
      if (response) {
        setOrders(response);
      }
      setIsProcessing(false);
      debugger;
    }

    fetchMyAPI();
  }, []);

  if (isProcessing) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <DataGrid
          rows={orders}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
        />
        {/* {orders.map((item) => (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ marginRight: 20 }}>{item.id}</div>
             <div style={{marginRight:20}}>Product 1, Product 2</div>
            <div style={{marginRight:20}}>2021/12/21</div> 
          </div>
        ))} */}
      </Container>
    );
  }
};

export default Order;
