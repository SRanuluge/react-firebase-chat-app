import React from "react";
import { Button } from "@material-ui/core";
import {
  makeStyles,
} from "@material-ui/core";

function SignIn({ signInWithGoogle }) {
  const classes = useStyles();
  return (
    <Button
      className={classes.containerStyle}
      size="large"
      variant="contained"
      color="secondary"
      onClick={signInWithGoogle}
    >
      Sign In
    </Button>
  );
}

export default SignIn;

const useStyles = makeStyles({
  containerStyle: {
    alignSelf: "center",
    marginTop: 100,
  },
});
