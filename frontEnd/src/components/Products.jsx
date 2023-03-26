import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { object } from "prop-types";
import { useEffect, useState } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ( {cat} ) => {
  const [products, setProducts] = useState([]);
  useEffect (() => {
   const getProducts = async () => {
    try {
      const res = await axios.get( 
        cat 
        ? `http://localhost:5000/api/products?category=${cat}` 
        : "http://localhost:5000/api/products"); 
      setProducts(res.data);
    } catch (err) {}
   };
   getProducts();
  }, [cat])
  
  return (
    <Container>
        {products.map((item) => (
            <Product item={item} key={item.id} />
        ))}
    </Container>
  );
};

export default Products