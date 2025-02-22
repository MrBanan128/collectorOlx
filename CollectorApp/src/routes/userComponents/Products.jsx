import { useState, useEffect } from 'react';
import {
  Flex,
  Button,
  Input,
  Textarea,
  Image,
  Box,
  Heading
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router';

const Products = () => {
  const [newData, setNewData] = useState({
    title: '',
    note: '',
    phoneNumber: '',
    avatar: null
  });
  const [preview, setPreview] = useState(null);
  const [entries, setEntries] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    note: '',
    phoneNumber: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUserNotes();
  }, [navigate]);

  const fetchUserNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:10000/users/entries', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Błąd pobierania notatek');

      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Błąd pobierania notatek:', error);
      setError(error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewData((prev) => ({ ...prev, avatar: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // ====================================== Edit ====================================//

  const handleEditClick = (entry) => {
    setEditMode(entry._id);
    setEditData({
      title: entry.title,
      note: entry.body,
      phoneNumber: entry.phoneNumber
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (noteId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(
        `http://localhost:10000/users/entries/${noteId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...editData, body: editData.note }) // Zamiana note na body przy wysyłaniu
        }
      );

      if (!response.ok) throw new Error('Błąd podczas aktualizacji notatki');

      const updatedNote = await response.json();

      // Aktualizacja stanu z body przypisanym do note
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry._id === noteId
            ? { ...entry, ...updatedNote, note: updatedNote.body }
            : entry
        )
      );

      setEditMode(null); // Wyłącz tryb edycji
    } catch (error) {
      console.error('Błąd aktualizacji notatki:', error);
    }
  };

  // ============================================== DELETED ============================================== //

  const handleDeleteEntry = async (noteId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(
        `http://localhost:10000/users/entries/${noteId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Błąd podczas usuwania notatki');
      }

      setEntries(entries.filter((entry) => entry._id !== noteId));
    } catch (error) {
      console.error('Błąd usuwania notatki:', error);
    }
  };

  const handleDeleteImage = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:10000/users/entries/image/${noteId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!response.ok) throw new Error('Błąd usuwania zdjęcia');

      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry._id === noteId
            ? { ...entry, image: null, imageId: null }
            : entry
        )
      );
    } catch (error) {
      console.error('Błąd usuwania zdjęcia:', error.message);
    }
  };

  return (
    <Flex
      margin="30px"
      direction="column"
      align="center"
      color={'white'}
      width={'100%'}
      height={'100%'}
      overflow={'hidden'}
      xl={{ minHeight: '100vh' }}
    >
      <Button
        as={NavLink}
        to="/dashboard/add-product"
        bgGradient="linear(to-r, #4a90e2, #2c3e50)" // Gradient z niebieskiego do szarego
        color="white" // Kolor tekstu biały
        _hover={{
          bgGradient: 'linear(to-r, #5a9bd5, #34495e)', // Jaśniejszy gradient na hover
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Efekt cienia przy hoverze
          transform: 'scale(1.05)' // Lekkie powiększenie przy hoverze
        }}
        _active={{
          bgGradient: 'linear(to-r, #2c3e50, #4a90e2)', // Gradient przy aktywnym stanie
          transform: 'scale(0.98)' // Zmniejszenie przy kliknięciu
        }}
        borderRadius="md" // Zaokrąglone rogi
        paddingX={6} // Szerokość przycisku
        paddingY={4} // Wysokość przycisku
        fontSize="lg" // Rozmiar czcionki
        transition="all 0.3s ease" // Płynna animacja przy zmianie stanu
      >
        Dodaj Ogłoszenie
      </Button>

      <Box mt={5} width="100%">
        <Heading fontSize={'18px'} paddingBottom={'10px'} textAlign={'center'}>
          Twoje ogłoszenia:
        </Heading>
        {entries.map((entry, index) => (
          <Box key={index} padding="10px" marginBottom="10px">
            {editMode === entry._id ? (
              <Flex flexDir={'column'}>
                <Input
                  name="title"
                  value={editData.title}
                  onChange={handleEditInputChange}
                  placeholder="Edytuj tytuł"
                  mb={2}
                />
                <Textarea
                  name="note"
                  value={editData.note}
                  onChange={handleEditInputChange}
                  placeholder="Edytuj treść"
                  mb={2}
                />
                <Input
                  name="phoneNumber"
                  type="number"
                  value={editData.phoneNumber}
                  onChange={handleEditInputChange}
                  placeholder="Edytuj numer telefonu"
                  mb={2}
                />
                <Input type="file" onChange={handleFileChange} mb={2} />
                {preview && (
                  <Image src={preview} alt="Podgląd" width="100px" mb={2} />
                )}
                <Button
                  onClick={() => handleSaveEdit(entry._id)}
                  colorScheme="green"
                  mt={2}
                >
                  Zapisz
                </Button>
                <Button
                  onClick={() => setEditMode(null)}
                  colorScheme="gray"
                  mt={2}
                  ml={2}
                >
                  Anuluj
                </Button>
              </Flex>
            ) : (
              <Flex direction="column">
                <Flex
                  justifyContent="space-around"
                  alignItems="center"
                  textAlign="center"
                  mb={2}
                >
                  {(entry.image && (
                    <Image
                      src={entry.image}
                      alt="Obraz"
                      width="150px"
                      rounded="10px"
                      boxShadow={'2xl'}
                      sm={{ width: '150px' }}
                      md={{ width: '200px' }}
                      lg={{ width: '250px' }}
                    />
                  )) ||
                    'Brak zdjęcia'}
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    flexDir={'column'}
                  >
                    <Heading mr="0%" fontSize="20px">
                      {entry.title || 'Bez tytułu'}
                    </Heading>

                    <p>{entry.body || 'Brak treści'}</p>
                    <p>{entry.phoneNumber || 'Brak numeru telefonu'}</p>
                  </Flex>
                </Flex>

                {entry.image && (
                  <Flex justifyContent="center">
                    <Button
                      onClick={() => handleDeleteImage(entry._id)}
                      colorScheme="red"
                      mt={2}
                      borderRadius="8px"
                      boxShadow="md"
                      width={'100px'}
                      px={4}
                      py={2}
                      _hover={{ bg: 'red.600', transform: 'scale(1.05)' }}
                      _active={{ bg: 'red.700', transform: 'scale(0.98)' }}
                    >
                      🗑 Usuń zdjęcie
                    </Button>
                  </Flex>
                )}
                <Flex
                  justifyContent={'center'}
                  flexDir={'row'}
                  alignItems={'center'}
                  gap={4}
                >
                  <Button
                    onClick={() => handleEditClick(entry)}
                    colorScheme="blue"
                    mt={2}
                    borderRadius="8px"
                    boxShadow="md"
                    width={'100px'}
                    px={4}
                    py={2}
                    _hover={{ bg: 'blue.600', transform: 'scale(1.05)' }}
                    _active={{ bg: 'blue.700', transform: 'scale(0.98)' }}
                  >
                    ✏️ Edytuj
                  </Button>

                  <Button
                    onClick={() => handleDeleteEntry(entry._id)}
                    colorScheme="red"
                    mt={2}
                    width={'100px'}
                    borderRadius="8px"
                    boxShadow="md"
                    px={4}
                    py={2}
                    _hover={{ bg: 'red.600', transform: 'scale(1.05)' }}
                    _active={{ bg: 'red.700', transform: 'scale(0.98)' }}
                  >
                    ❌ Usuń
                  </Button>
                </Flex>
              </Flex>
            )}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default Products;
