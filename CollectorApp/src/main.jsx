import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Provider } from './components/ui/Provider';

import Test from './testBackend/test';
import Profile from './routes/Profile';

import './index.css';
import Home from './routes/Home';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
