
import { useState, useEffect} from 'react';
import { Heading, Box, Button, Input, Textarea, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { categories, subcategories } from '../categories';




const Adds = () => {

  const [categoriesEl, setCategories] = useState(categories);
  const [subcategoriesEl, setSubcategories] = useState(subcategories);
  const [newData, setNewData] = useState({
    title: '', note: '', price: '', category: '', subcategory: '', avatar: null
});
const [preview, setPreview] = useState(null);
const [entries, setEntries] = useState([]);
const [error, setError] = useState(null);
const navigate = useNavigate();

 useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
    }, [navigate]);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewData(prev => ({ ...prev, [name]: value }));

  if (name === 'category') {
      setNewData(prev => ({ ...prev, subcategory: '' }));
  }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
      setNewData(prev => ({ ...prev, avatar: file }));
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
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
      });

      if (!response.ok) throw new Error('Błąd dodawania wpisu');

      const { note } = await response.json();
      setEntries(prevEntries => [...prevEntries, note]);

      setNewData({ title: '', note: '', price: '', category: '', subcategory: '', avatar: null });
      setPreview(null);
  } catch (error) {
      setError(error.message);
  }
};

  return (
    <Box backgroundColor="#222222" height={'100vh'}>
      <Heading
        fontSize="2rem"
        fontWeight="bold"
        padding="1rem"
        backgroundColor="gray.400">
          Stwórz Produkt
        </Heading>

        <form onSubmit={handleAddEntry} style={{ maxWidth: '400px', width: '100%' }}>
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
                    {categoriesEl.map((category) => (
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
                        {subcategoriesEl[newData.category]?.map((subcategory) => (
                            <option key={subcategory.value} value={subcategory.value}>
                                {subcategory.label}
                            </option>
                        ))}
                    </select>
                )}

                <Input type="file" onChange={handleFileChange} mb={2} />
                {preview && <Image src={preview} alt="Podgląd" width="100px" mb={2} />}
                <Button type="submit" colorScheme="blue">Dodaj wpis</Button>
            </form>

    </Box>
  );
};

export default Adds;
