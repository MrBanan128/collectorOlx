import { useState, useEffect } from "react";
import { Checkbox } from "../../ui/checkbox";
import axios from "axios";

const Users = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([]);
  const [selection, setSelection] = useState([]);

  const [registerUsername, setRegisterUsername] = useState("");
const [registerEmail, setRegisterEmail] = useState("");
const [registerPassword, setRegisterPassword] = useState("");

const handleRegisterAsExpert = async () => {
  try {
    const response = await axios.post("http://localhost:10000/register", {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
      status: "expert"  // Wysyłamy jawnie status
    }, {
      headers: { "Content-Type": "application/json" }  // Upewniamy się, że dane są poprawnie wysyłane
    });

    console.log("Rejestracja zakończona, odpowiedź:", response.data);
    alert("Rejestracja zakończona sukcesem jako ekspert. Możesz się teraz zalogować.");
  } catch (error) {
    console.error("Błąd rejestracji:", error.response?.data);
    alert(error.response?.data?.message || "Błąd serwera, spróbuj ponownie.");
  }
};



  // Logowanie administratora
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:10000/login", { email, password });
      setToken(response.data.token);
    } catch (error) {
      if (error.response?.status === 400) {
        alert("Błędne dane logowania!");
      } else {
        alert("Błąd serwera, spróbuj ponownie.");
      }
    }
  };

  // Pobranie użytkowników po zalogowaniu
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:10000/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUsers(res.data))
        .catch((error) => {
          console.error("Błąd pobierania użytkowników", error);
          if (error.response?.status === 401) {
            setToken(null);
            alert("Sesja wygasła. Zaloguj się ponownie.");
          }
        });
    }
  }, [token]);

  // Usuwanie użytkownika
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:10000/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Błąd usuwania użytkownika", error);
    }
  };

  // Widok logowania
  if (!token) {
    return (
      <>
        <h2>Admin Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}  style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
        >Zaloguj</button>
      </>
    );
  }

  // Widok panelu admina
  return (
    <>
      <h2>Lista użytkowników</h2>
      <button onClick={() => setToken(null)} >Wyloguj</button>

      <table>
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={selection.length > 0 && selection.length === users.length}
                onChange={() => setSelection(selection.length === users.length ? [] : users.map((u) => u.id))}
              />
            </th>
            <th  style={{ color: 'black'}}>Użytkownik</th>
            <th  style={{ color: 'black'}}>Email</th>
            <th  style={{ color: 'black'}}>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
           <tr key={`${user.id}-${user.username}`}>
              <td>
                <Checkbox
                  checked={selection.includes(user.id)}
                  onChange={() =>
                    setSelection(selection.includes(user.id)
                      ? selection.filter((id) => id !== user.id)
                      : [...selection, user.id])
                  }
                />
              </td>
              <td style={{ color: 'black'}}>{user.username}</td>
              <td style={{ color: 'black'}}>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Rejestracja eksperta</h2>
<input type="text" placeholder="Nazwa użytkownika" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
<input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
<input type="password" placeholder="Hasło" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
<button onClick={handleRegisterAsExpert} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
  Zarejestruj jako ekspert
</button>
    </>
  );
};

export default Users;
