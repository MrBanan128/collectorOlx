import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router';
import { useLocation } from 'react-router';

import ShinyText from '../../ui/ShinyText/shinytext';

// eslint-disable-next-line react/prop-types
const AppLink = ({ children, to }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      as={NavLink}
      to={to}
      textDecoration={'none'}
      _focus={{ outline: 'none' }}
      fontWeight={'bold'}
      color={active ? '#b7410e' : 'white'}
      borderBottom={active ? '2px solid ' : 'none'}
      cursor={'pointer'}
      _hover={{
        color: '#b7410e',
        borderBottom: '2px solid',
        borderColor: '#b7410e'
      }}
      transition={'all ease-in-out 0.3s'}
      role="navigation"
      fontSize={14}
      display={'none'}
      // Ustawienie dla urządzeń > 480px (smartfony i większych)
      sm={{ px: 2, display: 'block' }}
      // Ustawienie dla urządzeń > 768px (tablety i większe)
      md={{ px: 3, fontSize: 18 }}
      // Ustawienie dla urządzeń > 1024px (laptopy i większe)
      lg={{ px: 6, fontSize: 25 }}
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
