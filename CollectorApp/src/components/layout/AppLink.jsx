import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router';
import { useLocation } from 'react-router';

import ShinyText from '../ui/ShinyText/shinytext';

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
      color={active ? 'rgba(14, 7, 217, 0.67)' : 'rgba(222, 222, 224, 0.67)'}
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
      <ShinyText
        text={children}
        disabled={false}
        speed={4}
        color
        className="ShinyNavLink"
      />
    </Link>
  );
};

export default AppLink;
