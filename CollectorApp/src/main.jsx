import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Provider } from './components/ui/Provider';
import Dashboard from './routes/Dashboard';
import Home from './routes/Home';

import Test from './testBackend/test';
import './index.css';
import Login from './components/layout/Login/Login';
import Register from './components/layout/Login/Register';
import ProductsPanel from './routes/userComponents/ProductsPanel';
import CategorySide from './components/layout/CategoryCarousel/CategorySide';
import Adds from './routes/Adds';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/test" element={<Test />} />
          <Route path="/Sign-up" element={<Register />} />
          <Route path="/login" element={<Login />} />
           <Route path='/adds' element={<Adds/>}/>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/entry/:id" element={<ProductsPanel />} />
          <Route path="/:category" element={<CategorySide />} />
          <Route path="/:category/:subcategory" element={<CategorySide />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
