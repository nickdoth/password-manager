import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import PasswordList from '../src/components/PasswordList';
import PasswordListItem from '../src/components/PasswordListItem';

export default {
  title: 'PasswordList',
};

const data = [
  {
    recordName: '农业银行',
    username: 'nickwu',
    passwordText: '${pwd1}${pwd2}',
  },
  {
    recordName: '建设银行',
    username: 'nickdoth',
    passwordText: '${pwd1:left2}${pwd2:left4}',
  }
]

export const passwordList = () => (
  <PasswordList passwords={data} />
);

export const listItem = () => <PasswordListItem {...data[0]} />;
