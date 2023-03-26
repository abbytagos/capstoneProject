import { Search, ShoppingBagOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import Login from '../pages/Login';
import Register from '../pages/Register';
import { BrowserRouter,Routes,Route,useNavigate,Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Container = styled.div`
    height: 80px; 

`;  

const Wrapper = styled.div`
    padding: 10px 20px; 
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;


const SearchContainer = styled.div`
     border: 0.5px solid lightgray; 
     display: flex;
     align-items: center;
     margin-left: 25px;
     padding: 5px;
`;

const Input = styled.input`
    border: none;

`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.div`
    font-family: 'Merriweather';
    font-size: 50px;
    font-weight: bold;
    color: orange;
`;

const Right = styled.div`    
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end
`;

const MenuItem = styled.div`
    font-size: 14;
    cursor: pointer;
    margin-left: 25px;
    
`;

 
const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)


  return (
    // <BrowserRouter>
    // <Routes>
    //     <Route path='/login' element={<Login/>} />
    //     <Route path='/register' element={<Register/>} />
    // </Routes>
    <Container>
        <Wrapper>
            <Left>
                <SearchContainer>
                    <Input/>
                    <Search style={{color:"gray", fontSize:16}}/>
                </SearchContainer>
            </Left>
            <Center><Logo>home as haven</Logo></Center>
            <Right>

                <MenuItem>
                    <Link to="/register">REGISTER</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/login">LOG IN</Link>
                </MenuItem>
                <Link to="/cart" >
                <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingBagOutlined />
                    </Badge>
                </MenuItem>
                </Link>
        </Right>
        </Wrapper>
    </Container>
    // </BrowserRouter>
  )
}

export default Navbar