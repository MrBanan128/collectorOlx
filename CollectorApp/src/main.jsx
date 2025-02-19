import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Provider } from './components/ui/Provider';
import SingUp from './routes/Sign-up';
import Dashboard from './routes/Dashboard';

import Home from './routes/Home';

import Test from './testBackend/test';

import './index.css';
import Admin from './routes/Admin';
import Login from './components/layout/Login/Login';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/test" element={<Test />} />
          <Route path="/Sign-up" element={<SingUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
