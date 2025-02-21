import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const buttonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  margin: '5px'
};

const AdminLoginButton = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Wczytanie tokena z localStorage przy załadowaniu komponentu
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:10000/login', {
        email: 'admin@example.com',
        password: 'admin123'
      });

      if (response.status === 200) {
        const adminToken = response.data.token;
        console.log('Zalogowano jako admin:', adminToken);

        // Zapisywanie do localStorage
        localStorage.setItem('adminToken', adminToken);
        setToken(adminToken);

        navigate('/admin');
      }
    } catch (error) {
      console.error('Błąd logowania:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Błąd logowania.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  return (
    <div>
      {!token ? (
        <>
          <h2>Admin Login</h2>
          <button onClick={handleLogin} style={buttonStyle}>
            Zaloguj jako Admin
          </button>
        </>
      ) : (
        <>
          <h2>Zalogowano jako admin</h2>
          <button
            onClick={handleLogout}
            style={{ ...buttonStyle, backgroundColor: 'red' }}
          >
            Wyloguj
          </button>
        </>
      )}
    </div>
  );
};

export default AdminLoginButton;
