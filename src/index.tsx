import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import bootCypress from './bootCypress';
import theme from './theme';

bootCypress()

const rootEl: Element = document.getElementById('root') as Element;
const root = createRoot(rootEl);

root.render(<BrowserRouter>
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
</BrowserRouter>)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
