import { Flex, Button, Input, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const SignUp = () => {
    const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [token, setToken] = useState(null);
    const navigate = useNavigate(); // Hook do nawigacji

    // Obsługa zmian w formularzu rejestracji
    const handleRegisterChange = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };

    // Obsługa zmian w formularzu logowania
    const handleLoginChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    // Rejestracja użytkownika
    
    

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://localhost:10000/register', { // <- poprawione
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(registerForm),
          });
          const data = await response.json();
          setMessage(data.message || 'Rejestracja zakończona');
      } catch (error) {
          setMessage('Błąd podczas rejestracji');
      }
  };
  
  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://localhost:10000/login', { // <- poprawione
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(loginForm),
          });
          const data = await response.json();
          if (data.token) {
              setToken(data.token);
              localStorage.setItem('token', data.token);
              setMessage('Zalogowano pomyślnie');
              navigate('/dashboard'); // Przekierowanie do panelu użytkownika
          } else {
              setMessage(data.message || 'Błąd logowania');
          }
      } catch (error) {
          setMessage('Błąd podczas logowania');
      }
  };

  
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:10000/auth/google';
  };
  
  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:10000/auth/facebook';
  };


    return (
        <Flex direction="column" align="center" justify="center" gap="20px">
            {/* Rejestracja */}
            <Box p="20px" border="1px solid black" borderRadius="10px">
                <h2>Rejestracja</h2>
                <form onSubmit={handleRegister}>
                    <Input type="text" name="username" placeholder="Nazwa użytkownika" onChange={handleRegisterChange} required />
                    <Input type="email" name="email" placeholder="Email" onChange={handleRegisterChange} required />
                    <Input type="password" name="password" placeholder="Hasło" onChange={handleRegisterChange} required />
                    <Button type="submit" colorScheme="blue" mt="10px">Zarejestruj</Button>
                </form>
            </Box>

            {/* Logowanie */}
            <Box p="20px" border="1px solid black" borderRadius="10px">
                <h2>Logowanie</h2>
                <form onSubmit={handleLogin}>
                    <Input type="email" name="email" placeholder="Email" onChange={handleLoginChange} required />
                    <Input type="password" name="password" placeholder="Hasło" onChange={handleLoginChange} required />
                    <Button type="submit" colorScheme="green" mt="10px">Zaloguj</Button>
                </form>
            </Box>

            {/* Komunikat */}
            {message && <p>{message}</p>}
            {token && <p>Token: {token}</p>}

            <Flex direction="column" align="center">
    <Button colorScheme="red" onClick={handleGoogleLogin}>Zaloguj się przez Google</Button>
    <Button colorScheme="blue" onClick={handleFacebookLogin} mt="10px">Zaloguj się przez Facebooka</Button>
  </Flex>

        </Flex>
        
    );
};

export default SignUp;
