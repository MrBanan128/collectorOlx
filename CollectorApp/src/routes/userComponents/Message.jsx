import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Textarea
} from '@chakra-ui/react';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null); // Zmienna przechowująca wybraną wiadomość
  const [error, setError] = useState(null);
  const [replyTitle, setReplyTitle] = useState('');
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Brak tokena, nie jesteś zalogowany');
          return;
        }
        const res = await axios.get('http://localhost:10000/user-messages', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setMessages(res.data);
      } catch (error) {
        setError('Nie udało się pobrać wiadomości.');
      }
    };

    fetchMessages();
  }, []);

  const handleMessageClick = async (id, isRead) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Brak tokena, nie jesteś zalogowany');
        return;
      }

      if (!isRead) {
        await axios.patch(
          `http://localhost:10000/message/${id}/read`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === id ? { ...msg, status: 'read' } : msg
          )
        );
      }

      const selectedMsg = messages.find((msg) => msg._id === id);
      setSelectedMessage(selectedMsg);
    } catch (error) {
      console.error('Błąd przy aktualizacji statusu:', error);
      setError('Nie udało się zaktualizować statusu wiadomości.');
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Brak tokena, nie jesteś zalogowany');
        return;
      }

      await axios.delete(`http://localhost:10000/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== id)
      );

      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Błąd przy usuwaniu wiadomości:', error);
      setError('Nie udało się usunąć wiadomości.');
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    if (!replyTitle || !replyContent) {
      alert('Proszę wypełnić wszystkie pola.');
      return;
    }

    if (!selectedMessage || !selectedMessage.senderId) {
      alert('Brak nadawcy wiadomości.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Brak tokena, nie jesteś zalogowany');
        return;
      }

      await axios.post(
        'http://localhost:10000/send-message',
        {
          receiverId: selectedMessage.senderId._id || selectedMessage.senderId,
          title: replyTitle,
          content: replyContent
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Odpowiedź została wysłana!');
      setReplyTitle('');
      setReplyContent('');
    } catch (error) {
      console.error('Błąd przy wysyłaniu odpowiedzi:', error);
      setError(
        error.response?.data?.message || 'Nie udało się wysłać odpowiedzi.'
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Brak daty';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Niepoprawna data'
      : date.toLocaleDateString();
  };

  const unreadMessages = messages.filter((msg) => msg.status === 'unread');
  const readMessages = messages.filter((msg) => msg.status === 'read');

  return (
    <Flex
      width={'100%'}
      minHeight={'100vh'}
      padding="2rem"
      flexDir={'column'}
      color={'white'}
      bg={'#1c212b'}
      alignItems={'center'}
    >
      <Flex
        width={'80%'}
        borderTop={'1px solid #ccc'}
        padding={'10px'}
        alignItems={'center'}
        justifyContent={'center'}
      ></Flex>
      <Flex flexDir={'row'} width={'100%'}>
        <Flex
          width={'50%'}
          direction="column"
          alignItems={'center'}
          className="messages"
        >
          <Flex flexDir={'column'} alignItems={'center'} width={'80%'}>
            <Heading
              padding={'20px'}
              color={'#b7410e'}
              fontSize={'2rem'}
              fontWeight={'700'}
              md={{ padding: '30px', fontSize: '3rem' }}
            >
              Nieprzeczytane
            </Heading>
            <Box
              width="140px"
              bg="gray.700"
              p="4"
              rounded={'xl'}
              md={{ width: '350px' }}
            >
              {unreadMessages.length > 0 ? (
                unreadMessages.map((msg) => (
                  <Text
                    key={msg._id}
                    color="rgb(183, 65, 14)"
                    filter="brightness(1.5)"
                    border={'solid 1px rgb(183, 65, 14)'}
                    textAlign="left"
                    p={'1rem 2rem'}
                    cursor="pointer"
                    onClick={() => handleMessageClick(msg._id)}
                    _hover={{ color: 'white' }}
                  >
                    <Text fontSize={'2rem'} lineHeight={1}>
                      {msg.senderId?.username || 'Brak nadawcy'}
                    </Text>
                    <Text>{msg.title}</Text>
                  </Text>
                ))
              ) : (
                <Text color="gray.400" textAlign="center">
                  Brak wiadomości
                </Text>
              )}
            </Box>
          </Flex>

          <Flex flexDir={'column'} alignItems={'center'} width={'80%'}>
            <Heading
              padding={'20px'}
              color={'#ffff'}
              fontSize={'2rem'}
              fontWeight={'700'}
              md={{ padding: '30px', fontSize: '3rem' }}
            >
              Przeczytane
            </Heading>
            <Box
              width={'140px'}
              bg="gray.700"
              p="4"
              borderRadius="md"
              md={{ width: '350px' }}
            >
              {readMessages.length > 0 ? (
                readMessages.map((msg) => (
                  <Box
                    key={msg._id}
                    color="gray.300"
                    cursor="pointer"
                    textAlign="left"
                    p={'1rem 2rem'}
                    border={'solid 1px #ffff'}
                    onClick={() => handleMessageClick(msg._id)}
                    _hover={{ color: 'white' }}
                  >
                    <Text fontSize={'2rem'} fontWeight={500} lineHeight={1}>
                      {msg.senderId?.username || 'Brak nadawcy'}
                    </Text>
                    <Text>{msg.title}</Text>
                  </Box>
                ))
              ) : (
                <Text color="gray.400" textAlign="center">
                  Brak wiadomości
                </Text>
              )}
            </Box>
          </Flex>
        </Flex>
        <Flex
          width={'50%'}
          padding={'20px'}
          borderLeft="1px solid #ccc"
          flexDir={'column'}
          className="message-details"
        >
          {selectedMessage ? (
            <Flex
              flexDir={'column'}
              alignItems={'center'}
              width={'100%'}
              justifyContent={'center'}
            >
              <Text fontSize={'3rem'}>
                {selectedMessage.senderId?.username || 'Brak nadawcy'}
              </Text>
              <Heading
                textAlign="center"
                fontSize={'2rem'}
                color={'lightgrey'}
                m={5}
              >
                {formatDate(selectedMessage.timestamp)}
              </Heading>

              <Flex flexDir={'column'} alignItems={'center'}>
                <Heading textAlign={'center'} fontSize={'2rem'} mt={'20px'}>
                  {selectedMessage.content}
                </Heading>
              </Flex>
            </Flex>
          ) : (
            <Flex flexDir={'column'} alignItems={'center'}>
              <p>Wybierz wiadomość</p>
            </Flex>
          )}
          <Flex mt={20}>
            {selectedMessage && (
              <Flex
                flexDir={'column'}
                width={'100%'}
                mt="20px"
                gap={'20px'}
                alignItems={'center'}
              >
                <Flex>
                  <Heading
                    fontSize={'1rem'}
                    textAlign={'center'}
                    sm={{ fontSize: '2rem' }}
                  >
                    Odpowiedz na wiadomość
                  </Heading>
                </Flex>

                <form onSubmit={handleReplySubmit}>
                  <Flex
                    flexDir="column"
                    gap="12px"
                    bg="gray.700" // Półprzezroczyste tło
                    p="20px"
                    borderRadius="lg"
                    boxShadow="lg"
                    maxW="500px"
                    w="100%"
                    mx="auto"
                    md={{ p: '30px', width: '350px', height: '300px' }}
                  >
                    <Input
                      bg="white"
                      color="black"
                      _placeholder={{ color: 'gray.600' }}
                      border="2px solid"
                      borderColor="gray.300"
                      _focus={{
                        borderColor: 'blue.400',
                        boxShadow: '0 0 10px rgba(0, 0, 255, 0.3)'
                      }}
                      type="text"
                      placeholder="Tytuł"
                      value={replyTitle}
                      onChange={(e) => setReplyTitle(e.target.value)}
                      borderRadius="md"
                      p="10px"
                      md={{ p: '12px' }}
                    />
                    <Textarea
                      bg="white"
                      color="black"
                      _placeholder={{ color: 'gray.600' }}
                      border="2px solid"
                      borderColor="gray.300"
                      _focus={{
                        borderColor: 'blue.400',
                        boxShadow: '0 0 10px rgba(0, 0, 255, 0.3)'
                      }}
                      placeholder="Treść wiadomości"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      borderRadius="md"
                      p="20px"
                      md={{ p: '30px' }}
                    />
                    <Button
                      type="submit"
                      bgGradient="linear(to-r, blue.500, blue.700)"
                      color="white"
                      _hover={{
                        bgGradient: 'linear(to-r, blue.600, blue.800)',
                        transform: 'scale(1.05)'
                      }}
                      transition="0.2s"
                      borderRadius="md"
                      p="12px"
                    >
                      Wyślij odpowiedź
                    </Button>
                    <Button
                      onClick={() => handleDeleteMessage(selectedMessage._id)}
                      bg="#b7410e"
                      color="white"
                      _hover={{ bg: '#92400e', transform: 'scale(1.05)' }}
                      transition="0.2s"
                      borderRadius="md"
                      p="12px"
                      fontSize={15}
                    >
                      Usuń wiadomość
                    </Button>
                  </Flex>
                </form>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Message;
