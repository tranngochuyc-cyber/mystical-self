import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles.css';
import './cosmic.css';
const Router = import.meta.env.MODE === 'github-pages' ? HashRouter : BrowserRouter;
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><ErrorBoundary><Router><App/></Router></ErrorBoundary></React.StrictMode>);

