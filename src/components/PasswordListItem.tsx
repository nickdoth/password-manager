import ListItem from "@material-ui/core/ListItem";
import ListItemText, { ListItemTextProps } from "@material-ui/core/ListItemText";
import React from "react";
import { Password } from "../reducers";

interface PasswordListItemProps extends Password {
  onClick?: ListItemTextProps['onClick'];
}

export default function PasswordListItem({ recordName, username, passwordText, onClick }: PasswordListItemProps) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemText primary={recordName} secondary={
        <div>
          <div>{username}</div>
          <div>{passwordText}</div>
        </div>
      } />
    </ListItem>
  );
}