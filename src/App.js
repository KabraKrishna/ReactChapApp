import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import Form from './Form/form';
import Home from './Home/home';
import { useAuthentication } from './Hooks/useAuthentication';

function App() {

  const baseTheme = createTheme();
  const { loggedInUser } = useAuthentication();

  const RestrictedRoute = ({ children }) => {
    if (!loggedInUser) return <Navigate to="/login" />

    return children;
  }

  return (
    <div className="App">
      <ThemeProvider theme={baseTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<RestrictedRoute><Home /></RestrictedRoute>} />
            </Route>
            <Route path="/home">
              <Route index element={<RestrictedRoute><Home /></RestrictedRoute>} />
            </Route>
            <Route path="/login" element={<Form />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
