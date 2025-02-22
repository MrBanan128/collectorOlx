import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Provider } from './components/ui/Provider';
import Dashboard from './routes/Dashboard';
import Home from './routes/Home';

import Test from './testBackend/test';
import './index.css';
import Admin from './routes/Admin';
import Login from './components/layout/Login/Login';
import Register from './components/layout/Login/Register';
import Expert from './components/layout/AdminPanel/Expert';
import NotFound from './components/layout/404';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/test" element={<Test />} />
          <Route path="/Sign-up" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/expert" element={<Expert />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
