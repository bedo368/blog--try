import React from "react";
import "./App.css";
import Header from "./components/header/header";
import HeaderFooter from "./components/headerfooter/headerfooter";
import HomePage from "./pages/homepage/homepage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Postpage from "./pages/postpage/postpage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <HeaderFooter />
        <Switch>
          <Route exact path="/" component={HomePage} /> 
          <Route exact path="/post" component={Postpage} /> 
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
