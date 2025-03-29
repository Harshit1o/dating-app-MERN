import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <RouterLink to="/" className="navbar-brand">
          Dating App
        </RouterLink>

        <div className="navbar-links">
          {token ? (
            <>
              <RouterLink to="/discover">Discover</RouterLink>
              <RouterLink to="/matches">Matches</RouterLink>
              <RouterLink to="/profile">Profile</RouterLink>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <RouterLink to="/login">Login</RouterLink>
              <RouterLink to="/register" className="btn btn-primary">
                Sign Up
              </RouterLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 