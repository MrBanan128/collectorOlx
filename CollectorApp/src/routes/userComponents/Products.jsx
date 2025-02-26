import { useState, useEffect } from 'react';
import {
  Flex,
  Button,
  Input,
  Textarea,
  Image,
  Box,
  Heading,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ExpertContact from './ExpertContact';

const Products = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [newData, setNewData] = useState({
    title: '',
    note: '',
    price: '',
    category: '',
    subcategory: '',
    avatar: null
  });
  const [preview, setPreview] = useState(null);
  const [entries, setEntries] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({ title: '', note: '', price: '' });
  const [error, setError] = useState(null);
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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewData((prev) => ({ ...prev, [name]: value }));

  //   if (name === 'category') {
  //     setNewData((prev) => ({ ...prev, subcategory: '' }));
  //   }
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setNewData((prev) => ({ ...prev, avatar: file }));
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  // const handleAddEntry = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem('token');

  //   const formData = new FormData();
  //   formData.append('title', newData.title);
  //   formData.append('body', newData.note);
  //   formData.append('price', newData.price);
  //   formData.append('category', newData.category);
  //   formData.append('subcategory', newData.subcategory);
  //   if (newData.avatar) formData.append('image', newData.avatar);

  //   try {
  //     const response = await fetch('http://localhost:10000/users/entries', {
  //       method: 'POST',
  //       headers: { Authorization: `Bearer ${token}` },
  //       body: formData
  //     });

  //     if (!response.ok) throw new Error('Błąd dodawania wpisu');

  //     const { note } = await response.json();
  //     setEntries((prevEntries) => [...prevEntries, note]);

  //     setNewData({
  //       title: '',
  //       note: '',
  //       price: '',
  //       category: '',
  //       subcategory: '',
  //       avatar: null
  //     });
  //     setPreview(null);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  const handleEditClick = (entry) => {
    setEditMode(entry._id);
    setEditData({ title: entry.title, note: entry.body, price: entry.price });
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
          body: JSON.stringify({ ...editData, body: editData.note })
        }
      );

      if (!response.ok) throw new Error('Błąd podczas aktualizacji notatki');

      const updatedNote = await response.json();

      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry._id === noteId
            ? { ...entry, ...updatedNote, note: updatedNote.body }
            : entry
        )
      );

      setEditMode(null);
    } catch (error) {
      console.error('Błąd aktualizacji notatki:', error);
    }
  };

  const handleDeleteEntry = async (noteId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(
        `http://localhost:10000/users/entries/${noteId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
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
    <Flex direction="column" align="center" width={'100%'} overflow="auto">
      {/* <form
        onSubmit={handleAddEntry}
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <Input
          name="title"
          value={newData.title}
          onChange={handleInputChange}
          placeholder="Tytuł wpisu"
          mb={2}
        />
        <Textarea
          name="note"
          value={newData.note}
          onChange={handleInputChange}
          placeholder="Dodaj notatkę"
          mb={2}
        />
        <Input
          name="price"
          type="number"
          value={newData.price}
          onChange={handleInputChange}
          placeholder="Cena"
          mb={2}
        />
        <select
          name="category"
          value={newData.category}
          onChange={handleInputChange}
          placeholder="Wybierz kategorię"
        >
          <option value="">Wybierz kategorię</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        {newData.category && (
          <select
            name="subcategory"
            value={newData.subcategory}
            onChange={handleInputChange}
            placeholder="Wybierz podkategorię"
          >
            <option value="">Wybierz podkategorię</option>
            {subcategories[newData.category]?.map((subcategory) => (
              <option key={subcategory.value} value={subcategory.value}>
                {subcategory.label}
              </option>
            ))}
          </select>
        )}

        <Input type="file" onChange={handleFileChange} mb={2} />
        {preview && <Image src={preview} alt="Podgląd" width="100px" mb={2} />}
        <Button type="submit" colorScheme="blue">
          Dodaj wpis
        </Button>
      </form> */}

      <Box mt={5} width="100%" height={'100vh'}>
        <Heading size={'4xl'} padding={'1rem'} color={'white'}>
          Moje Ogłoszenia:
        </Heading>

        {entries.map((entry, index) => (
          <Flex
            key={index}
            padding="10px"
            marginBottom="10px"
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={'column'}
            width={'100%'}
            rounded={'lg'}
            color={'white'}
          >
            {editMode === entry._id ? (
              <Flex
                flexDir={'row'}
                width={'300px'}
                justifyContent={'center'}
                alignItems={'center'}
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)' }}
                padding={'10px'}
                rounded={'xl'}
                md={{ width: '500px' }}
              >
                <Flex>
                  <Image
                    src={entry.image}
                    alt="Obraz"
                    autoresize="true"
                    width="150px"
                    height={'250px'}
                    sm={{ width: '150px' }}
                    md={{ width: '200px' }}
                  />
                </Flex>
                <Flex flexDir={'column'} ml={8}>
                  <Input
                    name="title"
                    value={editData.title}
                    onChange={handleEditInputChange}
                    placeholder="Edytuj tytuł"
                    mb={2}
                    fontSize={{ base: '1rem', md: '2rem' }}
                    backgroundColor="#333"
                    color="white"
                    padding="0.5rem"
                    borderRadius="8px"
                    border="1px solid #555"
                    width="100%"
                    _hover={{
                      borderColor: '#888'
                    }}
                  />

                  <Textarea
                    name="note"
                    value={editData.note}
                    onChange={handleEditInputChange}
                    placeholder="Edytuj treść"
                    mb={2}
                    fontSize={{ base: '1rem', md: '1.5rem' }}
                    backgroundColor="#333"
                    color="white"
                    lineHeight={1.5}
                    padding="0.5rem"
                    borderRadius="8px"
                    border="1px solid #555"
                    width="100%"
                    autoresize="true"
                    _hover={{
                      borderColor: '#888'
                    }}
                  />

                  <Input
                    name="price"
                    type="number"
                    value={editData.price}
                    onChange={handleEditInputChange}
                    placeholder="Edytuj numer telefonu"
                    mb={2}
                    fontSize={{ base: '1rem', md: '1.5rem' }}
                    backgroundColor="#333"
                    color="white"
                    padding="0.5rem"
                    borderRadius="8px"
                    border="1px solid #555"
                    width="100%"
                    _hover={{
                      borderColor: '#888'
                    }}
                  />

                  <Button
                    onClick={() => handleSaveEdit(entry._id)}
                    mt={2}
                    width={'100%'}
                    style={{
                      backgroundColor: '#28a745', // Zielony kolor tła (np. dla "Zapisz")
                      color: 'white', // Biały tekst
                      border: 'none', // Brak obramowania
                      borderRadius: '8px', // Zaokrąglone rogi
                      padding: '0.5rem', // Wewnętrzne odstępy
                      fontSize: '1rem', // Rozmiar czcionki
                      cursor: 'pointer', // Zmieniany kursor przy najechaniu
                      transition: 'all 0.3s ease' // Płynne przejście dla efektów
                    }}
                    _hover={{
                      backgroundColor: '#218838', // Ciemniejszy zielony przy hover
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Dodany cień przy hover
                    }}
                  >
                    Zapisz
                  </Button>

                  <Button
                    onClick={() => setEditMode(null)}
                    mt={2}
                    style={{
                      backgroundColor: '#dc3545', // Czerwony kolor tła (np. dla "Anuluj")
                      color: 'white', // Biały tekst
                      border: 'none', // Brak obramowania
                      borderRadius: '8px', // Zaokrąglone rogi
                      padding: '0.5rem', // Wewnętrzne odstępy
                      fontSize: '1rem', // Rozmiar czcionki
                      cursor: 'pointer', // Zmieniany kursor przy najechaniu
                      transition: 'all 0.3s ease' // Płynne przejście dla efektów
                    }}
                    _hover={{
                      backgroundColor: '#c82333', // Ciemniejszy czerwony przy hover
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Dodany cień przy hover
                    }}
                  >
                    Anuluj
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <Flex
                key={index}
                flexDir={'column'}
                width={'100%'}
                padding="10px"
                marginBottom="10px"
                rounded={'lg'}
                style={{
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)'
                }}
              >
                <Flex onClick={() => navigate(`/entry/${entry._id}`)}>
                  <Flex justifyContent={'center'} alignItems={'center'}>
                    <Image
                      src={entry.image}
                      alt="Obraz"
                      minW={'100px'}
                      height={'200px'}
                      objectFit={'cover'}
                      sm={{ minW: '150px', maxW: '150px', height: '200px' }}
                    />
                  </Flex>
                  <Flex flexDir={'column'} ml={2}>
                    <Heading size={'2xl'} mb={2} sm={{ fontSize: '4xl' }}>
                      {entry.title || 'Bez tytułu'}
                    </Heading>
                    <Flex flexDir={'column'} sm={{ fontSize: '14px' }}>
                      <Text>{entry.body || 'Brak treści'}</Text>
                      <Text mt={8} color={'rgb(246, 255, 0)'}>
                        {entry.price + ' PLN' || 'Brak numeru telefonu'}{' '}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  mt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDir={'row'}
                  sm={{ flexDir: 'row' }}
                >
                  {entry.image && (
                    <Button
                      onClick={() => handleDeleteImage(entry._id)}
                      mt={2}
                      sm={{ fontSize: '14px', width: '150px' }}
                      style={{
                        background: '#ff4d4d', // Czerwony kolor tła dla usuwania
                        color: '#fff', // Biały kolor tekstu
                        padding: '0.5rem 1rem', // Wygodne wypełnienie
                        borderRadius: '5px', // Zaokrąglone rogi
                        border: 'none', // Brak obramowania
                        cursor: 'pointer', // Kursor wskazujący na kliknięcie
                        transition: 'background 0.3s ease' // Przejście dla tła
                      }}
                      _hover={{
                        background: '#ff1a1a' // Zmiana tła na ciemniejszy czerwony po najechaniu
                      }}
                    >
                      Usuń zdjęcie
                    </Button>
                  )}
                  <Button
                    onClick={() => handleEditClick(entry)}
                    mt={2}
                    sm={{ fontSize: '14px', width: '150px' }}
                    style={{
                      background: '#4CAF50', // Zielone tło dla edycji
                      color: '#fff', // Biały kolor tekstu
                      padding: '0.5rem 1rem', // Wygodne wypełnienie
                      borderRadius: '5px', // Zaokrąglone rogi
                      border: 'none', // Brak obramowania
                      cursor: 'pointer', // Kursor wskazujący na kliknięcie
                      transition: 'background 0.3s ease' // Przejście dla tła
                    }}
                    _hover={{
                      background: '#45a049' // Zmiana tła na ciemniejszy zielony po najechaniu
                    }}
                  >
                    Edytuj
                  </Button>

                  <Button
                    onClick={() => handleDeleteEntry(entry._id)}
                    mt={2}
                    sm={{ fontSize: '14px', width: '150px' }}
                    style={{
                      background: '#ff7043', // Pomarańczowe tło dla usuwania notatki
                      color: '#fff', // Biały kolor tekstu
                      padding: '0.5rem 1rem', // Wygodne wypełnienie
                      borderRadius: '5px', // Zaokrąglone rogi
                      border: 'none', // Brak obramowania
                      cursor: 'pointer', // Kursor wskazujący na kliknięcie
                      transition: 'background 0.3s ease' // Przejście dla tła
                    }}
                    _hover={{
                      background: '#e64a19' // Zmiana tła na ciemniejszy pomarańczowy po najechaniu
                    }}
                  >
                    Usuń Ogłoszenie
                  </Button>
                </Flex>
              </Flex>
            )}
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};

export default Products;
