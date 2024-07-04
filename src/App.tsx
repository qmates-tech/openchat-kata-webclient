import '@picocss/pico/css/pico.colors.min.css';
import '@picocss/pico/css/pico.min.css';
import './App.css';
import { AppRoutes } from './AppRoutes';
import { Navigation } from './Navigation/Navigation';

export function App() {
  return (<>
    <header className='top-bar'>
      <Navigation />
    </header>
    <div className='container page'>
      <AppRoutes />
    </div>
  </>)
}
