import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, AllActions } from './reducers';

import LocaleString from './components/LocaleString';
import { Dispatch } from 'redux';
import PasswordList from './components/PasswordList';
import PasswordListItem from './components/PasswordListItem';

const App: React.FC = () => {
  const dispatch = useDispatch<Dispatch<AllActions>>();
  const locale = useSelector((state: IRootState) => state.locale);
  return <PasswordList passwords={[
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
  ]} />;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <LocaleString name="reload">
            <code>src/App.tsx</code>
          </LocaleString>
        </p>
        <a
          style={{ cursor: 'pointer' }}
          onClick={() => dispatch({ type: 'Root.SwitchLocale', locale: locale === 'zh_CN' ? 'en': 'zh_CN' })}
        >
          Switch Language
        </a>
      </header>
    </div>
  );
}

export default App;
