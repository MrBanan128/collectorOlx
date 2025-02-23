/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  Flex,
  Box,
  Input,
  Button,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'; // Corrected import path for NavLink
import { FaGoogle, FaFacebook } from 'react-icons/fa'; // Added FaArrowLeft

import Aurora from '../../ui/Aurora/Aurora';
import ArrowBack from '../ArrowBack';

const Login = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:10000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setMessage('Zalogowano pomyślnie');
        console.log('Zalogowano pomyślnie' + data.token);
        navigate('/dashboard/profile');
      } else {
        setMessage(data.message || 'Błąd logowania');
      }
    } catch (error) {
      setMessage('Błąd podczas logowania');
    }
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
          colorStops={['#d5d6d6', '#FFFFFF', '#d5d6d6']}
          speed={0.5}
          amplitude={10}
        />
      </Box>
      <ArrowBack />
      {/* Formularz logowania na wierzchu */}
      <Flex
        className="login-container"
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
          rounded={10}
          overflow={'hidden'}
          border={'5px solid rgb(35, 35, 35)'}
          height={{ base: 'auto', md: '600px', lg: '650px', xl: '700px' }}
          maxWidth={{ base: '60%', md: '500px' }} // Ustawiłem maxWidth
          width="100%"
        >
          {/* Logo */}
          <Flex
            backgroundColor={'rgba(4,10,20,255)'}
            alignItems="center"
            flexDir={'column'}
            gap={5}
            paddingBottom={10}
          >
            <Image
              width={'60px'}
              height={'60px'}
              marginTop={10}
              rounded={'2xl'}
              src="/AV.png"
              alt="AntiqVal"
              // Ustawienie dla urządzeń > 480px (smartfony i większych)
              sm={{ width: '70px', height: '60px' }}
              // Ustawienie dla urządzeń > 768px (tablety i większe)
              md={{ width: '90px', height: '90px' }}
              // Ustawienie dla urządzeń > 1024px (laptopy i większe)
              lg={{ width: '110px', height: '120px' }}
            />
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

          {/* Formularz logowania */}
          <Flex
            bgImage={'url(/tapeta.jpg)'}
            p={10}
            direction="column"
            width="100%"
            height={'100%'}
          >
            <Heading
              color="white"
              fontSize={{ base: '20px', md: '30px' }}
              textAlign="center"
            >
              Logowanie
            </Heading>
            {message && (
              <Text
                color="red"
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
              <form
                onSubmit={handleLogin}
                style={{ width: '100%', marginTop: '20px' }}
              >
                <Flex
                  direction="column"
                  alignItems="center"
                  gap={{ base: 5, md: 10 }}
                >
                  <Input
                    type="email"
                    name="email"
                    border={'2px solid rgba(2,9,17,255)'}
                    placeholder="Email"
                    padding={8}
                    onChange={handleLoginChange}
                    _placeholder={{ color: 'rgba(2,9,17,255)' }}
                    fontSize={'20px'}
                    required
                    width="80%"
                    color={'rgba(2,9,17,255)'}
                  />

                  <Input
                    type="password"
                    name="password"
                    border={'2px solid rgba(2,9,17,255)'}
                    placeholder="Hasło"
                    padding={8}
                    onChange={handleLoginChange}
                    _placeholder={{ color: 'rgba(2,9,17,255)' }}
                    fontSize={'20px'}
                    required
                    width="80%"
                  />
                  <Button
                    type="submit"
                    backgroundColor="rgba(2,9,17,255)"
                    mt="10px"
                    fontSize={'20px'}
                    width={'60%'}
                    height={'50px'}
                    md={{ marginTop: '40px' }}
                    color={'#cbcdc4'}
                  >
                    Zaloguj
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
            background={'#cbcdc4'}
            paddingBottom={10}
          >
            <Flex
              flexDir={'row'}
              alignItems={'center'}
              gap={5}
              onClick={handleGoogleLogin}
            >
              <FaGoogle style={{ minWidth: '15px' }} />
              <Button
                backgroundColor={'rgba(2,9,17,255)'}
                color={'#cbcdc4'}
                display={{ base: 'none', sm: 'block' }}
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
                backgroundColor={'rgba(2,9,17,255)'}
                color={'#cbcdc4'}
                display={{ base: 'none', sm: 'block' }}
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

export default Login;
