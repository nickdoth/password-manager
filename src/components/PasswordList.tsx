import React from 'react';
import List from '@material-ui/core/List';

import useStyles from './useStyles';
import { Password } from '../backend';
import PasswordListItem from './PasswordListItem';

interface PasswordListProps {
  passwords: Password[];
  onClickItem?: (pid: string) => void;
}

export default function PasswordList({ passwords, onClickItem }: PasswordListProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Divider /> */}
      <List component="nav" aria-label="secondary mailbox folders">
        { passwords.map(password => <PasswordListItem onClick={() => onClickItem?.(password._id)} key={password.recordName} {...password} />) }
      </List>
    </div>
  );
}