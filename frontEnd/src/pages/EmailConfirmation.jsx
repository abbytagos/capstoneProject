import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(https://i.ibb.co/0KWgghM/pexels-madison-inouye-1831234.jpg) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  grid-column: 1 / -1;
`;

const ProductsWrapper = styled.div`
  grid-column: 1 / 2;
`;

const TotalWrapper = styled.div`
  grid-column: 2 / -1;
  text-align: right;
`;

const Product = styled.div`
  margin-bottom: 10px;
`;

const ProductTitle = styled.div`
  font-weight: bold;
`;

const ProductPrice = styled.div`
  font-size: 14px;
`;

const ProductQuantity = styled.div`
  font-size: 14px;
`;

const HomeLink = styled(Link)`
  font-size: 16px;
  color: blue;
  text-decoration: none;
  margin-bottom: 10px;
`;


const EmailConfirmation = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);


  console.log(user);
  console.log(cart);
  console.log(cart.products);

  let products = [];
  let totalPrice = 0;

  if (cart && cart.products) {
    for (let i = 0; i < cart.products.length; i++) {
      const product = cart.products[i];
      products.push(product);
      totalPrice += product.price * product.quantity;
    }
  }


  return (
    <Container>
      <Wrapper>
        <Title>Thank you for your order!</Title>
        <HomeLink to="/">Back to Home</HomeLink>
        <ProductsWrapper>
          <h3>Products</h3>
          {products.map((product) => (
            <Product key={product._id}>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductQuantity>Quantity: {product.quantity}</ProductQuantity>
              <ProductPrice>
                ${product.price.toFixed(2)} x {product.quantity} = ${(product.price * product.quantity).toFixed(2)}
              </ProductPrice>
            </Product>
          ))}
        </ProductsWrapper>
        <TotalWrapper>
          <h3>Total</h3>
          ${totalPrice.toFixed(2)}
        </TotalWrapper>
        <div>
        Name: {user.currentUser?.firstname} {user.currentUser?.lastname}<br />
        Delivery Address: {user.currentUser?.deliveryaddress} <br />
        Email: {user.currentUser?.email} <br />
        Phone: {user.currentUser?.phone}
        </div>
        <div>Payment instructions will be sent to your email shortly.</div>
      </Wrapper>
    </Container>
  );
  
};

export default EmailConfirmation;

