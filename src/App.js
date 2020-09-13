import React from 'react';
import Layout from "./Components/Layout/Layout";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./Redux/Store/Store";

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
             <Layout />
          </BrowserRouter>
      </Provider>
  );
}

export default App;
