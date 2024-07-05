import '@picocss/pico/css/pico.colors.min.css';
import '@picocss/pico/css/pico.min.css';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { routes } from '../routes';
import './App.css';

export function App() {
  return (<>
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
  </>)
}
