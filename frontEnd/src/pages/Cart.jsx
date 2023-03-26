import { Add, Remove } from '@mui/icons-material';
import styled from 'styled-components';
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
`;

const Title = styled.h1`
    font-weight: 700;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"}
`;
const TopTexts = styled.div``;

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;

`;
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
    margin-bottom: 10px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;

`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductQuantityContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductQuantity = styled.div`
    font-size: 24px;
    margin: 5px;
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`;

const Hr = styled.hr`
    background-color: #eee; 
    border: none; 
    height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px; 
  height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 20px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #cfc0ed;
    border: none;
    color: white;
    font-weight: 600;
    cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Cart = () => {

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/checkout');
        
    };

    const cart = useSelector(state => state.cart)
    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>Your Bag</Title>
                <Bottom>
                    <Info>
                        {cart.products.map((product) => ( 
                        <Product>
                            <ProductDetail>
                                <Image src={product.img} />
                                <Details>
                                    <ProductName>
                                        <b>Product:</b> {product.title} 
                                    </ProductName>
                                    <ProductId>
                                        <b>ID:</b> {product._id} 
                                    </ProductId>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductQuantityContainer>
                                    <Add/>
                                    <ProductQuantity> 
                                        {product.quantity} 
                                    </ProductQuantity>
                                    <Remove/>
                                </ProductQuantityContainer>
                                <ProductPrice>
                                    $ {product.price*product.quantity} 
                                </ProductPrice>
                            </PriceDetail>
                        </Product> 
                        ))}

                        <Hr/>
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>
                                $ {cart.total}
                            </SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>
                                $ 15.00
                            </SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>
                            $ -15.00
                            </SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>
                            $ {cart.total}
                            </SummaryItemPrice>
                        </SummaryItem>
                        {!cart.total ? (
                            <Error>Your Cart is Empty!</Error>
                            ) : (
                        <Button onClick={handleClick}> 
                        CHECKOUT</Button>
                        )}
                    </Summary>

                </Bottom>
            </Wrapper>
        </Container> 
    );

}




export default Cart