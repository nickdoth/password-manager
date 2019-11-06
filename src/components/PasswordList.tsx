import React from 'react';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import useStyles from './useStyles';
import { Password } from '../reducers';
import PasswordListItem from './PasswordListItem';

export default function PasswordList({ passwords }: { passwords: Password[] }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Divider /> */}
      <List component="nav" aria-label="secondary mailbox folders">
        { passwords.map(password => <PasswordListItem key={password.recordName} {...password} />) }
      </List>
    </div>
  );
}