import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from './components/ui/provider';
import { Toaster } from './components/ui/toaster';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootEl: Element = document.getElementById('root') as Element;
const root = createRoot(rootEl);

root.render(<BrowserRouter>
    <Provider>
        <App />
        <Toaster />
    </Provider>
</BrowserRouter>)
