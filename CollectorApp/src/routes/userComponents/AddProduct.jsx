import { Button, Flex, Image, Input, Textarea } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();

  const [newData, setNewData] = useState({
    title: '',
    note: '',
    phoneNumber: '',
    avatar: null
  });
  const [error, setError] = useState(null);
  const [entries, setEntries] = useState([]);
  const [preview, setPreview] = useState(null);

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
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewData((prev) => ({ ...prev, avatar: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // ============================== ADD ==================================//

  const handleAddEntry = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', newData.title);
    formData.append('body', newData.note);
    formData.append('phoneNumber', newData.phoneNumber); // ➕ DODANE!
    if (newData.avatar) formData.append('image', newData.avatar);

    console.log('FormData przed wysłaniem:', formData); // Sprawdź, czy phoneNumber jest w formData

    try {
      const response = await fetch('http://localhost:10000/users/entries', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (!response.ok) throw new Error('Błąd dodawania wpisu');

      const { note } = await response.json();
      setEntries((prevEntries) => [...prevEntries, note]);

      setNewData({ title: '', note: '', phoneNumber: '', avatar: null });
      setPreview(null);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Flex
      direction="column"
      align="center"
      width="100%"
      padding="15px"
      color={'white'}
    >
      <form
        onSubmit={handleAddEntry}
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <Flex direction="column" align="center" width="100%" gap={4}>
          <Input
            name="title"
            value={newData.title}
            onChange={handleInputChange}
            placeholder="Tytuł wpisu"
            border={'none'}
            borderBottom={'1px solid #ccc'}
            mb={2}
          />
          <Textarea
            name="note"
            value={newData.note}
            onChange={handleInputChange}
            placeholder="Dodaj notatkę"
            border={'none'}
            borderBottom={'1px solid #ccc'}
            mb={2}
          />
          <Input
            name="phoneNumber"
            type="number"
            value={newData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Numer telefonu"
            border={'none'}
            borderBottom={'1px solid #ccc'}
            mb={2}
          />
          <Flex flexDir={'column'} align="center">
            <Input
              type="file"
              onChange={handleFileChange}
              mb={2}
              border={'none'}
            />
            {preview && (
              <Image src={preview} alt="Podgląd" width="100px" mb={2} />
            )}
          </Flex>
          <Button type="submit" colorScheme="blue">
            Dodaj wpis
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default AddProduct;
