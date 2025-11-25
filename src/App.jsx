import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext.jsx';
import AdminPage from './pages/AdminPage.jsx';
import KitchenPage from './pages/KitchenPage.jsx';
import POSPage from './pages/POSPage.jsx';

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
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
