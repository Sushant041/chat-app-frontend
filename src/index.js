import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App';
import './index.css';
import ChatProvider from './Components/context/chatcontext';

const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  <ChatProvider>
    <App />
  </ChatProvider>
);
