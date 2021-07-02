import React from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import SignOut from "./components/SignOut";
import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";
import { Container, makeStyles, AppBar, Toolbar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";

if (!firebase.apps.length) {
  //##
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();

const App = () => {
  const [user] = useAuthState(auth);
  const classes = useStyles();
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.container}>
        <AppBar position="fixed" className={classes.headerStyle}>
          <Toolbar>
            <SignOut auth={auth} />
          </Toolbar>
        </AppBar>
        <section className={user ? classes.secStyle : classes.secSignStyle}>
          {user ? <ChatRoom /> : <SignIn signInWithGoogle={signInWithGoogle} />}
        </section>
      </Container>
    </React.Fragment>
  );
};
export default App;

const useStyles = makeStyles({
  container: {
    padding: 5,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column-reverse",
  },
  headerStyle: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  secStyle: {
    paddingTop: 70,
    paddingBottom: 50,
    backgroundColor: "#fff",
  },
  secSignStyle: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
});
