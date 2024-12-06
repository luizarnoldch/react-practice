import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import Home from './routes/home';
import LayoutHome from './routes/home/layout';
import HooksPage from './routes/hooks';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route element={<LayoutHome />}>
          <Route index element={<Home />} />
          <Route path='/hooks' element={<HooksPage />} />
        </Route>
      </Routes>
    </StrictMode>,
  </BrowserRouter>
)
