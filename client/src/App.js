import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { CookieProvider } from './CookieContext';
import AppInner from './AppInner';
import './app.scss';

export default function App(props) {
  return (
    <>
    <CookieProvider>
      <ThemeProvider>
        <AppInner />
      </ThemeProvider>
    </CookieProvider>
    </>
  );
}
