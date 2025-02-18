import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router';
import { useLocation } from 'react-router';

// eslint-disable-next-line react/prop-types
const SideLink = ({ children, to }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      as={NavLink}
      to={to}
      textDecoration={'none'}
      _focus={{ outline: 'none' }}
      fontWeight={'bold'}
      color={active ? 'rgba(147,8,7,1)' : 'rgba(0, 0, 0, 1)'}
      borderBottom={active ? '2px solid ' : 'none'}
      cursor={'pointer'}
      width={'100%'}
      _hover={{
        color: 'rgba(147,8,7,1)',
        borderBottom: '2px solid',
        borderColor: 'rgba(147,8,7,1)'
      }}
      transition={'all ease-in-out 0.3s'}
      role="navigation"
      fontSize={20}
    >
      {children}
    </Link>
  );
};

export default SideLink;
