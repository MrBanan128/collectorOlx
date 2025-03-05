import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Image,
  Text,
  Textarea,
  Input,
  Flex,
  Link
} from '@chakra-ui/react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer';
import axios from 'axios';
import ExpStamp from '../../assets/expertStamp.png';

const EntryPanel = () => {
  const { id } = useParams(); // Pobranie ID wpisu z URL
  const [entry, setEntry] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); // Treść wiadomości
  const [title, setTitle] = useState(''); // title
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight * 0.2) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:10000/users/entries/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        if (!response.ok) throw new Error('Błąd pobierania wpisu');
        const data = await response.json();
        // console.log("Odpowiedź z API:", data);  // Dodaj to logowanie
        setEntry(data);
      } catch (error) {
        setError(error.message);
        setError(error.title);
      }
    };
    fetchEntry();
  }, [id]);

  const sendMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Nie jesteś zalogowany');
        return;
      }
      console.log('Dane wpisu:', entry); // Sprawdzamy dane przed wysłaniem wiadomości
      if (!entry?.userId) {
        setError('Brak odbiorcy wiadomości (entry.userId)');
        return;
      }
      await axios.post(
        'http://localhost:10000/send-message',
        {
          receiverId: entry.userId, // Używamy userId z wpisu
          title: title,
          content: message
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Wiadomość wysłana!');
      setMessage('');
      setTitle('');
    } catch (error) {
      console.error(
        'Błąd wysyłania wiadomości:',
        error.response?.data || error.message || error.title
      );
      setError('Błąd wysyłania wiadomości');
    }
  };

  if (error) return <p>Błąd: {error}</p>;
  if (!entry) return <p>Ładowanie...</p>;

  return (
    <>
      <Navbar
        background={
          scrolled
            ? `url('../../../assets/backgr.png') no-repeat center center, 
               linear-gradient(to bottom, #1c212b 70%, rgb(8, 13, 23) 100%); 
               background-blend-mode: overlay;`
            : 'rgba(28, 33, 43, .5)'
        }
        height={scrolled ? '84px' : '80px'}
      />

      <Box
        p={'10rem 5%'}
        background="url('../../assets/backgr.png') no-repeat, rgb(28, 33, 43, 1)"
        backgroundSize="cover"
      >
        {/* return*/}
        <Box
          padding="20px"
          background="url('../../assets/backgr.png') no-repeat, rgb(28, 33, 43, 1)"
          backgroundSize="cover"
          border="5px solid transparent"
          borderImage="linear-gradient(45deg, #8b3a3a, #b7410e, #fcd9cb, #92400e, #5a2e02)"
          borderImageSlice={1}
          mb={4}
          boxShadow={' 0 1px 10px 4px rgb(28, 33, 43, 1)'}
        >
          <Link
            onClick={() => navigate(-1)}
            colorScheme="blue"
            mt={4}
            fontSize={'3rem'}
            _hover={{ color: '#b7410e' }}
          >
            ❮{' '}
            <Text ml={4} fontSize={'2rem'}>
              {' '}
              Powrót
            </Text>
          </Link>
        </Box>

        {/*main panel */}
        <Flex>
          {/* left panel */}
          <Box
            p={'2rem 5rem'}
            border="5px solid transparent"
            borderImage="linear-gradient(45deg, #8b3a3a, #b7410e, #fcd9cb, #92400e, #5a2e02)"
            borderImageSlice={1}
            background="url('../../assets/backgr.png') no-repeat, rgb(28, 33, 43, 1)"
            backgroundSize="cover"
            boxShadow={' 0 1px 10px 4px rgb(28, 33, 43, 1)'}
          >
            {/* Tytół */}
            <Text fontWeight="hairline" fontSize={'2.6rem'} mb={8}>
              {entry.title}
            </Text>
            {/* Zdjęcie */}
            <Box>
              {entry.image && (
                <Image src={entry.image} alt="Obraz" width="100%" />
              )}
            </Box>
            {/* kategorie */}
            <Flex p={'1rem 0'}>
              <Text fontSize="xxl" color="gray" mr={8}>
                Kategoria: {entry.category}
              </Text>
              <Text fontSize="xxl" color="gray">
                Podkategoria: {entry.subcategory}
              </Text>
            </Flex>
            {/* main text */}

            <Box pt={8} pb={12} mt={10} borderTop={'solid 1px #b7410e'}>
              <Text fontSize={'2.5rem'} fontWeight={'500'} mb={5}>
                Opis
              </Text>
              <Text>{entry.body}</Text>
            </Box>
          </Box>

          {/* Right panel */}
          <Box
            background="url('../../assets/backgr.png') no-repeat, rgb(28, 33, 43)"
            backgroundSize="cover"
            ml={4}
            border="5px solid transparent"
            borderImage="linear-gradient(45deg, #8b3a3a, #b7410e, #fcd9cb, #92400e, #5a2e02)"
            borderImageSlice={1}
            boxShadow={' 0 1px 10px 4px rgb(28, 33, 43, 1)'}
            p={'2rem 3rem'}
          >
            <Box>
              {/* User name */}
              <Text
                borderBottom={'solid 1px #b7410e'}
                pb={4}
                mb={4}
                fontSize={'2.2rem'}
              >
                {entry.userId?.username || 'Brak danych'}
              </Text>
              {/* price */}
              <Text fontSize="3rem" fontWeight={600}>
                {entry.price} <span style={{ fontSize: '2rem' }}>zł</span>
              </Text>
              <Text
                color={'gray'}
                fontSize={'1.5rem'}
                borderBottom={'solid 1px #b7410e'}
                pb={4}
                mb={4}
              >
                szacunkowa wartość
              </Text>
            </Box>
            {/* message area */}
            <Box mt={10} mb={5} borderBottom={'solid 2px #b7410e'} pb={20}>
              <Text fontSize="2rem" fontWeight="bold">
                Wyślij Wiadomość
              </Text>
              <Input
                border="3px solid transparent"
                borderImage="linear-gradient(45deg, #8b3a3a, #b7410e, #fcd9cb, #92400e, #5a2e02)"
                borderImageSlice={1}
                placeholder="Wpisz tytuł wiadomości"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                mt={5}
                minWidth={'280px'}
                p={8}
                fontSize={'1.8rem'}
              />
              <Textarea
                border="3px solid transparent"
                borderImage="linear-gradient(45deg, #8b3a3a, #b7410e, #fcd9cb, #92400e, #5a2e02)"
                borderImageSlice={1}
                placeholder="Wpisz swoją wiadomość..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                mt={5}
                p={8}
                fontSize={'1.8rem'}
                resize="none"
                minHeight={'15rem'}
              />
              <Button
                onClick={sendMessage}
                background={' #92400e'}
                color="white"
                mt={2}
                border="2px solid transparent"
                borderImage="linear-gradient(45deg, #8b3a3a, #b7410e, #fcd9cb, #92400e, #5a2e02)"
                borderImageSlice={1}
                fontSize={'1.6rem'}
                fontWeight={600}
                _hover={{ background: '#5a2e02' }}
                p={6}
                boxShadow={' 0 1px 10px 4px rgb(28, 33, 43, 1)'}
              >
                Wyślij
              </Button>
              {success && (
                <Text color="green" mt={2}>
                  {success}
                </Text>
              )}
              {error && (
                <Text color="red" mt={2}>
                  {error}
                </Text>
              )}
            </Box>

            {/* Expert Part */}
            <Box
              color={'#b7410e'}
              fontSize={'1.6rem'}
              fontWeight={'600'}
              mt={'2rem'}
              // ExpStamp
            >
              {entry.expertEvaluation && (
                <Box mt={4}>
                  <Box>
                    {entry.expertEvaluation.expertBadge ? (
                      <img
                        src={ExpStamp}
                        alt="Badge"
                        width="100%"
                        height={'100%'}
                      />
                    ) : (
                      ''
                    )}
                  </Box>
                  <Text fontSize="xl" mt={3}>
                    Wycena Experta:
                  </Text>
                  <Text fontWeight="bold">
                    {entry.expertEvaluation.expertName || ''}
                  </Text>

                  <Text fontSize="xl" mt={3}>
                    Opis wyceny:
                  </Text>
                  <Text>{entry.expertEvaluation.expertMessage || ''}</Text>
                  <Text fontSize="xl" mt={3}>
                    Wycenione:
                  </Text>
                  <Text>
                    {entry.expertEvaluation.expertPrice !== null
                      ? `${entry.expertEvaluation.expertPrice} zł`
                      : ''}
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default EntryPanel;
