import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from "react-bootstrap";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <main className={"py-3"}>
        <Container>
          <Route path={"/"} component={HomeScreen} exact/>
          <Route path={"/product/:id"} component={ProductScreen}/>
        </Container>
      </main>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;

