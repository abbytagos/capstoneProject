import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginFailure } from "../redux/userRedux";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: 
        linear-gradient(
            rgba(255,255,255, 0.5 ),
            rgba(255,255,255, 0.5 )
        ),
        url(https://i.ibb.co/MRPRsdx/hearts.jpg) center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
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

const HomeLink = styled(Link)`
  font-size: 16px;
  color: blue;
  text-decoration: none;
  margin-bottom: 10px;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        if (username.trim() === "" || password.trim() === "") {
            dispatch(loginFailure("Username and Password must not be blank or incorrect"));
        } else {
            login(dispatch, { username, password });
        }
    };


    if (user.currentUser?.username) {
        navigate("/");
    }
    
  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN TO YOUR ACCOUNT</Title>
            <Form>
                <Input placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                />     
                <Input placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}                
                />
                 <Button onClick={handleClick}> 
                LOGIN
                </Button>
                {
                    user.error && <Error>{user.error}</Error>
                }
            </Form>
            <HomeLink to="/Register">Register Here</HomeLink>
            <br />
            <HomeLink to="/">Back to Home</HomeLink>
        </Wrapper>
    </Container>
   
  );
}

export default Login