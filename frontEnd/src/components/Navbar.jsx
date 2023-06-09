import { Search, ShoppingBagOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { resetState } from '../redux/userRedux';
import { resetCart } from '../redux/cartRedux';
import { sendmailStart } from '../redux/userRedux';
import { useEffect, React } from "react";

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

    const isEmailed = useSelector((state) => state.user.isEmailed);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (isEmailed) {
      dispatch(resetCart()); 
      dispatch(sendmailStart());
    }

    useEffect(()=> {
      if (!user.currentUser?.username) {
              dispatch(resetState());
      }
  }, [
      user.currentUser?.username,
      dispatch,
      resetState
      ])

      const handleLogout = () => {
        dispatch(resetState());
        dispatch(resetCart()); 
        window.location.reload();
        navigate('/');
      };

      const handleShopmore = () => {
        navigate('/products');
      };

      const handleRegister = () => {
        navigate('/register');
      };

      const handleLogin = () => {
        navigate('/login');
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
                  {!user.currentUser?.username ? (
                  <> 
                    <MenuItem>
                      <button onClick={handleRegister}>REGISTER</button>
                    </MenuItem>
                    <MenuItem>
                      <button onClick={handleLogin}>LOG IN</button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                  Welcome {user.currentUser.firstname}
                  <MenuItem>
                  <button onClick={handleLogout}>LOG OUT</button>
                </MenuItem>
                  </>
                )}
                <MenuItem>
                  <button onClick={handleShopmore}>SHOP</button>
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
  )
}

export default Navbar