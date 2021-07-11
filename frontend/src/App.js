import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/header";
import HomePage from "./pages/homepage/homepage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Postpage from "./pages/postpage/postpage";
import {fitchPostsAsync } from "./redux/posts/post.action"
import SignIn_SignUp from "./pages/singin-signup.jsx/signin_signup";
import {connect} from "react-redux"
import { authStateSelector } from "./redux/auth/auth.selector";
import { createStructuredSelector } from "reselect";
import CreatePost from "./pages/create-post/createPost";
function App({dispatch , authState}) {
  useEffect(() => {
    dispatch(fitchPostsAsync())
   
  }, [])


  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
        { authState && <Redirect from="/auth" to="/" exact /> } 
          <Route exact path="/" component={HomePage} />
          {!authState && <Route exact path="/auth" component={SignIn_SignUp} /> }
          <Route exact path="/post/:postId" component={Postpage} />
          <Route exact path="/createpost" component={CreatePost} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = createStructuredSelector({
  authState: authStateSelector,
});
export default connect(mapStateToProps)( App)
