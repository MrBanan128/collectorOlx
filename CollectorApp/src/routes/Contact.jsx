import {
  Flex,
  Box,
  Text,
  Button,
  Textarea,
  Input,
  Heading
} from '@chakra-ui/react';
import Navbar from '../components/layout/Navbar/Navbar';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Footer from '../components/layout/Footer';

const Contact = () => {
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    // Validate required fields before sending
    const formErrors = {};
    const formData = new FormData(form.current);

    if (!formData.get('user_name')) {
      formErrors.user_name = 'Imię jest wymagane';
    }
    if (!formData.get('user_surname')) {
      formErrors.user_surname = 'Nazwisko jest wymagane';
    }
    if (!formData.get('user_email')) {
      formErrors.user_email = 'Email jest wymagany';
    }
    if (!checked) {
      formErrors.checkbox = 'Musisz wyrazić zgodę na przetwarzanie danych';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Prevent email sending if validation fails
    }

    // If validation passes, send the email
    emailjs
      .sendForm('service_51cetpg', 'template_b929j0j', form.current, {
        publicKey: 'Fyg5WmHgFuxG9-gRJ'
      })
      .then(
        (result) => {
          console.log(result.text);
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <Flex
      flexDirection="column"
      background="white"
      overflow="hidden"
      bg={'black'}
      minH={'100vh'}
      h={'100%'}
    >
      {/* Navbar */}
      <Box flex={1}>
        <Navbar
          background={`url('../../../assets/backgr.png') no-repeat center center, 
               linear-gradient(to bottom, #1c212b 70%, rgb(8, 13, 23) 100%); 
               background-blend-mode: overlay;`}
        />
        <Flex direction="column" alignItems="center" mt="120px" color={'white'}>
          <Flex
            justifyContent="flex-start"
            alignItems="center"
            flexDir={'column'}
          >
            <Heading
              size={'6xl'}
              padding={1}
              margin={8}
              _hover={{
                color: '#b7410e',
                borderBottom: '2px solid #b7410e'
              }}
            >
              Skontaktuj się z nami!
            </Heading>
            <form ref={form} onSubmit={sendEmail}>
              <Flex
                direction="column"
                align="center"
                justify="center"
                border="1px solid #ddd"
                borderRadius="12px"
                boxShadow="lg"
                p={6}
                bg="url('../../../assets/backgr.png') no-repeat, #1c212b"
                w="600px"
              >
                <Flex justifyContent={'space-around'} w="100%" gap={10}>
                  <Box w="50%" mb={3}>
                    <Text fontSize="2xl" fontWeight="bold" mb={1} p={2}>
                      Imię*
                    </Text>
                    <Input
                      type="text"
                      name="user_name"
                      placeholder="Wpisz imię"
                      _placeholder={{ color: 'gray.400' }}
                      rounded={'2xl'}
                      padding={5}
                      _focus={{ borderColor: '#b7410e' }}
                    />
                    {errors.user_name && (
                      <Text color="red.500">{errors.user_name}</Text>
                    )}
                  </Box>

                  <Box w="50%" mb={3}>
                    <Text fontSize="2xl" fontWeight="bold" mb={1} p={2}>
                      Nazwisko*
                    </Text>
                    <Input
                      type="text"
                      name="user_surname"
                      placeholder="Wpisz nazwisko"
                      _placeholder={{ color: 'gray.400' }}
                      rounded={'2xl'}
                      padding={5}
                      _focus={{ borderColor: '#b7410e' }}
                    />
                    {errors.user_surname && (
                      <Text color="red.500">{errors.user_surname}</Text>
                    )}
                  </Box>
                </Flex>

                <Box w="100%" mb={3}>
                  <Text fontSize="2xl" fontWeight="bold" mb={1} p={2}>
                    Email*
                  </Text>
                  <Input
                    type="email"
                    name="user_email"
                    placeholder="Wpisz email"
                    _placeholder={{ color: 'gray.400' }}
                    rounded={'2xl'}
                    padding={5}
                    _focus={{ borderColor: '#b7410e' }}
                  />
                  {errors.user_email && (
                    <Text color="red.500">{errors.user_email}</Text>
                  )}
                </Box>

                <Box w="100%" mb={4}>
                  <Text fontSize="2xl" fontWeight="bold" mb={1} p={2}>
                    Wiadomość
                  </Text>
                  <Textarea
                    name="message"
                    placeholder="Wpisz swoją wiadomość"
                    _placeholder={{ color: 'gray.400' }}
                    minH={'100px'}
                    rounded={'2xl'}
                    padding={5}
                    _focus={{ borderColor: '#b7410e' }}
                  />
                </Box>

                <Flex
                  w="100%"
                  mb={4}
                  gap={2}
                  align="center"
                  justify="flex-start"
                >
                  <input
                    type="checkbox"
                    onChange={(e) => setChecked(e.target.checked)}
                    checked={checked}
                    style={{
                      appearance: 'none',
                      width: '25px',
                      height: '15px',
                      borderRadius: '6px',
                      backgroundColor: checked ? 'rgb(130, 48, 12)' : '#ccc',
                      transition: 'background-color 0.3s ease',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                  />

                  <Flex direction="column" p={4}>
                    <Text color={'gray.400'} fontSize="sm">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych
                      przez AntiqueValue z siedzibą w Bydgoszczy, w celu
                      realizacji usług oferowanych przez firmę, zgodnie z
                      obowiązującymi przepisami o ochronie danych osobowych.
                    </Text>
                    {errors.checkbox && (
                      <Text color="red.500" fontSize={'12px'}>
                        {errors.checkbox}
                      </Text>
                    )}
                  </Flex>
                </Flex>

                <Button
                  type="submit"
                  bg={'#b7410e'}
                  size="lg"
                  rounded={'2xl'}
                  width="100%"
                  _hover={{ bg: '#82300c' }}
                  isDisabled={
                    !checked ||
                    errors.user_name ||
                    errors.user_surname ||
                    errors.user_email
                  }
                >
                  Wyślij
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Box>
      <Footer />
    </Flex>
  );
};

export default Contact;
