import { Heading, Box } from '@chakra-ui/react';

import Products from '../components/layout/AdminPanel/Products';
import Users from '../components/layout/AdminPanel/Users';

const App = () => {
  return (
    <Box backgroundColor="white" height={'100vh'}>
      <Heading
        fontSize="2rem"
        fontWeight="bold"
        padding="1rem"
        backgroundColor="gray.400"
      >
        Product Management
      </Heading>
      <Products />
      <Heading
        fontSize="2rem"
        fontWeight="bold"
        padding="1rem"
        backgroundColor="gray.400"
      >
        Users
      </Heading>
      <Users />
    </Box>
  );
};

export default App;
