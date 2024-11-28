import '@picocss/pico/css/pico.colors.min.css';
import '@picocss/pico/css/pico.min.css';
import { AppRoutes } from '../AppRoutes';
import { ModalProvider } from '../helpers/Modal/ModalProvider';
import { Navigation } from '../Navigation/Navigation';
import { UserSessionProvider } from '../User/UserSessionState';
import './App.css';

export function App() {
  return (
    <UserSessionProvider>
      <ModalProvider>
        <header className='top-bar'>
          <Navigation />
        </header>
        <div className='container page'>
          <AppRoutes />
        </div>
      </ModalProvider>
    </UserSessionProvider>
  );
}
