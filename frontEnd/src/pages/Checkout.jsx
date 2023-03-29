import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { sendmailFailure, sendmailSuccess } from "../redux/userRedux";
import { sendmail } from "../redux/apiCalls";
import { useLocation } from 'react-router';

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

const HomeLink = styled(Link)`
  font-size: 16px;
  color: blue;
  text-decoration: none;
  margin-bottom: 10px;
`;


const Checkout = () => {


  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const error = useSelector(state => state.user.error);

  const [username, setUsername] = useState("");
  const [email, showEmail] = useState("");
  const [total, showTotal] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [deliveryaddress, setDeliveryaddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && user.currentUser && user.currentUser.email && user.currentUser.username) {
      setUsername(user.currentUser.username);
      showEmail(user.currentUser?.email);
      setFirstname(user.currentUser?.firstname);
      setLastname(user.currentUser?.lastname);
      setDeliveryaddress(user.currentUser?.deliveryaddress || ""); // set initial value to empty string if undefined
      setPhonenumber(user.currentUser?.phonenumber || ""); // set initial value to empty string if undefined
    } else {
      navigate('/login')
    }
  
    if (cart && cart.products) {
      showTotal(cart.total);
    }
  }, [user, cart, navigate]);
  

  const handleClick = (e) => {
    e.preventDefault();
  
    if (
      deliveryaddress.trim() === "" ||
      phonenumber.trim() === "" ||
      deliveryaddress === null ||
      phonenumber === null
    ) {
      console.log("ERROR");
      dispatch(
        sendmailFailure("Delivery address or phone number must not be blank!")
      );
    } else {
      console.log("Sending email");
      const companyEmail = "shophomeashaven@gmail.com";
      const emails = email + ", " + companyEmail;
      const messageData = {
        from: "Home As Haven <" + companyEmail + ">",
        to: emails,
        subject: "Payment Instruction For your Order",
        template: "letter1",
        'h:X-Mailgun-Variables': JSON.stringify({
            fname: firstname,
            lname: lastname,
            deladdress: deliveryaddress,
            phone: phonenumber,
            tot: total 
            })
      };
      const fromPage = "Checkout";
      sendmail(dispatch, { messageData, fromPage });
      dispatch(
        sendmailSuccess({
          username,
          firstname,
          lastname,
          email,
          deliveryaddress,
          phonenumber,
          total
        }) 
      );
      navigate("/emailconfirmation");
    }
  };
  

  return (
    <Container>
        <Wrapper>
        {!user.currentUser?.username ? (
        <>
          <Title>You are not logged-in. Redirecting...</Title>
        </>
        ) : (
          <>
            <Title>SHIPPING INFORMATION</Title>
            <Form>
                <DisplayValue>EMAIL: {email}</DisplayValue>
                <Input placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                <Input placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                <Input placeholder="Delivery Address" onChange={(e) => setDeliveryaddress(e.target.value)} />
                <Input placeholder="(Area Code) (Number)" onChange={(e) => setPhonenumber(e.target.value)} />
                <DisplayValue>TOTAL: $ {Number(total).toFixed(2)}</DisplayValue>
                <Button onClick={handleClick}> 
                CONFIRM
                </Button>
                {
                    error && <Error>{error}</Error>
                }
                <input type="hidden" name="username" value={username} />
            </Form>
            <HomeLink to="/">Back to Home</HomeLink>
          </>
          )}
        </Wrapper>
    </Container>
  )
};




export default Checkout
