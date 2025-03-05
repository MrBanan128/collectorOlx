import { useState, useEffect, useRef } from 'react';
import {
  Heading,
  Input,
  Textarea,
  Flex,
  Text,
  Box,
  Button
} from '@chakra-ui/react';
import { Image } from 'primereact/image';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { categories, subcategories } from '../categories';
import Navbar from '../components/layout/Navbar/Navbar';
import { HiUpload } from 'react-icons/hi';

const Adds = () => {
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
  const toast = useRef(null);
  const titleInputRef = useRef(null);
  const textInputRef = useRef(null);

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

  if (newData.price === '') {
    setNewData((prev) => ({ ...prev, price: 0 }));
  }

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

    if (
      !newData.title ||
      !newData.note ||
      !newData.category ||
      !newData.subcategory
    ) {
      toast.current.show({
        detail: 'Musisz uzupełnić wszystkie pola!',
        life: 3000,
        style: {
          backgroundColor: 'rgb(255, 0, 0)', // Ciemniejsze tło
          color: '#000', // Jasny tekst
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '16px',
          marginTop: '70px'
        },
        className: 'custom-toast'
      });
    } else if (!newData.avatar) {
      toast.current.show({
        detail: 'Musisz dodać zdjęcie!',
        life: 3000,
        style: {
          backgroundColor: 'rgb(255, 0, 0)', // Ciemniejsze tło
          color: '#000', // Jasny tekst
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '16px',
          marginTop: '70px'
        },
        className: 'custom-toast'
      });
    }

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
      toast.current.show({
        detail: 'Ogłoszenie dodane!',
        life: 3000,
        style: {
          backgroundColor: 'rgb(0, 255, 0)', // Ciemniejsze tło
          color: '#000', // Jasny tekst
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '16px',
          marginTop: '70px'
        },
        className: 'custom-toast'
      });
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
    <Flex bg={'#1c212b'} flexDir={'column'} h={'100%'}>
      <Navbar
        background={scrolled ? 'rgba(92, 92, 92,1)' : 'rgba(92, 92, 92,0)'}
        height={scrolled ? '84px' : '80px'}
        width={'100%'}
      />
      <Toast ref={toast} position="top-right" /> {/* Komponent Toast */}
      <Flex
        justifyContent={'center'}
        textAlign={'left'}
        height="100vh"
        mt={scrolled ? '124px' : '120px'}
      >
        <Flex direction="column" color="white" width={'60%'}>
          <Flex>
            <Heading fontSize={'6xl'} pb={20}>
              Dodaj ogłoszenie
            </Heading>
          </Flex>
          <Flex
            color={'black'}
            border={'5px solid #b7410e'}
            borderRadius="lg"
            padding={5}
          >
            <form onSubmit={handleAddEntry} style={{ width: '100%' }}>
              <Flex
                bg={'white'}
                p={12}
                borderRadius="md"
                boxShadow="lg"
                flexDirection={'column'}
                gap={6}
              >
                <Flex direction="column" gap={2}>
                  <Text
                    w={'20%'}
                    color={'#b7410e'}
                    fontSize={'20px'}
                    cursor={'pointer'}
                    onClick={() => titleInputRef.current.focus()}
                  >
                    Tytuł ogłoszenia*
                  </Text>
                  <Input
                    name="title"
                    value={newData.title}
                    onChange={handleInputChange}
                    placeholder="Nazwa przedmiotu"
                    _placeholder={{ color: 'gray.500' }}
                    rounded={'xl'}
                    p={6}
                    bg="#f2f4f5"
                    color="black"
                    w={'40%'}
                    size={'2xl'}
                    fontSize={'2xl'}
                    _focus={{ borderColor: ' #b7410e' }}
                    ref={titleInputRef}
                  />
                </Flex>
                <Flex direction="column">
                  <Text w={'20%'} color={'#b7410e'} fontSize={'16px'} ml={4}>
                    Kategoria
                  </Text>
                  <select
                    name="category"
                    value={newData.category}
                    onChange={handleInputChange}
                    placeholder="Wybierz kategorię"
                    style={{
                      backgroundColor: '#f2f4f5',
                      color: 'black',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid black',
                      marginBottom: '1rem',
                      width: '30%'
                    }}
                    _focus={{ borderColor: ' #b7410e' }}
                  >
                    <option value="">Wybierz kategorię</option>
                    {categoriesEl.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>

                  {newData.category && (
                    <Box>
                      <Text
                        w={'20%'}
                        color={'#b7410e'}
                        fontSize={'16px'}
                        ml={4}
                      >
                        Podkategoria
                      </Text>
                      <select
                        name="subcategory"
                        value={newData.subcategory}
                        onChange={handleInputChange}
                        placeholder="Wybierz podkategorię"
                        _focus={{ borderColor: ' #b7410e' }}
                        style={{
                          backgroundColor: '#f2f4f5',
                          color: 'black',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid black',
                          width: '30%',
                          marginBottom: '1rem'
                        }}
                      >
                        <option value="">Wybierz podkategorię</option>
                        {subcategoriesEl[newData.category]?.map(
                          (subcategory) => (
                            <option
                              key={subcategory.value}
                              value={subcategory.value}
                            >
                              {subcategory.label}
                            </option>
                          )
                        )}
                      </select>
                    </Box>
                  )}
                </Flex>
              </Flex>
              <Flex
                bg={'white'}
                p={12}
                borderRadius="md"
                boxShadow="lg"
                mt={4}
                flexDirection={'row'}
                justifyContent={'space-between'}
                paddingBottom={6}
              >
                <Flex direction="column" gap={2}>
                  <Text
                    w={'20%'}
                    color={'#b7410e'}
                    fontSize={'20px'}
                    cursor={'pointer'}
                    onClick={() => textInputRef.current.focus()}
                  >
                    Opis*
                  </Text>
                  <Textarea
                    name="note"
                    value={newData.note}
                    onChange={handleInputChange}
                    fontSize={'xl'}
                    placeholder="Wpisz tutaj najważniejsze informacje dotyczące twojego ogłoszenia"
                    _placeholder={{ color: 'gray.500' }}
                    lineHeight={1.5}
                    minH={'150px'}
                    w={'600px'}
                    size="lg"
                    borderRadius="lg"
                    _focus={{ borderColor: ' #b7410e' }}
                    bg="#f2f4f5"
                    color="black"
                    p={4}
                    ref={textInputRef}
                  />
                </Flex>
                <Flex direction="column" gap={2} alignItems="center">
                  <Box
                    position="relative"
                    cursor="pointer"
                    bg="#f2f4f5"
                    padding={4}
                    rounded={'lg'}
                    onChange={handleFileChange}
                  >
                    <Text color={'#b7410e'}>Dodaj zdjęcie*</Text>
                    <Button
                      as="label"
                      htmlFor="file-upload"
                      color="black"
                      bg="#f2f4f5"
                      _hover={{ bg: '#adadad' }}
                      px={4}
                      py={2}
                      borderRadius="lg"
                      shadow={'md'}
                      fontSize={'xl'}
                    >
                      <HiUpload style={{ marginRight: '8px' }} /> Wybierz plik
                    </Button>
                    <Input id="file-upload" type="file" display="none" />
                  </Box>

                  {preview && (
                    <Box p={'2rem'} borderRadius="md" mb={'1rem'}>
                      <Image
                        src={preview}
                        alt="Podgląd"
                        width="150px"
                        mb={4}
                        preview
                        indicatorIcon="null"
                      />
                    </Box>
                  )}
                </Flex>
              </Flex>
              <Flex
                bg={'white'}
                p={12}
                borderRadius="md"
                boxShadow="lg"
                mt={4}
                flexDirection={'column'}
                gap={6}
              >
                <Flex flexDir={'column'} gap={2}>
                  <Text
                    w={'80%'}
                    color={'#b7410e'}
                    fontSize={'20px'}
                    borderBottom={'1px solid #b7410e'}
                    marginBottom={'1rem'}
                  >
                    Jeżeli nie znasz wartości przedmiotu to cene ustaw na 0
                  </Text>
                  <Flex>
                    <Input
                      name="price"
                      type="number"
                      value={newData.price}
                      onChange={handleInputChange}
                      minW={'20%'}
                      w={'20%'}
                      fontSize={'20px'}
                      padding={'10px'}
                      size="2xl"
                      placeholder="Cena w zł"
                      _placeholder={{ color: 'gray.500' }}
                      mb={4}
                      border={'none'}
                      bg="#f2f4f5"
                      borderRadius="lg"
                      color="black"
                      _focus={{ borderColor: '#b7410e' }}
                    />
                    <Text ml={5} fontSize={'20px'}>
                      PLN
                    </Text>
                  </Flex>
                </Flex>
                <Flex justifyContent="center">
                  <Button
                    type="submit"
                    size="xl"
                    width="30%"
                    borderRadius="xl"
                    bg={'#b7410e'}
                    _hover={{ bg: '#82300c' }}
                    fontWeight={'bold'}
                    fontSize={'20px'}
                  >
                    Dodaj Ogłoszenie
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Adds;
