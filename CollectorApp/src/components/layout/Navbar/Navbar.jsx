import { Flex, CloseButton } from '@chakra-ui/react';
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
  const [isLogged, setIsLogged] = useState(false); // Stan do przechowywania informacji o zalogowaniu

  useEffect(() => {
    // Odczytujemy dane z localStorage, np. rolę użytkownika
    const userData = JSON.parse(localStorage.getItem('user')); // Zakładamy, że dane użytkownika są zapisane w localStorage pod kluczem 'user'
    console.log(userData); //TODO WYSWIETLA NULL

    if (userData && userData.role === 'admin') {
      setIsAdmin(true);
      console.log('admin');
    }
    if (userData && userData.role === 'expert') {
      setIsExpert(true);
      console.log('expert');
    }
    if (userData !== null) {
      setIsLogged(true);
      console.log('logged');
    }
  }, []);

  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  return (
    <Flex>
      <Flex
        marginTop={'0.5rem'}
        zIndex={2222}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        height={height}
        position="fixed"
        background={background}
        px={4}
        transition="height 0.5s ease, background 0.5s ease"
        roundedBottom={'xl'}
      >
        <Link to="/">{!isVisible && <Logo />}</Link>
        <Flex justifyContent="start" gap={3} float="right" px={4}>
          <AppLink to="/">Home</AppLink>
          <AppLink to="/dashboard">Dashboard</AppLink>
          <AppLink to={'/Sign-up'}>Account</AppLink>
          <AppLink to={'/test'}>Test</AppLink>
          <AppLink to={'/adds'}>Adds</AppLink>
          {!isVisible && <MenuButton onClick={handleClick} />}
        </Flex>
      </Flex>

      <Sidebar open={isVisible} setOpen={setVisible} />
    </Flex>
  );
};

// ✅ Make sure this export is present at the end of the file
export default Navbar;
