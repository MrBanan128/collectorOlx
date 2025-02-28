import { Flex, Heading, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router';

const NotFound = () => {
  return (
    <Flex
      align={'center'}
      padding={'50px'}
      h={'100vh'}
      direction={'column'}
      color={'white'}
    >
      <Heading fontSize={'7xl'} pb={20}>
        404 - Page Not Found
      </Heading>
      <Text fontSize={'4xl'}>
        Nie znaleziono strony. Sprawdź adres lub wróć na{' '}
        <NavLink
          to="/"
          style={{
            padding: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            cursor: 'pointer',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
            borderRadius: '5px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          stronę główną
        </NavLink>
        .
      </Text>
    </Flex>
  );
};

export default NotFound;
