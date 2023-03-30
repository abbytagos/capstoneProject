import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        if (isMounted) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
    return () => {
      isMounted = false;
    };
  }, [cat]);

  return (
    <Container>
      {products.map((item) => (
        <span key={item.id}> <Product item={item} /> </span>
      ))}
      {/* {products.map((item) => (
        <Product item={item} key={item.id} />
      ))} */}
    </Container>
  );
};

export default Products;
