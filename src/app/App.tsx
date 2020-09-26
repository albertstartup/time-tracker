import React from "react";
import Form from "components/Form"
import List from "components/List";
import styled from 'styled-components'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  return (
    <AppWrapper>
      <Form/>
      <List/>
    </AppWrapper>
  );
}

export default App;
