/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import {
  Flex,
  Box,
  Input,
  Button,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom'; // Corrected import path for NavLink
import { FaGoogle, FaFacebook } from 'react-icons/fa'; // Added FaArrowLeft
import { Toast } from 'primereact/toast';

import Aurora from '../../ui/Aurora/Aurora';
import ArrowBack from '../ArrowBack';

const Login = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useRef(null);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  useEffect(
    () => {
      if (location.state?.message) {
        toast.current.show({
          detail: 'Zarejestrowano pomyślnie',
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

      const token = localStorage.getItem('token');
      if (token) {
        navigate('/dashboard/profile');
      }
    },
    [navigate],
    [location.state]
  );

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

        navigate('/dashboard/profile', {
          state: { message: 'Zalogowano pomyślnie', severity: 'success' }
        });
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
      <Toast ref={toast} position="top-right" />
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
        className="login-container"
        justifyContent="center"
        alignItems="center"
        position="relative"
        width="100%"
        padding={5}
        height="100%"
      >
        <Flex
          direction="column"
          textAlign={'center'}
          justifyContent={'center'}
          rounded={10}
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
            backgroundColor={'#1c212b'}
            alignItems="center"
            flexDir={'column'}
            gap={5}
            paddingBottom={10}
          >
            <Link to="/">
              <Image
                width={'60px'}
                height={'60px'}
                marginTop={10}
                rounded={'2xl'}
                src="/AV.png"
                alt="AntiqVal"
                // Ustawienie dla urządzeń > 480px (smartfony i większych)
                sm={{ width: '70px', height: '70px' }}
                // Ustawienie dla urządzeń > 768px (tablety i większe)
                md={{ width: '90px', height: '90px' }}
                // Ustawienie dla urządzeń > 1024px (laptopy i większe)
                lg={{ width: '120px', height: '120px' }}
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

          {/* Formularz logowania */}
          <Flex
            bg={
              'linear-gradient(0deg, rgba(235, 164, 136,0.7) 0%, rgba(183,65,14,0.7) 83%, rgba(122,82,42,0.6) 100%)'
            }
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
              <form
                onSubmit={handleLogin}
                style={{ width: '100%', marginTop: '20px' }}
              >
                <Flex
                  direction="column"
                  alignItems="center"
                  gap={{ base: 5, md: 10 }}
                  color={'white'}
                >
                  <Input
                    type="email"
                    name="email"
                    border={'3px solid white'}
                    placeholder="E-mail"
                    padding={8}
                    onChange={handleLoginChange}
                    _placeholder={{ color: 'white' }}
                    fontSize={'20px'}
                    required
                    width="80%"
                  />

                  <Input
                    type="password"
                    name="password"
                    border={'3px solid white'}
                    placeholder="Hasło"
                    padding={8}
                    onChange={handleLoginChange}
                    _placeholder={{ color: 'white' }}
                    fontSize={'20px'}
                    required
                    width="80%"
                  />
                  <Button
                    type="submit"
                    backgroundColor="#1c212b"
                    mt="10px"
                    fontSize={'20px'}
                    minW={'60%'}
                    width={{ base: '80%', sm: '60%' }}
                    height={'50px'}
                    md={{ marginTop: '40px' }}
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
            background={'#1c212b'}
            paddingBottom={10}
          >
            <Flex
              flexDir={'row'}
              alignItems={'center'}
              gap={5}
              color={'rgb(0, 0, 0)'}
            >
              <FaGoogle style={{ minWidth: '15px' }} />
              <Button
                backgroundColor={'rgb(11, 8, 8)'}
                color={'white'}
                display={{ base: 'none', sm: 'block' }}
                width={{ sm: '50%', md: '40%' }}
                onClick={handleGoogleLogin}
              >
                Zaloguj się przez Google
              </Button>
            </Flex>
            <Flex
              flexDir={'row'}
              alignItems={'center'}
              gap={5}
              color={'rgb(0, 0, 0)'}
            >
              <FaFacebook style={{ minWidth: '15px' }} />
              <Button
                backgroundColor={'rgb(11, 8, 8)'}
                color={'white'}
                display={{ base: 'none', sm: 'block' }}
                width={{ sm: '50%', md: '40%' }}
                onClick={handleFacebookLogin}
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
