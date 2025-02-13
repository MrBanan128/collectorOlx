import { Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

const FooterLink = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Link
      onClick={() => navigate(children)}
      //   backgroundImage={
      //     'linear-gradient(to top, rgb(179, 179, 179) 0.01px, transparent 0.5px)'
      //   }
      paddingBottom={2}
      borderBottom="1px solid gray"
      backgroundPosition="center center"
      _focus={{ outline: 'none' }}
      _hover={{
        color: 'blue.400'
      }}
      transition={'all ease-in-out 0.4s'}
      fontWeight={'bold'}
      color={'white'}
    >
      {children}
    </Link>
  );
};

export default FooterLink;
