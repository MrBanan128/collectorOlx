import { Flex, CloseButton } from '@chakra-ui/react';
import { Link } from 'react-router';
import { useState } from 'react';

import MenuButton from './MenuButton';
import Logo from './Logo';
import AppLink from './AppLink';
import Sidebar from './Sidebar';

// eslint-disable-next-line react/prop-types
const Navbar = ({ background, height }) => {
  const [isVisible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(!isVisible);
  };

  return (
    <Flex>
      <Flex
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
          <AppLink to="/">Home</AppLink>
          <AppLink to="/dashboard">Dashboard</AppLink>
          <AppLink to={'/Sign-up'}>Account</AppLink>
          <AppLink to={'/test'}>Test </AppLink>
          <AppLink to={'/admin'}>Admin </AppLink>
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
