import React, { createContext, useContext } from 'react';
import * as SQLite from 'expo-sqlite';

const DatabaseContext = createContext(null);

export function DatabaseProvider({ children }) {
  const searchProduct = async (barcode) => {
    try {
      const response = await fetch('http://192.168.15.200:3000/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ barcode }),
      });
      
      if (!response.ok) {
        throw new Error('Produto não encontrado');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na busca:', error);
      return null;
    }
  };

  return (
    <DatabaseContext.Provider value={{ searchProduct }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export const useDatabase = () => useContext(DatabaseContext);