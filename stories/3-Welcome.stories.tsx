import React from 'react';
import PageFrame from '../src/components/PageFrame';
import Welcome from '../src/components/Welcome';
import { appTheme } from '../src/App';
import { ThemeProvider } from '@material-ui/core';

// import { passwordList } from './1-PasswordList.stories';

export default {
    title: 'Welcome',
};

export const welcome = () => <ThemeProvider theme={appTheme}>
    <Welcome loggedIn={false} bindInput={() => ({} as any)} onConfirm={() => {}}></Welcome>
</ThemeProvider>;

