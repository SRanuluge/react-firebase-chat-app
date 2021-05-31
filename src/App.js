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
require('/__/firebase/8.6.3/firebase-app.js')
require('/__/firebase/8.6.3/firebase-analytics.js')
require('/__/firebase/init.js')

  firebase.initializeApp({
    apiKey: "AIzaSyCg61E307_BPBImEuUF2wch2sodt7U8ISU",
    authDomain: "superchatapp-52c44.firebaseapp.com",
    projectId: "superchatapp-52c44",
    storageBucket: "superchatapp-52c44.appspot.com",
    messagingSenderId: "124997746417",
    appId: "1:124997746417:web:5751c0b40e52161d5b3350",
    measurementId: "G-QYTPBZN959",
  });

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
