import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router';
import { useLocation } from 'react-router';

// eslint-disable-next-line react/prop-types
const AppLink = ({ children, to }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      as={NavLink}
      to={to}
      size="xl"
      textDecoration={'none'}
      _focus={{ outline: 'none' }}
      fontWeight={'bold'}
      fontSize={25}
      color={active ? 'blue.700' : 'gray.300'}
      borderBottom={active ? '2px solid ' : 'none'}
      cursor={'pointer'}
      _hover={{
        color: 'blue.200',
        borderBottom: '2px solid',
        borderColor: 'blue.200'
      }}
      transition={'all ease-in-out 0.3s'}
      role="navigation"
    >
      {children}
    </Link>
  );
};
export default AppLink;
