import "./packageList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getPackages, deletePackage } from "../../services/package.service";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function PackageList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getPackages();
      setData(response);
      setLoading(false);
      
    }

    fetchMyAPI();
  }, []);

  const arrayData = (data) => {
    if (data) {
      const Data = data.map((item) => item.name).join(", ");
      return Data;
    } else {
      return data;
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Package Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },

    {
      field: "products",
      headerName: "Products",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {arrayData(params.row.products)}
          </div>
        );
      },
    },

    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "description",
      headerName: "Description",
      width: 160,
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
                pathname: "/updatePackages",
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
      const response = await deletePackage(id);
      console.log("Delete Response:", response);
      //reload window
      window.location.reload();
      debugger;
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="productList">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "80vh",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </div>
    );
  } else {
    return (
      <div className="productList">
        <Link to="/newpackage">
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
