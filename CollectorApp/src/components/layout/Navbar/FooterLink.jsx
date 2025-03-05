import { Link } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router';

const FooterLink = ({ to, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      onClick={() => navigate(to)}
      textDecoration={'none'}
      _focus={{ outline: 'none' }}
      mr={4}
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
      {children}
    </Link>
  );
};

export default FooterLink;
