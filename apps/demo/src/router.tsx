import { useEffect } from 'react';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Button } from '@omega-os/ui';
import { Home } from 'lucide-react';
import { DocsLayout } from './layout.js';
import { Home as HomePage } from './pages/Home.js';
import { ComponentsIndex } from './pages/ComponentsIndex.js';
import { Showcase } from './pages/Showcase.js';
import { ButtonPage } from './pages/components/ButtonPage.js';
import { TablePage } from './pages/components/TablePage.js';
import { ModalPage } from './pages/components/ModalPage.js';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="mx-auto grid w-full max-w-2xl place-items-center gap-3 rounded-ot-lg border border-ot-border bg-ot-surface p-10 text-center">
      <p className="text-4xl font-extrabold tracking-tight">404</p>
      <p className="text-sm text-ot-muted">This docs page does not exist yet — pilot covers Button, Table, and Modal.</p>
      <div className="flex flex-wrap justify-center gap-2.5">
        <Link to="/">
          <Button variant="secondary" icon={<Home size={16} />}>
            Home
          </Button>
        </Link>
        <Link to="/components">
          <Button>Components</Button>
        </Link>
      </div>
    </div>
  );
}

export function DemoRouter() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<DocsLayout />}>
          <Route index element={<HomePage />} />
          <Route path="components" element={<ComponentsIndex />} />
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/table" element={<TablePage />} />
          <Route path="components/modal" element={<ModalPage />} />
          <Route path="showcase" element={<Showcase />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
