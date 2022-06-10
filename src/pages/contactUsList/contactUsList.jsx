import "./contactUsList.css";
import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import { getContactUs } from "../../services/contactUs.service";
import { CircularProgress } from "@material-ui/core";

const columns = [
  { field: "rowIndex", headerName: "SN", width: 100 },
  {
    field: "name",
    headerName: "Full Name",
    width: 150,
  },
  { field: "email", headerName: "Email", width: 180 },

  {
    field: "phone",
    headerName: "Phone",
    width: 130,
  },
  {
    field: "createdAt",
    headerName: "Date",
    width: 110,
  },
  {
    field: "message",
    headerName: "Message",
    width: 300,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <button
            onClick={() => handleClick(params.row.email)}
            className="productListEdit"
          >
            Reply
          </button>
        </>
      );
    },
  },
];

function handleClick(email) {
  debugger;
  console.log("Email", email);
  window.location.href = `mailto:${email}`;
}

export default class ContactUsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isProcessing: true,
    };
  }

  componentDidMount = async () => {
    this.setState({ isProcessing: true });
    const response = await getContactUs();
    const data = response
      .filter((e) => e.status != 0)
      .map((item, i) => ({ ...item, rowIndex: i + 1 }));
    this.setState({ data: data });
    this.setState({ isProcessing: false });
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
          <div style={{ fontSize: "16px", marginBottom: 10 }}>
            Contact Us Messages
          </div>
          {/* <Link to="/newproduct">
            <button className="productAddButton">Create</button>
          </Link> */}

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
