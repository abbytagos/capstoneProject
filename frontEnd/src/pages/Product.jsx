import { Add, Remove } from "@mui/icons-material";
import { useLocation } from "react-router";
import styled from 'styled-components';
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;  

const Wrapper = styled.div`
    padding: 50x;
    display: flex;
`;
 
const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    padding: 0px 20px;
    width: 100%;
    height: 90vh;
    object-fit: cover;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
`;

const Title = styled.h1`
    font-weight: 200;

`;

const Desc = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100px;
    font-size: 40px;
`;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Quantity = styled.span`
    width: 30px;
    height: 30px;
    border:radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`;

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if(type === "dec"){
        quantity>1 && setQuantity(quantity - 1);
    } else {
        setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    //UPDATE CART
    dispatch(addProduct({ ...product, quantity })); //product quantity NOT cart
  };
 
  return (
    <Container>
        <Announcement/>
        <Navbar/>
        <Wrapper>
            <ImgContainer>
                <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>
                {product.desc}
                </Desc>
                <Price>$ {product.price}</Price>
                <AddContainer>
                    <QuantityContainer>
                    <Remove onClick={() => handleQuantity("dec")} />
                    <Quantity>{quantity}</Quantity>
                    <Add onClick={() => handleQuantity("inc")}/>
                    </QuantityContainer>
                    <Button onClick={handleClick} >ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
    </Container>
  )
}

export default Product
