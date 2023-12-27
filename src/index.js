import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './Components/App';
import {ToastProvider} from 'react-toast-notifications';
import {AuthProvider} from './providers';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
      <AuthProvider>
          <App />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
