import { Flex, CloseButton } from '@chakra-ui/react';
import { Link } from 'react-router';
import { useState } from 'react';

import MenuButton from './MenuButton';
import Logo from './Logo';
import AppLink from './AppLink';
import Sidebar from './Sidebar';

// Ensure Navbar is correctly defined and exported
const Navbar = ({ background, height }) => {
  const [isVisible, setVisible] = useState(false);

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
          <AppLink to={'/admin'}>Admin</AppLink>
          {!isVisible && <MenuButton onClick={handleClick} />}
        </Flex>
      </Flex>

      <Sidebar open={isVisible} setOpen={setVisible} />
    </Flex>
  );
};

// ✅ Make sure this export is present at the end of the file
export default Navbar;
