import { Flex, CloseButton } from '@chakra-ui/react';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import MenuButton from './MenuButton';
import Logo from './Logo';
import AppLink from './AppLink';
import Sidebar from './Sidebar';

// eslint-disable-next-line react/prop-types
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
    setVisible(!isVisible);
  };

  return (
    <Flex>
      <Flex
        marginTop={'0.5rem'}
        zIndex={999}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        height={height} // Dynamiczna wysokość
        position="fixed"
        background={background} // Dynamiczne tło
        px={4}
        transition="height 0.5s ease, background 0.5s ease" // Płynna animacja wysokości i tła
        sm={{ px: 4 }}
        md={{ px: 6 }}
        lg={{ px: 8 }}
      >
        <Link to="/">
          <Logo />
        </Link>
        <Flex justifyContent="start" gap={3} float="right" px={4}>
          <AppLink to="/">Strona Główna</AppLink>
          {isLogged && <AppLink to="/dashboard">Profil</AppLink>}
          {!isLogged && <AppLink to={'/login'}>Zaloguj</AppLink>}
          {isAdmin && <AppLink to={'/admin'}>Admin</AppLink>}
          {isExpert && <AppLink to={'/expert'}>Expert</AppLink>}

          <MenuButton onClick={handleClick} />
        </Flex>
      </Flex>
      {isVisible && (
        <Flex
          direction="column"
          alignItems="start"
          justifyContent="start"
          position="fixed"
          top={0}
          right={0}
          height="100vh"
          width="40%"
          zIndex={999}
          background="rgba(255, 255, 255, 0)"
          backdropFilter="blur(6px)"
          boxShadow="-10px 0 10px rgba(0, 0, 0, 0.1)"
        >
          <CloseButton
            onClick={handleClick}
            variant="ghost"
            size="xl"
            color="rgb(255, 255, 255)"
            fontWeight="bold"
          />
          <Sidebar />
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
