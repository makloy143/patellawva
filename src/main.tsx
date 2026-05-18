import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SiteGate from './components/SiteGate';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SiteGate>
        <App />
      </SiteGate>
    </BrowserRouter>
  </StrictMode>,
);
