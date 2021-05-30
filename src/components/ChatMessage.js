import React from "react";
import firebase from "firebase/app";
import { Card, CardContent, Container, makeStyles } from "@material-ui/core";

function ChatMessage(props) {
  const auth = firebase.auth();
  const classes = useStyles();
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "s" : "r";
  return (
    <div
      className={
        messageClass === "s" ? classes.containersent : classes.containerreceived
      }
    >
      <img src={photoURL} />
      <p className={classes.textStyle}>{text}</p>
    </div>
  );
}

export default ChatMessage;

const useStyles = makeStyles({
  containersent: {
    backgroundColor: "#fff",
    padding: 2,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
  },
  containerreceived: {
    backgroundColor: "#fff",
    padding: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
