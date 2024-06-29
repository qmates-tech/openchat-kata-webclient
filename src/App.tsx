import '@picocss/pico/css/pico.colors.min.css';
import '@picocss/pico/css/pico.min.css';
import './App.css';
import { Login } from './Login/Login';
import { UserSessionProvider } from './User/UserSession';

function App() {
  return (
    <UserSessionProvider>
      <Login />
    </UserSessionProvider>
  )
}

export default App
