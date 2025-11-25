import React, { createContext, useMemo, useState } from 'react';
import { createOrder } from '../firebase/api';

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
    [cart],
  );

  const sendOrder = async () => {
    if (!cart.length) return null;

    const orderData = {
      items: cart,
      total,
    };

    const order = await createOrder(orderData);
    clearCart();

    return order;
  };

  return (
    <OrderContext.Provider value={{ cart, total, addItem, removeItem, clearCart, sendOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
