import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Provider } from './components/ui/Provider';
import SingUp from './routes/Sign-up';

import Layout from './components/layout';

import Home from './routes/Home';

import Test from './testBackend/test';

import './index.css';
import Regulamin from './routes/Regulamin';
import PolitykaPrywatnosci from './routes/PolitykaPrywatnosci';
import JakDzialaBOLEX from './routes/JakDzialaBOL-EX';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route path="/test" element={<Test />} />
          <Route path="/Sign-up" element={<SingUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
