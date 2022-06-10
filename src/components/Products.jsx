import React from 'react';
import styled from "styled-components";
import { getProducts } from '../services/products.service';
import Product from "./Product";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isProcessing: true,
    };
  }


  componentDidMount = async () => {
    const response = await getProducts();
    this.setState({ data: response });
    this.setState({ isProcessing: false });
  };

  render() {
    if (this.state.isProcessing) {
      return (
        <Box sx={{ display: 'flex', alignItems:'center',justifyContent:'center',height:'40vh'  }}>
          <CircularProgress />
        </Box>
      );
    } else {
      return (
        <Container>
          {this.state.data.map((item) => (
            <Product item={item} key={item.id} />
          ))}
        </Container>
      );
    }
  }

};


