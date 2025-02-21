// import { useState, useEffect } from "react";
// import { Checkbox } from "../../ui/checkbox";
// import axios from "axios";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [selection, setSelection] = useState([]);

//   const [registerUsername, setRegisterUsername] = useState("");
//   const [registerEmail, setRegisterEmail] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");
  
//   const [isAdmin, setIsAdmin] = useState(false);

//   // Logika sprawdzania uprawnień administratora oraz pobierania użytkowników
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Sprawdzamy, czy użytkownik jest administratorem
//       axios
//         .get("http://localhost:10000/user-info", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           const data = response.data;
//           if (data.status === 'admin') {
//             setIsAdmin(true);
//             // Jeśli użytkownik jest adminem, pobieramy listę użytkowników
//             axios
//               .get("http://localhost:10000/admin/users", {
//                 headers: { Authorization: `Bearer ${token}` },
//               })
//               .then((res) => setUsers(res.data))
//               .catch((error) => {
//                 console.error("Błąd pobierania użytkowników", error);
//                 if (error.response?.status === 401) {
//                   alert("Sesja wygasła. Zaloguj się ponownie.");
//                 }
//               });
//           } else {
//             alert("Nie masz uprawnień administratora.");
//           }
//         })
//         .catch((error) => {
//           console.error("Błąd pobierania danych użytkownika:", error);
//         });
//     } else {
//       alert("Brak tokenu użytkownika.");
//     }
//   }, []);

//   // Usuwanie użytkownika
//   const deleteUser = async (userId) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         await axios.delete(`http://localhost:10000/admin/users/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setUsers(users.filter((user) => user.id !== userId));
//       } catch (error) {
//         console.error("Błąd usuwania użytkownika", error);
//       }
//     }
//   };

//   // Obsługa rejestracji eksperta
//   const handleRegisterAsExpert = async () => {
//     try {
//       const response = await axios.post("http://localhost:10000/register", {
//         username: registerUsername,
//         email: registerEmail,
//         password: registerPassword,
//         status: "expert", // Wysyłamy jawnie status
//       }, {
//         headers: { "Content-Type": "application/json" }, // Upewniamy się, że dane są poprawnie wysyłane
//       });

//       console.log("Rejestracja zakończona, odpowiedź:", response.data);
//       alert("Rejestracja zakończona sukcesem jako ekspert. Możesz się teraz zalogować.");
//     } catch (error) {
//       console.error("Błąd rejestracji:", error.response?.data);
//       alert(error.response?.data?.message || "Błąd serwera, spróbuj ponownie.");
//     }
//   };

//   if (!isAdmin) {
//     return <div>Nie masz uprawnień administratora.</div>;
//   }

//   return (
//     <>
//       <h2>Lista użytkowników</h2>

//       <table>
//         <thead>
//           <tr>
//             <th>
//               <Checkbox
//                 checked={selection.length > 0 && selection.length === users.length}
//                 onChange={() => setSelection(selection.length === users.length ? [] : users.map((u) => u.id))}
//               />
//             </th>
//             <th style={{ color: 'blue' }}>Użytkownik</th>
//             <th style={{ color: 'blue' }}>Email</th>
//             <th style={{ color: 'blue' }}>Akcje</th>
//           </tr>
//         </thead>
//         <tbody>
//   {users.map((user, index) => (
//     <tr style={{ color: 'red' }} key={user.id ? `${user.id}-${user.username}` : `user-${index}`}>
//       <td>
//         <Checkbox
//           checked={selection.includes(user.id)}
//           onChange={() =>
//             setSelection(
//               selection.includes(user.id)
//                 ? selection.filter((id) => id !== user.id)
//                 : [...selection, user.id]
//             )
//           }
//         />
//       </td>
//       <td style={{ color: 'green' }}>{user.username}</td>
//       <td style={{ color: 'green' }}>{user.email}</td>
//       <td>
//         <button onClick={() => deleteUser(user.id)}>Usuń</button>
//       </td>
//     </tr>
//   ))}
// </tbody>

//       </table>

//       <h2>Rejestracja eksperta</h2>
//       <input type="text" placeholder="Nazwa użytkownika" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
//       <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
//       <input type="password" placeholder="Hasło" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
//       <button onClick={handleRegisterAsExpert} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
//         Zarejestruj jako ekspert
//       </button>
//     </>
//   );
// };

// export default Users;










import { useState, useEffect } from "react";
import { Checkbox } from "../../ui/checkbox";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selection, setSelection] = useState([]);

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  
  const [isAdmin, setIsAdmin] = useState(false);

  // Logika sprawdzania uprawnień administratora oraz pobierania użytkowników
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Sprawdzamy, czy użytkownik jest administratorem
      axios
        .get("http://localhost:10000/user-info", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const data = response.data;
          if (data.status === 'admin') {
            setIsAdmin(true);
            // Jeśli użytkownik jest adminem, pobieramy listę użytkowników
            axios
              .get("http://localhost:10000/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((res) => setUsers(res.data))
              .catch((error) => {
                console.error("Błąd pobierania użytkowników", error);
                if (error.response?.status === 401) {
                  alert("Sesja wygasła. Zaloguj się ponownie.");
                }
              });
          } else {
            alert("Nie masz uprawnień administratora.");
          }
        })
        .catch((error) => {
          console.error("Błąd pobierania danych użytkownika:", error);
        });
    } else {
      alert("Brak tokenu użytkownika.");
    }
  }, []);

  // Usuwanie użytkownika
  const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.delete(`http://localhost:10000/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Błąd usuwania użytkownika", error);
      }
    }
  };

  // Obsługa rejestracji eksperta
  const handleRegisterAsExpert = async () => {
    try {
      const response = await axios.post("http://localhost:10000/register", {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
        status: "expert", // Wysyłamy jawnie status
      }, {
        headers: { "Content-Type": "application/json" }, // Upewniamy się, że dane są poprawnie wysyłane
      });

      console.log("Rejestracja zakończona, odpowiedź:", response.data);
      alert("Rejestracja zakończona sukcesem jako ekspert. Możesz się teraz zalogować.");
    } catch (error) {
      console.error("Błąd rejestracji:", error.response?.data);
      alert(error.response?.data?.message || "Błąd serwera, spróbuj ponownie.");
    }
  };

  if (!isAdmin) {
    return <div>Nie masz uprawnień administratora.</div>;
  }

  return (
    <>
      <h2>Lista użytkowników</h2>

      <table>
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={selection.length > 0 && selection.length === users.length}
                onChange={() => setSelection(selection.length === users.length ? [] : users.map((u) => u.id))}
              />
            </th>
            <th style={{ color: 'blue' }}>Użytkownik</th>
            <th style={{ color: 'blue' }}>Email</th>
            <th style={{ color: 'blue' }}>Akcje</th>
          </tr>
        </thead>
        <tbody>
  {users.map((user, index) => (
    <tr style={{ color: 'red' }} key={user.id ? `${user.id}-${user.username}` : `user-${index}`}>
      <td>
        <Checkbox
          checked={selection.includes(user.id)}
          onChange={() =>
            setSelection(
              selection.includes(user.id)
                ? selection.filter((id) => id !== user.id)
                : [...selection, user.id]
            )
          }
        />
      </td>
      <td style={{ color: 'green' }}>{user.username}</td>
      <td style={{ color: 'green' }}>{user.email}</td>
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