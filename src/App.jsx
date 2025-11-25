import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext.jsx';
import KitchenPage from './pages/KitchenPage.jsx';
import POSPage from './pages/POSPage.jsx';

function AdminPlaceholder() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-white">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Admin</p>
        <h1 className="mt-3 text-3xl font-bold">Panel en construcción</h1>
        <p className="mt-2 text-sm text-slate-200">
          Próximamente podrás gestionar productos, precios y reportes desde esta vista.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <OrderProvider>
              <POSPage />
            </OrderProvider>
          )}
        />
        <Route path="/cocina" element={<KitchenPage />} />
        <Route path="/admin" element={<AdminPlaceholder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
