import { useState, useEffect } from "react";
import { Checkbox } from "../../ui/checkbox";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selection, setSelection] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Pobieranie użytkowników i sprawdzanie uprawnień administratora
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Brak tokenu użytkownika.");
      return;
    }

    axios
      .get("http://localhost:10000/user-info", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.status === "admin") {
          setIsAdmin(true);
          return axios.get("http://localhost:10000/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          alert("Nie masz uprawnień administratora.");
          return Promise.reject();
        }
      })
      .then((res) => setUsers(res.data))
      .catch((error) => {
        if (error?.response?.status === 401) {
          alert("Sesja wygasła. Zaloguj się ponownie.");
        }
        console.error("Błąd pobierania użytkowników", error);
      });
  }, []);


  // Usuwanie pojedynczego użytkownika
  const deleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Brak tokenu użytkownika.");
      return;
    }

    if (!window.confirm("Czy na pewno chcesz usunąć tego użytkownika?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:10000/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      alert("Użytkownik został usunięty.");
    } catch (error) {
      console.error("Błąd usuwania użytkownika", error);
      alert(error.response?.data?.message || "Nie udało się usunąć użytkownika.");
    }
  };


  // Usuwanie wielu użytkowników
  const handleBulkDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Brak tokenu użytkownika.");
      return;
    }

    if (!window.confirm("Czy na pewno chcesz usunąć zaznaczonych użytkowników?")) {
      return;
    }

    try {
      await axios.post(
        "http://localhost:10000/admin/users/bulk-delete",
        { userIds: selection },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prevUsers) => prevUsers.filter((user) => !selection.includes(user._id)));
      setSelection([]);
      alert("Zaznaczeni użytkownicy zostali usunięci.");
    } catch (error) {
      console.error("Błąd usuwania użytkowników", error);
      alert("Nie udało się usunąć użytkowników.");
    }
  };


  // Edytowanie użytkownika
  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditUsername(user.username);
    setEditEmail(user.email);
    setEditStatus(user.status);
    setEditPassword(""); 
  };

  // Aktualizowanie danych użytkownika
  const updateUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Brak tokenu użytkownika.");
      return;
    }
    const updatedUser = {
      username: editUsername,
      email: editEmail,
      password: editPassword,
      status: editStatus,
    };

    try {
      await axios.put(`http://localhost:10000/admin/users/${editingUser._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Aktualizowanie stanu użytkowników
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUser._id ? { ...user, ...updatedUser } : user
        )
      );
      setEditingUser(null);
      alert("Dane użytkownika zostały zaktualizowane.");
    } catch (error) {
      console.error("Błąd aktualizacji użytkownika", error);
      alert(error.response?.data?.message || "Nie udało się zaktualizować danych użytkownika.");
    }
  };

  if (!isAdmin) {
    return <div>Nie masz uprawnień administratora.</div>;
  }

  return (
    <>
      <h2>Lista użytkowników</h2>
      <button onClick={handleBulkDelete} disabled={selection.length === 0}>
        Usuń zaznaczonych użytkowników
      </button>

      {editingUser && (
        <div>
          <h3>Edytuj użytkownika</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                style={{background:"grey" , padding:".2rem .5rem", margin:".2rem .5rem"}}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                style={{background:"grey" , padding:".2rem .5rem", margin:".2rem .5rem"}}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                style={{background:"grey" , padding:".2rem .5rem", margin:".2rem .5rem"}}
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                style={{background:"grey" , padding:".2rem .5rem", margin:".2rem .5rem"}}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <button onClick={updateUser}>Zaktualizuj użytkownika</button>
            <button onClick={() => setEditingUser(null)}>Anuluj</button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={selection.length > 0 && selection.length === users.length}
                onChange={() =>
                  setSelection(selection.length === users.length ? [] : users.map((u) => u._id))
                }
              />
            </th>
            <th style={{ color: "blue" }}>Użytkownik</th>
            <th style={{ color: "blue" }}>Email</th>
            <th style={{ color: "blue" }}>Status</th>
            <th style={{ color: "blue" }}>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr style={{ color: "red" }} key={user._id}>
              <td>
                <Checkbox
                  checked={selection.includes(user._id)}
                  onChange={() =>
                    setSelection(
                      selection.includes(user._id)
                        ? selection.filter((id) => id !== user._id)
                        : [...selection, user._id]
                    )
                  }
                />
              </td>
              <td style={{ color: "green" }}>{user.username}</td>
              <td style={{ color: "green" }}>{user.email}</td>
              <td style={{ color: "green" }}>{user.status}</td>
              <td>
                <button onClick={() => handleEditUser(user)} 
                style={{ background: "grey", border:"solid blue 1px", margin:".2rem .5rem"}}>Edytuj</button>
                <button onClick={() => deleteUser(user._id)} 
                style={{ background: "grey", border:"solid blue 1px", margin:".2rem .5rem"}}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;

