import { Heading, Box, Flex } from '@chakra-ui/react';

import Products from '../components/layout/AdminPanel/Products';
import Users from '../components/layout/AdminPanel/Users';
import Navbar from '../components/layout/Navbar/Navbar';

const App = () => {
  return (
    <Box
      backgroundColor="white"
      height={'100vh'}
      background={'rgba(154, 164, 166, 0.8)'}
    >
      <Navbar />
      <Flex flexDir={'column'} padding={'1rem'} marginTop={'10rem'}>
        {/* <Heading
          fontSize="2rem"
          fontWeight="bold"
          padding="1rem"
          backgroundColor="gray.400"
        >
          Product Management
        </Heading>
        <Products /> */}
        <Heading
          fontSize="2rem"
          fontWeight="bold"
          padding="1rem"
          backgroundColor="gray.400"
        >
          Users
        </Heading>
        <Users />
      </Flex>
    </Box>
  );
};

export default App;
