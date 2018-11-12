import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileAction";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

// My Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-edu-exp/AddExperience";
import AddEducation from "./components/add-edu-exp/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
// import NotFound from "./components/not-found/NotFound";

import "./App.css";

// Token Check
// لاجل حفظ بيانات اليوزر في اللوكلستورج وعدم ضياعها مع الريلود // Arabic
if (localStorage.jwtToken) {
  // Set Auth Token Header
  setAuthToken(localStorage.jwtToken);
  // Decode Token and Get User Information
  const decoded = jwt_decode(localStorage.jwtToken);
  // set User isAuthonticate
  store.dispatch(setCurrentUser(decoded));
  // expired Token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Logout profiel
    store.dispatch(clearCurrentProfile());
    // Clear Current Profile ++ redirect To Login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              {/* <Route exact path="/not-found" component={NotFound} /> */}
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
