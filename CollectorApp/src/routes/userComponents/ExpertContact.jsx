import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import AlertInfo from '../../components/ui/AlertInfo';

const ExpertContact = ({ noteId }) => {
  const [expert, setExpert] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(''); // ID wybranego eksperta
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      setSelectedExpert(''); // Zwijamy formularz
    } else {
      setSelectedExpert(expertId); // Ustawienie wybranego eksperta po kliknięciu
    }
  };

  const sendMessage = async () => {
    if (!selectedExpert) {
      setMessage('Wybierz eksperta, do którego chcesz wysłać wiadomość.');
      return;
    }
    if (!title || !content) {
      setMessage('Tytuł i treść wiadomości są wymagane.');
      return;
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
      setSelectedExpert('');
    } catch (error) {
      console.error('Błąd podczas wysyłania wiadomości:', error);
      setMessage('Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="xl"
      mx="auto"
      p="6"
      bg="white"
      shadow="lg"
      rounded="2xl"
      border="1px solid"
      borderColor="gray.200"
      md={{ mt: '6', width: '300px' }}
    >
      {message && (
        <AlertInfo message="Wiadomość została wysłana, ekspert został przypisany." />
      )}

      {selectedExpert && (
        <Box mb="4">
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Wybrany ekspert:{' '}
            <Text as="span" color="blue.600" fontWeight="semibold">
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
              bg={selectedExpert === exp._id ? 'blue.500' : 'gray.100'}
              color={selectedExpert === exp._id ? 'white' : 'gray.800'}
              _hover={{
                bg: 'blue.400',
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
              bg={
                'linear-gradient(90deg, rgba(105,127,141,1) 0%, rgba(97,120,134,1) 35%, rgba(70,93,109,1) 80%, rgba(58,79,96,1) 100%);'
              }
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
              bg={
                'linear-gradient(90deg, rgba(105,127,141,1) 0%, rgba(97,120,134,1) 35%, rgba(70,93,109,1) 80%, rgba(58,79,96,1) 100%);'
              }
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
