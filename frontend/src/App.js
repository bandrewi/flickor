import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import UploadPage from "./components/UploadPage";
import UserPhotos from "./components/UserPhotos";
import SinglePhotoPage from "./components/SinglePhotoPage";
import { getPhotos, getUserPhotos } from "./store/photo";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // useEffect(() => {
  //   dispatch(sessionActions.restoreUser())
  //     // .then(() => dispatch(getPhotos()))
  //     // .then(() => dispatch(getUserPhotos()))
  //     .then(() => setIsLoaded(true));
  // }, [dispatch]);

  useEffect(() => {
    (async () => {
      const user = await dispatch(sessionActions.restoreUser());
      console.log('user', user.user.id)
      if (user) {
        await dispatch(getPhotos());
        await dispatch(getUserPhotos(user.user.id));
      }
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/upload'>
            <UploadPage />
          </Route>
          <Route exact path='/photos'>
            <UserPhotos />
          </Route>
          <Route path='/photos/:id'>
            <SinglePhotoPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;