import styled from "styled-components"
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

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

const Logout = () => {

const { currentUser } = useSelector((state) => state.user);

if (currentUser) {
    window.location.reload();
    window.location.reload();
    window.location.reload();
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