import { useState, useEffect } from 'react';
import {
  Heading,
  Button,
  Input,
  Textarea,
  Image,
  Flex
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { categories, subcategories } from '../categories';
import Navbar from '../components/layout/Navbar/Navbar';
const Adds = ({ height }) => {
  const [categoriesEl, setCategories] = useState(categories);
  const [subcategoriesEl, setSubcategories] = useState(subcategories);
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
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

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
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight * 0.2) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Flex
      bgImage="linear-gradient(90deg, rgba(105,127,141,1) 0%, rgba(97,120,134,1) 35%, rgba(70,93,109,1) 80%, rgba(58,79,96,1) 100%)"
      flexDir={'column'}
    >
      <Navbar
        background={scrolled ? 'rgba(92, 92, 92,1)' : 'rgba(92, 92, 92,0)'}
        height={scrolled ? '84px' : '80px'}
        width={'100%'}
      />
      <Flex
        height="100vh"
        direction="column"
        color="black"
        justifyContent="center"
        alignItems="center"
        px={4} // Padding na bokach
      >
        <Flex
          mt={{ base: '50px', md: '100px' }} // Mniejsze marginesy na mniejszych ekranach
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          bg="rgba(18,	19,	21, 0.95)" // Dodanie przezroczystości tła
          p={6}
          borderRadius="xl" // Zaokrąglone rogi formularza
          boxShadow="lg" // Cień
          width={{ base: '90%', sm: '80%', md: '70%', lg: '60%' }} // Szerokość formularza zależna od rozmiaru ekranu
        >
          <Heading
            fontSize={{ base: '1.5rem', sm: '2rem', md: '2.5rem' }} // Responsywna wielkość nagłówka
            fontWeight="bold"
            padding="1rem"
            bg={'#545a7e'}
            rounded="xl"
            mb={4}
            textAlign="center"
          >
            Dodaj Ogłoszenie
          </Heading>

          <form onSubmit={handleAddEntry} style={{ width: '100%' }}>
            <Input
              name="title"
              value={newData.title}
              onChange={handleInputChange}
              placeholder="Nazwa przedmiotu"
              _placeholder={{ color: 'black' }}
              mb={4}
              borderColor="gray.500"
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ borderColor: 'blue.600' }}
              size="lg"
              borderRadius="md"
              bg="whiteAlpha.800"
              color="black"
              p={4}
              required
            />
            <Textarea
              name="note"
              value={newData.note}
              onChange={handleInputChange}
              placeholder="Krótki opis"
              _placeholder={{ color: 'black' }}
              mb={4}
              lineHeight={1.5}
              pt={10}
              pb={10}
              borderColor="gray.500"
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ borderColor: 'blue.600' }}
              size="lg"
              borderRadius="md"
              bg="whiteAlpha.800"
              color="black"
              p={4}
            />
            <Input
              name="price"
              type="number"
              value={newData.price}
              onChange={handleInputChange}
              placeholder="Cena"
              _placeholder={{ color: 'black' }}
              mb={4}
              borderColor="black"
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ borderColor: 'blue.600' }}
              size="lg"
              borderRadius="lg"
              bg="whiteAlpha.800"
              color="black"
              p={4}
            />
            <select
              name="category"
              value={newData.category}
              onChange={handleInputChange}
              placeholder="Wybierz kategorię"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.80',
                color: 'black',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid black',
                width: '100%',
                marginBottom: '1rem'
              }}
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
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.80',
                  color: 'black',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid black',
                  width: '100%',
                  marginBottom: '1rem'
                }}
              >
                <option value="">Wybierz podkategorię</option>
                {subcategoriesEl[newData.category]?.map((subcategory) => (
                  <option key={subcategory.value} value={subcategory.value}>
                    {subcategory.label}
                  </option>
                ))}
              </select>
            )}

            <Input
              type="file"
              onChange={handleFileChange}
              mb={4}
              borderColor="gray.500"
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ borderColor: 'blue.600' }}
              size="lg"
              borderRadius="md"
              bg="whiteAlpha.800"
              color="black"
              p={1}
            />
            {preview && (
              <Image src={preview} alt="Podgląd" width="100px" mb={4} />
            )}
            <Button
              type="submit"
              size="lg"
              width="100%"
              borderRadius="md"
              bg={'red'}
              _hover={{ bg: 'blue.500' }}
              fontWeight={'bold'}
              fontSize={'14px'}
            >
              Dodaj Ogłoszenie
            </Button>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Adds;
