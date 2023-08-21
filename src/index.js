import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ChatProvider from './Components/context/chatcontext';

ReactDOM.render(
  <ChatProvider>
     <App />
  </ChatProvider>,
  document.getElementById('root')
);
