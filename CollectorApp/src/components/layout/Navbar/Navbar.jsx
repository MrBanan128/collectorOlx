import { Flex, CloseButton } from '@chakra-ui/react';
import { Link } from 'react-router';
import { useState } from 'react';

import MenuButton from './MenuButton';
import Logo from './Logo';
import AppLink from './AppLink';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [isVisible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <Flex
        width={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        height={'80px'}
        position={'fixed'}
        backgroundColor={'rgb(63,64,66)'}
        background={
          'radial-gradient(circle, rgba(63,64,66,1) 1%, rgba(102,109,125,1) 50%, rgba(63,64,66,1) 100%)'
        }
        px={4}
        // Ustawienie dla urządzeń > 480px (smartfony i większych)
        sm={{ px: 4, height: '100px' }}
        // Ustawienie dla urządzeń > 768px (tablety i większe)
        md={{ px: 6, height: '120px' }}
        // Ustawienie dla urządzeń > 1024px (laptopy i większe)
        lg={{ px: 8 }}
      >
        <Link to={'/'}>
          <Logo />
        </Link>
        <Flex justifyContent={'start'} gap={3} float={'right'} px={4}>
          <AppLink to={'/'}>Home</AppLink>
          <AppLink to={'/message'}>Message </AppLink>
          <AppLink to={'/chat'}>Chat </AppLink>
          <AppLink to={'/sign-up'}>Account </AppLink>
          <MenuButton onClick={handleClick} />
        </Flex>
      </Flex>
      {/* Sidebar wyświetlany warunkowo */}
      {isVisible && (
        <Flex
          direction={'column'}
          alignItems={'start'}
          justifyContent={'start'}
          position={'fixed'}
          top={0}
          right={0}
          height={'100vh'}
          width={'50%'}
          zIndex={999}
          background={'rgba(255, 255, 255, 0.2)'}
          backdropFilter={'blur(10px)'}
          boxShadow={'-10px 0 10px rgba(0, 0, 0, 0.1)'}
        >
          <CloseButton
            onClick={handleClick}
            variant={'ghost'}
            size={'xl'}
            color={'rgb(255, 255, 255)'}
            fontWeight={'bold'}
          />
          <Sidebar />
        </Flex>
      )}
      {/* Renderuj Sidebar tylko, jeśli isVisible jest true */}
    </>
  );
};

export default Navbar;
