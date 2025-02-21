import { useState } from 'react';
import axios from 'axios';

const Expert = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleRegisterAsExpert = async () => {
    try {
      const response = await axios.post(
        'http://localhost:10000/register',
        {
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
          status: 'expert'
        },
        {
          headers: { 'Content-Type': 'application/json' } // Upewniamy się, że dane są poprawnie wysyłane
        }
      );

      console.log('Rejestracja zakończona, odpowiedź:', response.data);
      alert(
        'Rejestracja zakończona sukcesem jako ekspert. Możesz się teraz zalogować.'
      );
    } catch (error) {
      console.error('Błąd rejestracji:', error.response?.data);
      alert(error.response?.data?.message || 'Błąd serwera, spróbuj ponownie.');
    }
  };
  return (
    <div>
      <h2>Rejestracja eksperta</h2>
      <input
        type="text"
        placeholder="Nazwa użytkownika"
        value={registerUsername}
        onChange={(e) => setRegisterUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Hasło"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <button
        onClick={handleRegisterAsExpert}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Zarejestruj jako ekspert
      </button>
    </div>
  );
};
export default Expert;
