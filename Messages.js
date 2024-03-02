import React, { useState } from "react";
import styled, { createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
   body {
    background-color: #800020; 
   }
`;
const theme = {
    white: { 
        default: "#fffaf0",
        hover: "#f8f8ff",
        
    },
    gold: {
        default: "#daa520",
        hover:"#b8860b",

    },
};

const Button = styled.button`
  background-color: gold;
  color: white;
  padding: 10px 12px;
  border-radius: 4px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 2px 2px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #b8860b ;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;
const Disabled = styled.button`
  background-color: gold;
  color: white;
  padding: 10px 12px;
  border-radius: 4px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 2px 2px;
  cursor: arrow;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: none;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
    theme: "gold",
};
  
  function clickMe() {
    alert("You've made a new friend!");
}

const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1; 
  `}
`;

export default function App() {
    return (
      <>
      <GlobalStyle/>
        <div>
          <Disabled onClick={clickMe}>Messages</Disabled><Button onClick={clickMe}>
            +
          </Button>
        </div>
        <div>
        <Button>First Friend #1</Button>
        </div>
        <div>
        <Button>First Friend #2</Button>
        </div>
        <div>
        <Button>First Friend #3</Button>
        </div>
        <div>
        <Button>First Friend #4</Button>
        </div>
      </>
    );
}