import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import { useLocation } from 'react-router';

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600px;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
`;

const Option = styled.option``;

const ProductListNoCategory = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[0];

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>ALL PRODUCTS</Title>
      <Products cat={cat} />
    </Container>
  );
};

export default ProductListNoCategory;
