import { useState, useEffect, useRef } from 'react';
import { Checkbox } from '../../ui/checkbox';
import axios from 'axios';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { Toast } from 'primereact/toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selection, setSelection] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const toast = useRef(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Sortowanie użytkowników
  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key]?.toLowerCase() || '';
    const bValue = b[sortConfig.key]?.toLowerCase() || '';
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
  // Sortowanie użytkowników po kluczu
  const handleSort = (key) => {
    console.log('Sortowanie po kluczu:', key);
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <GoTriangleUp />
      ) : (
        <GoTriangleDown />
      );
    }
    return null;
  };

  // Pobieranie użytkowników i sprawdzanie uprawnień administratora
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Brak tokenu użytkownika.');
      return;
    }

    axios
      .get('http://localhost:10000/user-info', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        if (response.data.status === 'admin') {
          setIsAdmin(true);
          return axios.get('http://localhost:10000/admin/users', {
            headers: { Authorization: `Bearer ${token}` }
          });
        } else {
          alert('Nie masz uprawnień administratora.');
          return Promise.reject();
        }
      })
      .then((res) => setUsers(res.data))
      .catch((error) => {
        if (error?.response?.status === 401) {
          alert('Sesja wygasła. Zaloguj się ponownie.');
        }
        console.error('Błąd pobierania użytkowników', error);
      });
  }, []);

  // Usuwanie pojedynczego użytkownika
  const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Brak tokenu użytkownika.');
      return;
    }

    if (!window.confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:10000/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

      toast.current.show({
        detail: 'Użytkownik usunięty!',
        life: 3000,
        style: {
          backgroundColor: 'rgb(255, 0, 0)', // Ciemniejsze tło
          color: '#000', // Jasny tekst
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '16px'
        },
        className: 'custom-toast'
      });
    } catch (error) {
      console.error('Błąd usuwania użytkownika', error);
      toast.current.show({
        detail: 'Nie udało się usunąć użytkownika!',
        life: 3000,
        style: {
          backgroundColor: 'rgb(255, 0, 0)', // Ciemniejsze tło
          color: '#000', // Jasny tekst
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '16px'
        },
        className: 'custom-toast'
      });
    }
  };

  // Edytowanie użytkownika
  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditUsername(user.username);
    setEditEmail(user.email);
    setEditStatus(user.status);
    setEditPassword('');
  };

  // Aktualizowanie danych użytkownika
  const updateUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Brak tokenu użytkownika.');
      return;
    }
    const updatedUser = {
      username: editUsername,
      email: editEmail,
      password: editPassword,
      status: editStatus
    };

    try {
      await axios.put(
        `http://localhost:10000/admin/users/${editingUser._id}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Aktualizowanie stanu użytkowników
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUser._id ? { ...user, ...updatedUser } : user
        )
      );
      setEditingUser(null);

      toast.current.show({
        detail: 'Użytkownik zaktualizowany!',
        life: 3000,
        style: {
          backgroundColor: 'rgb(0, 255, 0)', // Ciemniejsze tło
          color: '#000', // Jasny tekst
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '16px'
        },
        className: 'custom-toast'
      });
    } catch (error) {
      console.error('Błąd aktualizacji użytkownika', error);
      alert(
        error.response?.data?.message ||
          'Nie udało się zaktualizować danych użytkownika.'
      );
    }
  };

  // Funkcja usuwania wielu użytkowników
  const handleBulkDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Brak tokenu użytkownika.');
      return;
    }

    if (
      !window.confirm('Czy na pewno chcesz usunąć zaznaczonych użytkowników?')
    ) {
      return;
    }
    try {
      await axios.post(
        'http://localhost:10000/admin/users/bulk-delete',
        { userIds: selection },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prevUsers) =>
        prevUsers.filter((user) => !selection.includes(user._id))
      );
      setSelection([]); // Resetowanie zaznaczenia
      toast.current.show({
        detail: 'Usunięto zaznaczonych użytkowników!',
        life: 3000,
        style: {
          backgroundColor: 'rgb(255, 0, 0)', // Ciemniejsze tło
          color: '#000', // Jasny tekst
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '16px'
        },
        className: 'custom-toast'
      });
    } catch (error) {
      console.error('Błąd usuwania użytkowników', error);
      toast.current.show({
        detail: 'Nie udało się usunąć zaznaczonych użytkowników.',
        life: 3000,
        style: {
          backgroundColor: 'rgb(255, 0, 0)', // Ciemniejsze tło
          color: '#000', // Jasny tekst
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '16px'
        },
        className: 'custom-toast'
      });
    }
  };
  return (
    <Flex
      width={'100%'}
      height={'90vh'}
      overflow={'auto'}
      flexDir={'column'}
      backgroundColor={'white'}
      textAlign={'center'}
      bg={'#1c212b'}
    >
      <Toast ref={toast} position="top-right" />
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDir={'column'}
        gap={'2rem'}
        padding={'2rem'}
        color={'white'}
        mt={'4rem'}
      >
        <Heading
          pt={'2rem'}
          fontSize={'30px'}
          sm={{ fontSize: '40px' }}
          md={{ fontSize: '50px' }}
        >
          Lista użytkowników
        </Heading>
      </Flex>

      {editingUser && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir={'column'}
          textAlign={'left'}
          padding={'2rem'}
          color={'white'}
          mt={'2rem'}
        >
          <h3 style={{ paddingBottom: '10px', fontSize: '20px' }}>
            Edytuj użytkownika
          </h3>
          <Box
            padding={'2rem'}
            boxShadow={'8px 8px 8px 8px rgb(0, 0, 0)'}
            rounded={'2xl'}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width={'300px'}
              >
                <label
                  style={{
                    fontSize: '1rem', // Wielkość czcionki
                    fontWeight: 'bold', // Pogrubienie etykiety
                    marginRight: '10px', // Odstęp między etykietą a polem tekstowym
                    color: '#FFFFFF' // Kolor tekstu etykiety
                  }}
                >
                  Nazwa:
                </label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  style={{
                    background: '#f4f4f4', // Jasnoszare tło
                    border: '1px solid #ccc', // Szare obramowanie
                    borderRadius: '4px', // Zaokrąglone rogi
                    padding: '0.5rem', // Wygodne wypełnienie
                    fontSize: '1rem', // Wielkość czcionki
                    width: '200px', // Szerokość inputa
                    margin: '0.2rem', // Odstępy wewnętrzne
                    transition: 'border-color 0.3s ease' // Przejście dla obramowania
                  }}
                />
              </Flex>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width={'300px'}
              >
                <label
                  style={{
                    fontSize: '1rem', // Wielkość czcionki
                    fontWeight: 'bold', // Pogrubienie etykiety
                    marginRight: '10px', // Odstęp między etykietą a polem tekstowym
                    color: '#FFFFFF' // Kolor tekstu etykiety
                  }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  style={{
                    background: '#f4f4f4', // Jasnoszare tło
                    border: '1px solid #ccc', // Szare obramowanie
                    borderRadius: '4px', // Zaokrąglone rogi
                    padding: '0.5rem', // Wygodne wypełnienie
                    fontSize: '1rem', // Wielkość czcionki
                    width: '200px', // Szerokość inputa
                    margin: '0.2rem', // Odstępy wewnętrzne
                    transition: 'border-color 0.3s ease' // Przejście dla obramowania
                  }}
                />
              </Flex>
              {/* <Flex
                justifyContent="space-between"
                alignItems="center"
                width={'300px'}
              >
                <label
                  style={{
                    fontSize: '1rem', // Wielkość czcionki
                    fontWeight: 'bold', // Pogrubienie etykiety
                    marginRight: '10px', // Odstęp między etykietą a polem tekstowym
                    color: '#FFFFFF' // Kolor tekstu etykiety
                  }}
                >
                  Hasło:
                </label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  style={{
                    background: '#f4f4f4', // Jasnoszare tło
                    border: '1px solid #ccc', // Szare obramowanie
                    borderRadius: '4px', // Zaokrąglone rogi
                    padding: '0.5rem', // Wygodne wypełnienie
                    fontSize: '1rem', // Wielkość czcionki
                    width: '200px', // Szerokość inputa
                    margin: '0.2rem', // Odstępy wewnętrzne
                    transition: 'border-color 0.3s ease' // Przejście dla obramowania
                  }}
                />
              </Flex> */}
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width={'300px'}
              >
                <label
                  style={{
                    fontSize: '1rem', // Wielkość czcionki
                    fontWeight: 'bold', // Pogrubienie etykiety
                    marginRight: '10px', // Odstęp między etykietą a polem tekstowym
                    color: '#FFFFFF' // Kolor tekstu etykiety
                  }}
                >
                  Status:
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  style={{
                    margin: '.2rem .5rem', // Odstęp od innych elementów
                    background: '#f4f4f4', // Jasnoszare tło
                    color: 'black', // Czarny kolor tekstu
                    padding: '0.5rem ', // Większe wypełnienie
                    marginBottom: '1rem', // Odstęp od dolnego elementu
                    border: '2px solid #ccc', // Jasnoszare obramowanie
                    borderRadius: '4px', // Zaokrąglone rogi
                    fontSize: '1rem', // Wielkość czcionki
                    cursor: 'pointer', // Kursor wskazujący
                    width: '200px', // Szerokość selecta
                    transition: 'all 0.3s ease' // Płynne przejście dla efektów
                  }}
                  onMouseOver={(e) => (e.target.style.borderColor = '#007bff')} // Zmiana koloru obramowania na niebieski na hover
                  onMouseOut={(e) => (e.target.style.borderColor = '#ccc')} // Powrót do początkowego koloru obramowania
                >
                  <option value="admin">Admin</option>
                  <option value="user">Użytkownik</option>
                  <option value="expert">Expert</option>
                </select>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <button
                  onClick={updateUser}
                  style={{
                    fontSize: '1rem', // Wielkość czcionki
                    backgroundColor: 'red', // Tło na czerwono
                    color: 'white', // Kolor tekstu na biały
                    border: 'none', // Brak obramowania
                    padding: '0.5rem 1rem', // Wygodne wypełnienie
                    borderRadius: '8px', // Zaokrąglone rogi
                    cursor: 'pointer', // Kursor wskazujący, że to przycisk
                    transition: 'background-color 0.3s ease' // Płynne przejście
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = 'darkred')
                  } // Zmiana koloru tła na ciemniejszy na hover
                  onMouseOut={(e) => (e.target.style.backgroundColor = 'red')} // Powrót do początkowego koloru
                >
                  Zaktualizuj użytkownika
                </button>
                <button
                  onClick={() => setEditingUser(null)}
                  style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    fontSize: '1rem'
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = 'darkblue')
                  }
                  onMouseOut={(e) => (e.target.style.backgroundColor = 'blue')}
                >
                  Anuluj
                </button>
              </Flex>
            </form>
          </Box>
        </Flex>
      )}

      <table style={{ textAlign: 'left' }}>
        <thead
          style={{
            borderBottom: '2px solid rgb(236, 85, 20) ',
            color: 'rgb(236, 85, 20)',
            textAlign: 'left',
            boxShadow: '0 2px 4px rgb(236, 85, 20, 0.4)', // Cień na dolnej krawędzi
            padding: '1rem' // Wygodne wypełnienie
          }}
        >
          <tr>
            <th>
              <Checkbox
                padding={'1rem'}
                variant={'subtle'}
                checked={
                  selection.length > 0 && selection.length === users.length
                }
                onChange={() =>
                  setSelection(
                    selection.length === users.length
                      ? []
                      : users.map((u) => u._id)
                  )
                }
              />
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('username')} // Sorting by username
            >
              <Flex justifyContent={'center'} alignItems={'center'}>
                Użytkownik {getSortIcon('username')}
              </Flex>
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('email')} // Sorting by email
            >
              <Flex justifyContent={'center'} alignItems={'center'}>
                Email {getSortIcon('email')}
              </Flex>
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('status')} // Sorting by status
            >
              <Flex justifyContent={'center'} alignItems={'center'}>
                Status {getSortIcon('status')}
              </Flex>
            </th>

            <th>
              <Flex justifyContent={'center'} alignItems={'center'}>
                Akcje
              </Flex>
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedUsers.map((user) => (
            <tr
              style={{
                margin: '1rem',
                color: 'white',
                borderBottom: '1px solid gray',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' // Cień na dolnej krawędzi
              }}
              key={user._id}
            >
              <td>
                <Checkbox
                  variant={'subtle'}
                  checked={selection.includes(user._id)}
                  padding={'1rem'}
                  onChange={() =>
                    setSelection(
                      selection.includes(user._id)
                        ? selection.filter((id) => id !== user._id)
                        : [...selection, user._id]
                    )
                  }
                />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <Flex flexDir={'row'} justifyContent={'center'}>
                  <Button
                    onClick={() => handleEditUser(user)}
                    size={'2xl'}
                    style={{
                      backgroundColor: '#007bff', // Szare tło
                      color: '#FFFFFF', // Niebieski tekst
                      border: '2px solid #007bff', // Niebieska ramka
                      borderRadius: '5px', // Zaokrąglone rogi
                      padding: '0.75rem 1.5rem', // Wygodne wypełnienie
                      margin: '.2rem .5rem', // Odstęp od innych elementów
                      fontWeight: 'bold', // Pogrubiony tekst
                      cursor: 'pointer', // Zmieniony kursor na wskaźnik
                      transition: 'background-color 0.3s ease, border 0.3s ease' // Płynne przejście efektów
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'rgb(22, 103, 184)'; // Zmiana tła na ciemniejsze przy najechaniu
                      e.target.style.border = '2px solid rgb(22, 103, 184)'; // Zmiana ramki
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#007bff'; // Przywrócenie początkowego tła
                      e.target.style.border = '2px solid #007bff'; // Przywrócenie początkowej ramki
                    }}
                  >
                    Edytuj
                  </Button>
                  <Button
                    onClick={() => deleteUser(user._id)}
                    size={'2xl'}
                    style={{
                      backgroundColor: '#dc3545', // Czerwone tło
                      color: 'white', // Biały tekst
                      border: '2px solid #dc3545', // Czerwona ramka
                      borderRadius: '5px', // Zaokrąglone rogi
                      padding: '0.75rem 1.5rem', // Wygodne wypełnienie
                      margin: '.2rem .5rem', // Odstęp od innych elementów
                      fontWeight: 'bold', // Pogrubiony tekst
                      cursor: 'pointer', // Zmieniony kursor na wskaźnik
                      transition: 'background-color 0.3s ease, border 0.3s ease' // Płynne przejście efektów
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#c82333'; // Zmiana tła na ciemniejsze przy najechaniu
                      e.target.style.border = '2px solid #c82333'; // Zmiana ramki
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#dc3545'; // Przywrócenie początkowego tła
                      e.target.style.border = '2px solid #dc3545'; // Przywrócenie początkowej ramki
                    }}
                  >
                    Usuń
                  </Button>
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Flex justifyContent={'center'} alignItems={'center'}>
        <button
          onClick={handleBulkDelete}
          disabled={selection.length === 0}
          style={{
            marginTop: '2rem',
            background: 'rgb(236, 85, 20)',
            color: 'white',
            padding: '.5rem 1rem',
            margin: '.5rem',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '4px 4px 10px rgba(236, 85, 20, 0.4)' // Subtelniejszy cień
          }}
          onMouseOver={(e) => {
            e.target.style.boxShadow = '6px 6px 12px rgba(236, 85, 20, 0.6)'; // Mocniejszy efekt na hover
          }}
          onMouseOut={(e) => {
            e.target.style.boxShadow = '4px 4px 10px rgba(236, 85, 20, 0.4)'; // Powrót do pierwotnego efektu
          }}
        >
          Usuń zaznaczonych użytkowników
        </button>
      </Flex>
    </Flex>
  );
};

export default Users;
