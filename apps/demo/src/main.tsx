import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DemoRouter } from './router.js';
import '@omega-os/ui/tokens.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoRouter />
  </StrictMode>,
);
