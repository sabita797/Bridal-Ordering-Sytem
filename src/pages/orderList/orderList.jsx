import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import { getOrders } from "../../services/orders.service";
import { CircularProgress } from "@material-ui/core";

const columns = [
  { field: "rowIndex", headerName: "SN", width: 100 },
  {
    field: "name",
    headerName: "Full Name",
    width: 150,
    renderCell: (params) => {
      return <div className="productListItem">{params.row.address.name}</div>;
    },
  },
  {
    field: "id",
    headerName: "Order ID",
    width: 150,
    renderCell: (params) => {
      return <div className="productListItem">{getId(params.row.id)}</div>;
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
  // {
  //   field: "action",
  //   headerName: "Action",
  //   width: 150,
  //   renderCell: (params) => {
  //     return (
  //       <>
  //         <button
  //           onClick={() => handleClick(params.row.email)}
  //           className="productListEdit"
  //         >
  //           Reply
  //         </button>
  //       </>
  //     );
  //   },
  // },
];

//function to display first 5 characters from a string
function getId(str) {
  return str.substring(0, 8);
}

//function to get date from dateandtime
function getDate(date) {
  var date = new Date(date);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return day + "/" + month + "/" + year;
}
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

function handleClick(email) {
  debugger;
  console.log("Email", email);
  window.location.href = `mailto:${email}`;
}

export default class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isProcessing: false,
    };
  }

  componentDidMount = async () => {
    //set isProcessing to true
    this.setState({ isProcessing: true });
    const response = await getOrders();
    debugger;
    const data = response
      .filter((e) => e.status != 0)
      .map((item, i) => ({ ...item, rowIndex: i + 1 }));
    this.setState({ data: data });
   this.setState({ isProcessing: false });
    debugger;
  };

  render() {
    if (this.state.isProcessing) {
      return  <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress />
    </div>;
    } else {
      return (
        <div className="productList">
          <div style={{ fontSize: "16px", marginBottom: 10 }}>Orders</div>
          <DataGrid
            rows={this.state.data}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
          />
        </div>
      );
    }
  }
}
