import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../reducers';

const languages: { [locale: string]: { [name: string]: React.FC } } = {
  'zh_CN': {
    'reload': ({ children }) => <>编辑并保存{children}以重新载入</>
  },
  'en': {
    'reload': ({ children }) => <>Edit {children} and save to reload.</>
  }
};

const LocaleString: React.FC<{ name: string }> = ({ name, children }) => {
  const locale = useSelector((state: IRootState) => state.locale);
  const l = languages[locale] ? languages[locale][name] : languages['en'][name];
  return l({ children });
}

export default LocaleString;