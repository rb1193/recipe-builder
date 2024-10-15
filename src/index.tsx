import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';

const rootEl: Element = document.getElementById('root') as Element;
const root = createRoot(rootEl);

root.render(<BrowserRouter>
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
</BrowserRouter>)
