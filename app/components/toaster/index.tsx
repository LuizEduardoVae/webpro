'use client'

import { Toaster as ToasterProvider } from 'react-hot-toast'

export const Toaster = () => {
  return (
    <ToasterProvider
      position="bottom-center"
      toastOptions={{
        success: {
          style: {
            background: '#1045bb', // Corrigido para um código hexadecimal válido
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#1045bb', // Corrigido aqui também
          },
        },
        error: {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          },
        },
      }}
    />
  )
}
