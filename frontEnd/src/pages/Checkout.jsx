import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from 'react-router-dom';
import { Info } from "@mui/icons-material";
import { sendmail } from "../redux/apiCalls";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: 
        linear-gradient(
            rgba(255,255,255, 0.5 ),
            rgba(255,255,255, 0.5 )
        ),
        url(https://i.ibb.co/Y2g0KXm/pexels-gradienta-7130540.jpg) center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;          
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;    
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: #cfc0ed;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {
        color: green;
        cursor: not-allowed;
      }
`;

const Error = styled.span`
  color: red;
`;

const DisplayValue = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
`;


const Checkout = () => {


  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);

  const [email, showEmail] = useState("");
  const [total, showTotal] = useState("");
  

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [deliveryaddress, setDeliveryaddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user && user.currentUser && user.currentUser.email) {
      showEmail(user.currentUser.email);
      setFirstname(user.currentUser.firstname);
      setLastname(user.currentUser.lastname);
      
    }

    if (cart && cart.products) {
        showTotal(cart.total);
      }

  }, [user, cart]);

const handleClick = (e) => {
    e.preventDefault();
    sendmail(dispatch);
};

  return (
    <Container>
        <Wrapper>
            <Title>SHIPPING INFORMATION</Title>
            <Form>
                <DisplayValue>EMAIL: {email}</DisplayValue>
                <Input placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                <Input placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                <Input placeholder="Delivery Address" onChange={(e) => setDeliveryaddress(e.target.value)} />
                <Input placeholder="(Area Code) (Number)" onChange={(e) => setPhonenumber(e.target.value)} />
                <DisplayValue>TOTAL: {total}</DisplayValue>
                {/* <Button onClick={handleClick} disabled={isFetching}>  */}
                <Button onClick={handleClick}> 
                CONFIRM
                </Button>
                {/* {
                    error && <Error>{error}</Error>
                } */}
            </Form>
            <Link to="/">HOME</Link>
        </Wrapper>
    </Container>
  )
};




export default Checkout
