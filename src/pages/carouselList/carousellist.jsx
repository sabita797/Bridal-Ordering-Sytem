import "./carousellist.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React from "react";
import { deleteCarousel, getCarousel } from "../../services/carousel.service";

const handleDelete = async (id) => {
  debugger;
  const response = await deleteCarousel(id);
  //reload window
  window.location.reload();
};

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Images",
    width: 200,
    renderCell: (params) => {
      debugger;
      console.log("Params", params.row);
      return (
        <div className="productListItem">
          <img className="productListImg" src={params.row.image.img} alt="" />
        </div>
      );
    },
  },

  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <DeleteOutline
            className="productListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      );
    },
  },
];

export default class CarouselList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isProcessing: true,
    };
  }

  componentDidMount = async () => {
    const response = await getCarousel();
    this.setState({ data: response });
    this.isProcessing = false;
    debugger;
  };

  render() {
    if (this.isProcessing) {
      return <div>PROCESSING</div>;
    } else {
      return (
        <div className="productList">
          <Link to="/newcarousel">
            <button className="productAddButton">Create</button>
          </Link>
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
