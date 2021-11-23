import React from 'react';
import styled from 'styled-components';

const App = () => {
  return (
    <Wrapper>
      <h1>Hello React!!</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2rem;
  background-color: aliceblue;
  h1 {
    font-size: 3rem;
    text-align: center;
  }
`;

export default App;
