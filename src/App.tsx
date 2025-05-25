import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import AuthPage from './pages/AuthPage';
import ShelfPage from './pages/ShelfPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/auth/PrivateRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { checkUser } = useAuth();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/shelf" element={
            <PrivateRoute>
              <ShelfPage />
            </PrivateRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;