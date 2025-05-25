import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { BookshelfProvider } from './contexts/BookshelfContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookshelfProvider>
          <App />
        </BookshelfProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);