import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { ComponentPage } from './pages/ComponentPage'; // We will create this

export default function App() {
  return (
    <BrowserRouter>
      {/* 
        Wrap everything in mx-theme to provide tokens. 
        Note: Web Components must be used as JSX elements if strict type checking allows, 
        or we suppress it.
      */}
      {/* @ts-ignore */}
      <mx-theme>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/components/:id" element={<ComponentPage />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </mx-theme>
    </BrowserRouter>
  );
}
