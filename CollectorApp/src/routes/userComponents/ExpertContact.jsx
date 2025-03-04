import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import AlertInfo from '../../components/ui/AlertInfo';
import { Toast } from 'primereact/toast';

const ExpertContact = ({ noteId, setSelectedExpert, ToastAlert }) => {
  const [expert, setExpert] = useState([]);
  const [selectedExpert, setSelectedExpertState] = useState(''); // ID wybranego eksperta
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const toast = useRef(null);

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const response = await axios.get(
          'http://localhost:10000/expert-contact',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setExpert(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania ekspertów:', error);
      }
    };

    fetchExpert();
  }, []);

  const handleExpertClick = (expertId) => {
    // Zwijamy formularz, jeśli kliknięto na tego samego eksperta
    if (selectedExpert === expertId) {
      setSelectedExpertState(''); // Zwijamy formularz
    } else {
      setSelectedExpertState(expertId); // Ustawienie wybranego eksperta po kliknięciu
    }
  };

  const sendMessage = async () => {
    if (!title || !content) {
      if (ToastAlert?.current) {
        ToastAlert.current.show({
          detail: 'Treści są wymagane',
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
      return;
    }
    if (ToastAlert?.current) {
      ToastAlert.current.show({
        detail: 'Pomyślnie wysłano prośbę o wycenę',
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
    }
    setLoading(true);
    try {
      // Wysłanie wiadomości do eksperta
      await axios.post(
        'http://localhost:10000/send-message',
        { receiverId: selectedExpert, title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      await axios.put(
        `http://localhost:10000/users/entries/${noteId}`,
        {
          expertId: selectedExpert, // Przekazujesz wybrane ID eksperta
          expertRequest: true
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setMessage('Wiadomość została wysłana, ekspert został przypisany.');
      setTitle('');
      setContent('');
      setSelectedExpertState('');

      setSelectedExpert(null);
    } catch (error) {
      console.error('Błąd podczas wysyłania wiadomości:', error);
      if (ToastAlert?.current) {
        ToastAlert.current.show({
          detail: 'Wystąpił błąd podczas wysyłania wiadomości',
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Toast ref={toast} position="top-right" />
      {message && (
        <AlertInfo message="Wiadomość została wysłana, ekspert został przypisany." />
      )}

      {selectedExpert && (
        <Box mb="4">
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Wybrany ekspert:{' '}
            <Text as="span" color="#1c212b" fontWeight="semibold">
              {expert.find((exp) => exp._id === selectedExpert)?.username}
            </Text>
          </Text>
        </Box>
      )}

      <Box mb="4">
        <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb="3">
          Wybierz eksperta
        </Text>
        <Flex wrap="wrap" gap={3}>
          {expert.map((exp) => (
            <Box
              key={exp._id}
              onClick={() => handleExpertClick(exp._id)}
              px="4"
              py="2"
              cursor="pointer"
              bg={selectedExpert === exp._id ? '#1c212b' : 'gray.100'}
              color={selectedExpert === exp._id ? 'white' : 'gray.800'}
              _hover={{
                bg: '#596375',
                color: 'white',
                transform: 'scale(1.05)'
              }}
              rounded="lg"
              transition="0.2s ease-in-out"
              shadow="sm"
            >
              {exp.username}
            </Box>
          ))}
        </Flex>
      </Box>

      {selectedExpert && (
        <>
          <Box mb="4">
            <Text color="gray.700" fontWeight="semibold" mb="1">
              Tytuł
            </Text>
            <Input
              color="white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Wpisz tytuł wiadomości..."
              border="1px solid"
              borderColor="gray.500"
              _placeholder={{ color: 'white' }}
              bg={'#1c212b'}
              rounded="lg"
              px="3"
              py="2"
            />
          </Box>

          <Box mb="4">
            <Text color="gray.700" fontWeight="semibold" mb="1">
              Treść wiadomości
            </Text>
            <Textarea
              color="white"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Wpisz treść wiadomości..."
              border="1px solid"
              borderColor="gray.500"
              _placeholder={{ color: 'white' }}
              bg={'#1c212b'}
              rounded="lg"
              px="3"
              py="2"
              rows={4}
            />
          </Box>

          <Button
            bg="blue.600"
            color="white"
            w="full"
            py="3"
            fontSize="lg"
            fontWeight="bold"
            _hover={{ bg: 'blue.700', transform: 'scale(1.02)' }}
            transition="0.2s ease-in-out"
            onClick={sendMessage}
            isLoading={loading}
            shadow="md"
            rounded="lg"
          >
            {loading ? 'Wysyłanie...' : 'Wyślij wiadomość'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default ExpertContact;
