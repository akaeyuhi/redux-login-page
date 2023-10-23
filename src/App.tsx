import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router';
import { useAppSelector } from './app/hooks';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import TablePage from './pages/TablePage';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.account);

  useEffect(() => {
    if (token) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [token]);
  return (<div className='container'>
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<TablePage />} />
      <Route path='*' element={
        <main className="main main__welcome">
        <ErrorMessage error={new Error('404 not found')}/>
      </main>} />
    </Routes>
    <Footer />
  </div>);
}

export default App;
