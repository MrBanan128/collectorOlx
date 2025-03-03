/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Input,
  Button,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'; // Corrected import path for NavLink
import { FaGoogle, FaFacebook } from 'react-icons/fa'; // Added FaArrowLeft

import Aurora from '../../ui/Aurora/Aurora';
import ArrowBack from '../ArrowBack';

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard/profile');
    }
  }, [navigate]);
  const handleRegister = async (e) => {
    e.preventDefault();

    // Reset the message before performing validation
    setMessage('');

    // Basic validation for username and password
    const { username, password, RepeatedPassword } = registerForm;
    let validationError = '';

    // Username validation (e.g., must be at least 3 characters long)
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/; // Alphanumeric and underscores, at least 3 characters
    if (!username || !usernameRegex.test(username)) {
      validationError =
        'Użytkownik musi mieć minimum 3 znaki i nie zawierać znaków specjalnych';
    }

    // Password validation (minimum 8 characters, at least one uppercase letter, one number)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      validationError =
        'Hasło musi mieć przynajmniej 8 liter w tym jedna duża oraz jedna liczba';
    }

    // Check if the passwords match
    if (password !== RepeatedPassword) {
      validationError = 'Hasła się nie zgadzają';
    }

    // If validation failed, display the message and stop the form submission
    if (validationError) {
      setMessage(validationError);
      return;
    }

    try {
      const response = await fetch('http://localhost:10000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm)
      });
      const data = await response.json();
      setMessage(data.message || 'Rejestracja zakończona');

      console.log(data.success);
      console.log(data);
      // If registration is successful, navigate to the login page
      if (data) {
        navigate('/login', {
          state: { message: 'Zarejestrowano pomyślnie', severity: 'success' }
        }); // Redirect to login page
      }
    } catch (error) {
      setMessage('Błąd podczas rejestracji');
    }
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:10000/auth/google';
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:10000/auth/facebook';
  };

  return (
    <Box position="relative" width="100vw" height="100vh" overflow="hidden">
      {/* Aurora jako tło */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        style={{ zIndex: '0' }}
      >
        <Aurora
          colorStops={['#b7410e', '#fcd9cb', '#5a2e02']}
          speed={0.5}
          amplitude={10}
        />
      </Box>
      <ArrowBack />
      {/* Formularz logowania na wierzchu */}
      <Flex
        className="Register-container"
        justifyContent="center"
        alignItems="center"
        position="relative"
        width="100%"
        padding={5}
        height="100vh"
      >
        <Flex
          direction="column"
          textAlign={'center'}
          justifyContent={'center'}
          mb={10}
          rounded={10}
          marginTop={10}
          overflow={'hidden'}
          border={'5px solid #1c212b)'}
          height={{
            base: 'auto',
            sm: '600px',
            md: '640px',
            lg: '650px',
            xl: '720px'
          }}
          maxWidth={{ base: '70%', sm: '350px', md: '500px' }}
          width="100%"
        >
          {/* Logo */}
          <Flex
            backgroundColor={'#1c212b;'}
            alignItems="center"
            flexDir={'column'}
            gap={5}
            paddingBottom={10}
            maxHeight={{ base: '150px', md: '200px', lg: '250px', xl: '300px' }}
          >
            <Link to="/">
              <Image
                width={'50px'}
                height={'50px'}
                marginTop={5}
                rounded={'2xl'}
                src="/AV.png"
                alt="AntiqVal"
                // Ustawienie dla urządzeń > 480px (smartfony i większych)
                sm={{ width: '70px', height: '70px' }}
                // Ustawienie dla urządzeń > 768px (tablety i większe)
                md={{ width: '90px', height: '90px' }}
                // Ustawienie dla urządzeń > 1024px (laptopy i większe)
                lg={{ width: '100px', height: '100px' }}
                xl={{ width: '120px', height: '120px' }}
              />
            </Link>
            <Flex gap={5} mt={5}>
              <NavLink to="/login">
                <Heading color={'white'} fontSize={{ base: 'xl', md: '3xl' }}>
                  Logowanie
                </Heading>
              </NavLink>
              <NavLink to="/sign-up">
                <Heading color={'white'} fontSize={{ base: 'xl', md: '3xl' }}>
                  Rejestracja
                </Heading>
              </NavLink>
            </Flex>
          </Flex>

          {/* Formularz rejestracji */}
          <Flex
            className="Register-form"
            bg={
              'linear-gradient(0deg, rgba(235, 164, 136,0.7) 0%, rgba(183,65,14,0.7) 83%, rgba(122,82,42,0.6) 100%);'
            }
            p={10}
            direction="column"
            width="100%"
            height={'100%'}
          >
            <Heading
              color="white"
              fontSize={{ base: '20px', sm: '24', md: '30px' }}
              textAlign="center"
              mb={{ base: 5, sm: 8 }}
            >
              Rejestracja
            </Heading>
            {message && (
              <Text
                color="#1c212b"
                fontWeight={'bold'}
                fontSize={{ base: '16px', sm: '20px' }}
                textAlign="center"
                mt={2}
              >
                {message}
              </Text>
            )}{' '}
            {/* Komunikat błędu */}
            <Flex justifyContent="center">
              <form onSubmit={handleRegister}>
                <Flex
                  direction="column"
                  alignItems="center"
                  gap={{ base: 5, md: 5, xl: 10 }}
                  color={'white'}
                >
                  <Input
                    type="text"
                    name="username"
                    border={'2px solid white'}
                    placeholder="Nazwa"
                    padding={{ base: 5, sm: 8 }}
                    onChange={handleRegisterChange}
                    _placeholder={{ color: 'white' }}
                    fontSize={'20px'}
                    required
                    width={{ base: '80%', sm: '80%', md: '90%' }}
                  />
                  <Input
                    type="email"
                    name="email"
                    border={'2px solid white'}
                    placeholder="E-mail"
                    padding={{ base: 5, sm: 8 }}
                    onChange={handleRegisterChange}
                    _placeholder={{ color: 'white' }}
                    fontSize={'20px'}
                    required
                    width={{ base: '80%', sm: '80%', md: '90%' }}
                  />
                  <Input
                    type="password"
                    name="password"
                    border={'2px solid white'}
                    placeholder="Hasło"
                    padding={{ base: 5, sm: 8 }}
                    onChange={handleRegisterChange}
                    _placeholder={{ color: 'white' }}
                    fontSize={'20px'}
                    required
                    width={{ base: '80%', sm: '80%', md: '90%' }}
                  />
                  <Input
                    type="password"
                    name="RepeatedPassword"
                    border={'2px solid white'}
                    placeholder="Powtórz hasło"
                    padding={{ base: 5, sm: 8 }}
                    onChange={handleRegisterChange}
                    _placeholder={{ color: 'white' }}
                    fontSize={'20px'}
                    required
                    width={{ base: '80%', sm: '80%', md: '90%' }}
                  />
                  <Button
                    type="submit"
                    backgroundColor="#1c212b"
                    mt="10px"
                    fontSize={{ base: '14px', sm: '20px' }}
                    width={{ base: '60%', sm: '60%', md: '70%' }}
                    height={{ base: '40px', sm: '50px' }}
                  >
                    Zarejestruj
                  </Button>
                </Flex>
              </form>
            </Flex>
          </Flex>

          {/* Logowanie przez Google i Facebooka */}
          <Flex
            flexDir={{ base: 'row', sm: 'column' }}
            gap={5}
            padding={5}
            background={'#1c212b'}
            color={'rgb(0, 0, 0)'}
          >
            <Flex
              flexDir={'row'}
              alignItems={'center'}
              gap={5}
              onClick={handleGoogleLogin}
            >
              <FaGoogle style={{ minWidth: '15px' }} />
              <Button
                backgroundColor={'rgb(0, 0, 0)'}
                color={'white'}
                display={{ base: 'none', sm: 'block' }}
                width={{ sm: '50%', md: '40%' }}
              >
                Zaloguj się przez Google
              </Button>
            </Flex>
            <Flex
              flexDir={'row'}
              alignItems={'center'}
              gap={5}
              onClick={handleFacebookLogin}
            >
              <FaFacebook style={{ minWidth: '15px' }} />
              <Button
                backgroundColor={'rgb(0, 0, 0)'}
                color={'white'}
                display={{ base: 'none', sm: 'block' }}
                width={{ sm: '50%', md: '40%' }}
              >
                Zaloguj się przez Facebooka
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Register;
