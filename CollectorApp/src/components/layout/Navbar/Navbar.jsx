import { Flex } from '@chakra-ui/react';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import MenuButton from './MenuButton';
import Logo from './Logo';
import AppLink from './AppLink';
import Sidebar from './Sidebar';

// Ensure Navbar is correctly defined and exported
const Navbar = ({ background, height }) => {
  const [isVisible, setVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Stan do przechowywania informacji o adminie
  const [isExpert, setIsExpert] = useState(false); // Stan do przechowywania informacji o ekspercie
  const [isUser, setIsUser] = useState(false); // Stan do przechowywania informacji o użytkowniku
  const [isLogged, setIsLogged] = useState(false); // Stan do przechowywania informacji o zalogowaniu

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:10000/user-info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log(data);

        if (data && data.status === 'admin') {
          setIsAdmin(true);
          console.log('admin');
        }
        if (data && data.status === 'expert') {
          setIsExpert(true);
          console.log('expert');
        }
        if (data && data.status === 'user') {
          setIsUser(true);
          console.log('user');
        }
        if (data !== null) {
          setIsLogged(true);
          console.log('logged');
        }
      } catch (error) {
        console.error('Błąd pobierania danych użytkownika:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  return (
    <Flex>
      <Flex
        zIndex={2222}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        height={height}
        position="fixed"
        background={!isVisible ? background : undefined}
        px={4}
        transition="height 0.5s ease, background 0.5s ease"
        roundedBottom={'xl'}
      >
        <Link to="/">{!isVisible && <Logo width={'70px'} />}</Link>
        <Flex justifyContent="start" gap={3} float="right" px={4}>
          <AppLink to="/">Strona Główna</AppLink>
          {!isLogged && <AppLink to={'/login'}>Zaloguj się</AppLink>}
          {!isVisible && <MenuButton onClick={handleClick} />}
          <AppLink to={'/adds'}>Dodaj Ogłoszenie</AppLink>
          {isAdmin && <AppLink to={'/dashboard/admin-users'}>Admin</AppLink>}
          {isExpert && <AppLink to={'/dashboard/expert'}>Expert</AppLink>}
          {isLogged && <AppLink to={'/dashboard/profile'}>Profil</AppLink>}
        </Flex>
      </Flex>

      <Sidebar open={isVisible} setOpen={setVisible} />
    </Flex>
  );
};

export default Navbar;
