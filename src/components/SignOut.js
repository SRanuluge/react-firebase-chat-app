import React from "react";
import { Button } from "@material-ui/core";

function SignOut({ auth }) {
  return (
    !!auth &&
    auth.currentUser && (
      <Button
        size="small"
        variant="outlined"
        color="inherit"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </Button>
    )
  );
}

export default SignOut;
