import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const goToHome = () => {
    navigate('/create');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={goToHome}>
        <h1>Meme Generator</h1>
      </div>
      <div className="navbar-menu">
        <span className="user-email">{user?.email}</span>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
