import { Flex } from '@chakra-ui/react';
import { Link } from 'react-router';

import Logo from './Logo';
import AppLink from './AppLink';

const Navbar = () => {
  return (
    <Flex
      zIndex={'100'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      height={'150px'}
      position={'fixed'}
      backgroundColor={'gray.800'}
      px={20}
    >
      <Link to={'/'}>
        <Logo />
      </Link>
      <Flex justifyContent={'start'} gap={20} paddingLeft={10}>
        <AppLink to={'/'}>Home </AppLink>
        <AppLink to={'/message'}>Message </AppLink>
        <AppLink to={'/chat'}>Chat </AppLink>
        <AppLink to={'/sign-up'}>New Account </AppLink>
      </Flex>
    </Flex>
  );
};

export default Navbar;
