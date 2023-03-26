import styled from "styled-components"
import { Link, Navigate } from 'react-router-dom';
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";

import { useState } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { registerFailure } from "../redux/userRedux";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: 
        linear-gradient(
            rgba(255,255,255, 0.5 ),
            rgba(255,255,255, 0.5 )
        ),
        url(https://i.ibb.co/0KWgghM/pexels-madison-inouye-1831234.jpg) center;
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
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;    
`;

const Agreement = styled.span`
    font-size: 14px;
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: #cfc0ed;
    color: white;
    cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Logout = () => {

const { currentUser } = useSelector((state) => state.user);

if (currentUser) {
    return <Navigate to="/"/>
}

  return (

    <Container>
        
        <Wrapper>
            <Title>LOG OUT SUCCESSFULLY!</Title>
        </Wrapper>
    </Container>
  )
}

export default Logout