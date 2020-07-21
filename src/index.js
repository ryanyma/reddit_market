import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import Routes from "./routes";
import * as serviceWorker from "./serviceWorker";

// const GlobalStyles = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
//   @font-face {
//     font-family: 'Roboto', sans-serif !important;
//     font-weight: 100;
// `;

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
