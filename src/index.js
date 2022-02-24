import React from "react";
// import "semantic-ui-css/semantic.min.css";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);
