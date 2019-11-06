import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Password } from "../reducers";

export default function PasswordListItem({ recordName, username, passwordText }: Password) {
  return (
    <ListItem>
      <ListItemText primary={recordName} secondary={
        <div>
          <div>{username}</div>
          <div>{passwordText}</div>
        </div>
      } />
    </ListItem>
  );
}