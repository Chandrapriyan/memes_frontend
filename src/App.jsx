import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MemeGenerator from './components/MemeGenerator';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import './styles/App.css';

function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <Navigate to="/signup" />
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <MemeGenerator />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;