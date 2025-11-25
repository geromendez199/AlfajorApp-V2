import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from './config';

export function getProducts() {
  return Promise.resolve([
    { id: 1, name: 'Alfajor', price: 1500, category: 'alfajores' },
    { id: 2, name: 'Papas', price: 2000, category: 'papas' },
  ]);
}

export async function createOrder(orderData) {
  const ordersRef = collection(db, 'orders');
  const payload = {
    ...orderData,
    createdAt: serverTimestamp(),
    status: 'pending',
  };

  const docRef = await addDoc(ordersRef, payload);
  return { id: docRef.id, ...orderData, status: 'pending' };
}

export function subscribeToOrders(callback) {
  const ordersRef = collection(db, 'orders');
  const ordersQuery = query(ordersRef, orderBy('createdAt', 'desc'));

  return onSnapshot(ordersQuery, (snapshot) => {
    const orders = snapshot.docs.map((orderDoc) => ({
      id: orderDoc.id,
      ...orderDoc.data(),
    }));

    callback(orders);
  });
}

export async function updateOrderStatus(orderId, status) {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, { status });
}
