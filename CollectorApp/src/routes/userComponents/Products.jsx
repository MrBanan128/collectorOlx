import { useState, useEffect, useRef } from 'react';
import {
  Flex,
  Button,
  Input,
  Textarea,
  Image,
  Box,
  Heading,
  Text,
  Grid
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ExpertContact from './ExpertContact';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';

const Products = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [entries, setEntries] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({ title: '', note: '', price: '' });
  const [error, setError] = useState(null);
  const [expandedEntry, setExpandedEntry] = useState(null);
  const navigate = useNavigate();
  const toast = useRef(null);

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
  const getMenuItems = (entry) =>
    [
      {
        label: 'Edytuj',
        icon: 'pi pi-pencil',
        command: () => handleEditClick(entry)
      },
      {
        label: 'Usuń Ogłoszenie',
        icon: 'pi pi-trash',
        command: () => handleDeleteEntry(entry._id)
      },
      entry.image && {
        label: 'Usuń zdjęcie',
        icon: 'pi pi-image',
        command: () => handleDeleteImage(entry._id)
      },
      {
        label: 'Poproś eksperta o wycenę',
        icon: 'pi pi-user',
        command: () => setSelectedExpert(entry._id)
      }
    ].filter(Boolean); // Usuwa `null` gdy nie ma zdjęcia

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
      toast.current.show({
        detail: 'Dane zostały zaktualizowane!',
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
    toast.current.show({
      detail: 'Ogłoszenie zostało usunięte!',
      life: 3000,
      style: {
        backgroundColor: 'rgb(255, 140, 0)', // Ciemniejsze tło
        color: '#000', // Jasny tekst
        borderRadius: '8px',
        padding: '1rem',
        fontSize: '16px'
      },
      className: 'custom-toast'
    });
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
      toast.current.show({
        detail: 'Zdjęcie zostało usunięte!',
        life: 3000,
        style: {
          backgroundColor: 'rgb(255, 136, 0)', // Ciemniejsze tło
          color: '#000', // Jasny tekst
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '16px'
        },
        className: 'custom-toast'
      });
    } catch (error) {
      console.error('Błąd usuwania zdjęcia:', error.message);
    }
  };
  const handleToggleExpand = (entryId) => {
    setExpandedEntry(expandedEntry === entryId ? null : entryId);
  };
  const countWords = (text) => {
    // Zliczanie słów w tekście
    return text.trim().split(/\s+/).length;
  };

  return (
    <Flex
      direction="column"
      align="center"
      width={'100%'}
      color={'white'}
      overflow="auto"
      bg={'#1c212b'}
    >
      <Toast ref={toast} position="top-right" />
      <Box mt={5} width="100%" minH={'100vh'}>
        <Heading size={'4xl'} padding={'1rem'} color={'white'}>
          Moje Ogłoszenia:
        </Heading>

        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)'
          }}
          gap={6}
          padding={'1rem'}
        >
          {entries.map((entry, index) => {
            const wordCount = countWords(entry.body);
            const isLongText = wordCount > 50;
            const shortText =
              entry.body.split(' ').slice(0, 30).join(' ') + '...';

            return (
              <Flex
                key={index}
                marginBottom="10px"
                justifyContent={'center'}
                alignItems={'center'}
                flexDir={'column'}
                width={'100%'}
                rounded={'lg'}
                bg={'black'}
              >
                {editMode === entry._id ? (
                  <Flex
                    flexDir={{ base: 'column', md: 'row' }}
                    width={{ base: '100%', md: '500px' }}
                    justifyContent={'center'}
                    alignItems={'center'}
                    style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)' }}
                    padding={'10px'}
                    rounded={'xl'}
                  >
                    <Flex>
                      <Image
                        src={entry.image}
                        alt="Obraz"
                        width={{ base: '150px', sm: '150px', md: '200px' }}
                        height={'250px'}
                        objectFit="cover"
                      />
                    </Flex>
                    <Flex flexDir={'column'} ml={8} width={'100%'}>
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
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.5rem',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        _hover={{
                          backgroundColor: '#218838',
                          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        Zapisz
                      </Button>

                      <Button
                        onClick={() => setEditMode(null)}
                        mt={2}
                        style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.5rem',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        _hover={{
                          backgroundColor: '#c82333',
                          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        Anuluj
                      </Button>
                    </Flex>
                  </Flex>
                ) : selectedExpert === entry._id ? (
                  <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    textAlign={'center'}
                  >
                    {selectedExpert === entry._id && (
                      <Flex
                        maxW="xl"
                        mx="auto"
                        p="6"
                        bg="white"
                        shadow="lg"
                        rounded="2xl"
                        border="1px solid"
                        borderColor="gray.200"
                        md={{ mt: '6', width: '300px' }}
                        flexDir={'column'}
                      >
                        <ExpertContact
                          noteId={entry._id}
                          setSelectedExpert={setSelectedExpert}
                          ToastAlert={toast}
                        />
                        <Button
                          bg="red.600"
                          color="white"
                          w="full"
                          mt={3}
                          py="3"
                          fontSize="lg"
                          fontWeight="bold"
                          _hover={{ bg: 'red.700', transform: 'scale(1.02)' }}
                          transition="0.2s ease-in-out"
                          onClick={() => {
                            setSelectedExpert(null);
                          }}
                          shadow="md"
                          rounded="lg"
                        >
                          Cofnij
                        </Button>
                      </Flex>
                    )}
                  </Flex>
                ) : (
                  <Flex
                    flexDir={'column'}
                    width={'90%'}
                    padding="10px"
                    marginBottom="10px"
                    rounded={'lg'}
                    sm={{ width: '100%' }}
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
                          maxW={'150px'}
                          height={'200px'}
                          objectFit={'cover'}
                          sm={{ minW: '150px', maxW: '150px', height: '200px' }}
                          style={{ float: 'left', marginRight: '16px' }}
                        />
                        <Flex flexDir={'column'} ml={2}>
                          <Heading size={'4xl'} mb={2} sm={{ fontSize: '4xl' }}>
                            {entry.title || 'Bez tytułu'}
                          </Heading>
                          <Flex
                            flexDir={'column'}
                            w={'95%'}
                            fontSize={'12px'}
                            sm={{ fontSize: '14px', width: '100%' }}
                          >
                            <Text>
                              {expandedEntry === entry._id || !isLongText
                                ? entry.body
                                : shortText}
                            </Text>
                            {isLongText && (
                              <Button
                                variant="link"
                                onClick={() => handleToggleExpand(entry._id)}
                                color="gray.400"
                              >
                                {expandedEntry === entry._id
                                  ? 'Zwiń'
                                  : 'Rozwiń po więcej'}
                              </Button>
                            )}
                            <Text
                              mt={8}
                              color={'rgb(249, 255, 72)'}
                              fontSize={{ base: '2rem', sm: '3rem' }}
                            >
                              {entry.price + ' PLN' || 'Brak numeru telefonu'}{' '}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex
                      justifyContent={'center'}
                      alignItems={'center'}
                      bg={'#1a202c'}
                      rounded={'lg'}
                      padding={'1rem'}
                      h={'50px'}
                      className="custom-button"
                    >
                      <SplitButton
                        label="Akcje"
                        icon="pi pi-cog"
                        model={getMenuItems(entry)}
                        className="custom-split-button"
                        menuStyle={{
                          backgroundColor: '#1a202c',
                          borderRadius: '5px',
                          padding: '1rem',
                          color: 'white'
                        }}
                        menuClassName="custom-dropdown"
                      />
                    </Flex>
                  </Flex>
                )}
              </Flex>
            );
          })}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Products;
