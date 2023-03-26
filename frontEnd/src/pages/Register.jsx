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

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error, currentUser } = useSelector((state) => state.user);

    // console.log("username: " + username);
    // console.log("password: " + password);
    // console.log("password2: " + password2);
    // console.log("firstname: " + firstname);
    // console.log("lastname: " + lastname);
    // console.log("email: " + email);

    const handleClick = (e) => {
        e.preventDefault();
        if (
            username.trim() === "" || 
            password.trim() === "" ||
            firstname.trim() === "" ||
            lastname.trim() === "" ||
            email.trim() === "" 
            ) {
            dispatch(registerFailure("All fields are reqiured"));    
        } else if (password !== password2) {
            dispatch(registerFailure("Passwords do not match"));
        } else {
            register(dispatch, { username, password, firstname, lastname, email });
        }
    };

    if (currentUser) {
        return <Navigate to="/"/>
    }

  return (

    <Container>
        
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input placeholder="first name"
                onChange={(e) => setFirstname(e.target.value)}
                />
                <Input placeholder="last name"
                onChange={(e) => setLastname(e.target.value)}
                />
                <Input placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                />                     
                <Input placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}                
                />
                <Input placeholder="confirm password"
                type="password"
                onChange={(e) => setPassword2(e.target.value)}
                />
                <Agreement>
                    By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button onClick={handleClick} disabled={isFetching}> 
                REGISTER
                </Button>
                {
                    error && <Error>{error}</Error>
                }
            </Form>
            <Link to="/Login">LOGIN</Link>
            <hr />
            <Link to="/">HOME</Link>
        </Wrapper>
    </Container>
  )
}

export default Register