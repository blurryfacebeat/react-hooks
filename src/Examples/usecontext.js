import React from 'react';
import Alert from './Alert';
import { AlertProvider } from './AlertContext';
import './App.scss';
import Main from './Main';

export default function App() {
  return (
    // Теперь во всех компонентах внутри провайдера мы можем обратиться к alert
    <AlertProvider>
      <div className="container pt-3">
        <Alert />
        <Main />
      </div>
    </AlertProvider>
  );
}