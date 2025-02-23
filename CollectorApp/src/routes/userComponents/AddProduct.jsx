import { Button, Flex, Image, Input, Textarea } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
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
  const [preview, setPreview] = useState(null);
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [newData, setNewData] = useState({
    title: '',
    note: '',
    price: '',
    category: '',
    subcategory: '',
    avatar: null
  });

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
      </form>
    </Flex>
  );
};

export default AddProduct;
