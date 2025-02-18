import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Provider } from './components/ui/Provider';
import SingUp from './routes/Sign-up';
import Dashboard from './routes/Dashboard';

import Home from './routes/Home';

import Test from './testBackend/test';
import Profile from './routes/Profile';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/home" element={<Home />}></Route>
          </Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/test" element={<Test />} />
          <Route path="/Sign-up" element={<SingUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
