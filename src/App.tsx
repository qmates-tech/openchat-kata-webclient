import '@picocss/pico/css/pico.colors.min.css';
import '@picocss/pico/css/pico.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './Header';
import { Login } from './Login/Login';
import { PageNotFound } from './PageNotFound';

export function App() {
  return (<>
    <Header />
    <div className='container page'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  </>)
}
