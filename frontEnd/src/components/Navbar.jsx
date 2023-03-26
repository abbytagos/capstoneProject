import { Search, ShoppingBagOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import { Link, Navigate } from 'react-router-dom';
import { logout } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from '../redux/userRedux';

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
    const user = useSelector(state => state.user);
    const quantity = useSelector(state => state.cart.quantity)
    
    const isLoggedIn = useSelector(state => state.user.currentUser) == null ? false : true;

    const dispatch = useDispatch();

    if (!isLoggedIn) {
        dispatch(resetState());
      }      

      const handleLogout = () => {
        dispatch(resetState());
        window.location.reload();
        return <Navigate to='/' />;
      };

  return (
    <Container>
        <Wrapper>
            <Left>
                <SearchContainer>
                    <Input/>
                    <Search style={{color:"gray", fontSize:16}}/>
                </SearchContainer>
            </Left>
              <Center>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Logo>home as haven</Logo>
                </Link>
              </Center>
            <Right>

                  {!isLoggedIn ? (
                  <> 
                    <MenuItem>
                      <Link to='/register'>REGISTER</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to='/login'>LOG IN</Link>
                    </MenuItem>
                  </>
                ) : (
                  <>
                  Welcome {user.currentUser.firstname}
                  <MenuItem>
                  <Link to='/products' >CONTINUE SHOPPING</Link>
                  </MenuItem>
                  {/* <MenuItem>
                  <Link to='/logout' >LOG OUT</Link>
                  </MenuItem> */}
                  <MenuItem>
  <button onClick={handleLogout}>LOG OUT</button>
</MenuItem>
                  </>
                )}

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
  )
}

export default Navbar