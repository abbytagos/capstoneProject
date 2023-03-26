import styled from "styled-components"

const Container = styled.div`
    height: 30px;
    background-color: #C4DEF6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14;
    font-weight: 500;

`

const Announcement = () => {
  return (
    <Container>
        Free Shipping This Weekend!
    </Container>
  )
}

export default Announcement