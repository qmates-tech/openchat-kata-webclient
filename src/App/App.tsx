import '@picocss/pico/css/pico.colors.min.css';
import '@picocss/pico/css/pico.min.css';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { UserSessionProvider } from '../User/UserSessionState';
import { routes } from '../routes';
import './App.css';

export function App() {
  return (<UserSessionProvider>
    <header className='top-bar'>
      <Navigation />
    </header>
    <div className='container page'>
      <Routes>
        {Object.entries(routes).map(([key, props]) => (
          <Route key={key} {...props} />
        ))}
      </Routes>
    </div>
  </UserSessionProvider>);
}
