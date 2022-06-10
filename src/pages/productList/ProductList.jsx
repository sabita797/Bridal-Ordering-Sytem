import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../services/products.service";
import { CircularProgress } from "@mui/material";

export default function ProductList() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      setIsProcessing(true);
      const response = await getProducts();
      const data = response
        .filter((e) => e.status != 0)
        .map((item, i) => ({ ...item, rowIndex: i + 1 }));
      debugger;
      setData(data);
      setIsProcessing(false);
    }
    fetchMyAPI();
  }, []);

  if (isProcessing) {
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
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
    );
  }
}

const columns = [
  {
    field: "rowIndex",
    headerName: "SN",
    width: 100,
    renderCell: (params) => {},
  },
  {
    field: "name",
    headerName: "Product",
    width: 200,
    renderCell: (params) => {
      console.log("Params", params.row);
      return (
        <div className="productListItem">
          <img
            className="productListImg"
            src={params.row.images[0].img}
            alt=""
          />
          {params.row.name}
        </div>
      );
    },
  },
  { field: "brand", headerName: "Brand", width: 200 },

  {
    field: "price",
    headerName: "Price",
    width: 160,
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 120,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          <Link
            to={{
              pathname: "/product",
              state: {
                any: params.row.id,
              },
            }}
          >
            <button className="productListEdit">Edit</button>
          </Link>
          <DeleteOutline
            className="productListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        </div>
      );
    },
  },
];

const handleDelete = async (id) => {
  console.log("Delete Product ID:", id);
  try {
    const response = await deleteProduct(id);
    console.log("Delete Response:", response);
    //reload window
    // window.location.reload();
    debugger;
  } catch (error) {
    console.log(error);
  }
};
