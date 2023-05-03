import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// styles
import "./styles/main.scss";

// apollo- client
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// access token
import { ACCESS_TOKEN } from "./constant/Constant";

const client = new ApolloClient({
  uri: process.env.REACT_APP_PRODUCT_HUNT_API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
