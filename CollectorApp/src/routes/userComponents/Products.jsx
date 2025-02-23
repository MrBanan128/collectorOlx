import { useState, useEffect } from 'react';
import { Flex, Button, Input, Textarea, Image, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [categories, setCategories] = useState([
    { value: 'Figurka', label: 'Figurka' },
    { value: 'Znaczek', label: 'Znaczek' },
    { value: 'Moneta', label: 'Moneta' },
    { value: 'Karta', label: 'Karta' },
    { value: 'Inne', label: 'Inne' }
  ]);

  const [subcategories, setSubcategories] = useState({
    Figurka: [
      { value: 'fantasy', label: 'fantasy' },
      { value: 'miedziana', label: 'Miedziana' },
      { value: 'porcelanowa', label: 'Porcelanowe' }
    ],
    Znaczek: [
      { value: 'wojskowy', label: 'Wojskowy' },
      { value: 'personalizowany', label: 'Personalizowany' },
      { value: 'urzędowy', label: 'Urzędowy' }
    ],
    Moneta: [
      { value: 'złota', label: 'Złota' },
      { value: 'srebrna', label: 'Srebrna' },
      { value: 'zabytkowa', label: 'Zabytkowa' }
    ],
    Karta: [
      { value: 'fantasy', label: 'Fantasy' },
      { value: 'sportowa', label: 'Sportowa' },
      { value: 'muzyczna', label: 'Muzyczna' }
    ],
    Inne: [
      { value: 'samochody', label: 'Samochody' },
      { value: 'dzieła sztuki', label: 'Dzieła sztuki' },
      { value: 'Zastawa stołowa', label: 'Zastawa stołowa' }
    ]
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prev) => ({ ...prev, [name]: value }));

    if (name === 'category') {
      setNewData((prev) => ({ ...prev, subcategory: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewData((prev) => ({ ...prev, avatar: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', newData.title);
    formData.append('body', newData.note);
    formData.append('price', newData.price);
    formData.append('category', newData.category);
    formData.append('subcategory', newData.subcategory);
    if (newData.avatar) formData.append('image', newData.avatar);

    try {
      const response = await fetch('http://localhost:10000/users/entries', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (!response.ok) throw new Error('Błąd dodawania wpisu');

      const { note } = await response.json();
      setEntries((prevEntries) => [...prevEntries, note]);

      setNewData({
        title: '',
        note: '',
        price: '',
        category: '',
        subcategory: '',
        avatar: null
      });
      setPreview(null);
    } catch (error) {
      setError(error.message);
    }
  };

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
    <Flex margin="50px" direction="column" align="center">
      <form
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
          mb={2}
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
            mb={2}
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
      </form>

      <Box mt={5} width="100%">
        <h3>Wpisy:</h3>

        {entries.map((entry, index) => (
          <Box
            key={index}
            border="1px solid #ccc"
            padding="10px"
            marginBottom="10px"
          >
            {editMode === entry._id ? (
              <>
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
                  name="price"
                  type="number"
                  value={editData.price}
                  onChange={handleEditInputChange}
                  placeholder="Edytuj numer telefonu"
                  mb={2}
                />
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
              </>
            ) : (
              <Box
                key={index}
                border="1px solid #ccc"
                padding="10px"
                marginBottom="10px"
                onClick={() => navigate(`/entry/${entry._id}`)}
              >
                <h4>{entry.title || 'Bez tytułu'}</h4>
                <p>{entry.body || 'Brak treści'}</p>
                <p>{entry.price || 'Brak numeru telefonu'}</p>
                {entry.image && (
                  <>
                    <Image src={entry.image} alt="Obraz" width="100px" />
                    <Button
                      onClick={() => handleDeleteImage(entry._id)}
                      colorScheme="red"
                      mt={2}
                    >
                      Usuń zdjęcie
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => handleEditClick(entry)}
                  colorScheme="blue"
                  mt={2}
                >
                  Edytuj
                </Button>
                <Button
                  onClick={() => handleDeleteEntry(entry._id)}
                  colorScheme="red"
                  mt={2}
                  ml={2}
                >
                  Usuń notatkę
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default Products;
