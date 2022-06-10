import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useState } from "react";
import { useEffect } from "react";
import { getPackages } from "../services/package.service";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getPackages();
      setCategoriesList(response.result);
      debugger;
      setIsProcessing(false);
    }

    fetchMyAPI();
  }, []);
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
        {categoriesList.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    );
  }
};

export default Categories;
