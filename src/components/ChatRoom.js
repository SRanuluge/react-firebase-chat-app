import { useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Container,
  makeStyles,
  Button,
  TextField,
} from "@material-ui/core";

function ChatRoom() {
  const classes = useStyles();
  const auth = firebase.auth();
  const messagesRef = firebase.firestore().collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [value, setValue] = useState("");
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </main>
      <Container className={classes.containerStyle} maxWidth="sm">
        <form className={classes.formStyle} onSubmit={sendMessage}>
          <TextField
            inputProps={{ "aria-label": "description" }}
            placeholder="Message"
            className={classes.formInput}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            disabled={!value}
            size="small"
            variant="contained"
            color="secondary"
            type="submit"
          >
            Send
          </Button>
        </form>
      </Container>
    </>
  );
}

export default ChatRoom;

const useStyles = makeStyles({
  containerStyle: {
    bottom: 4,
    paddingRight: 32,
    position: "fixed",
    padding: 2,
  },
  formInput: {
    width: "80%",
  },
  formStyle: {
    backgroundColor: "#269dc7",
    width: "100%",
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
  },
});
