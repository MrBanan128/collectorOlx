import { Flex } from '@chakra-ui/react';

import Navbar from './Navbar/Navbar';

const Layout = () => {
  return (
    <Flex
      height={'100vh'}
      flexDirection={'column'}
      background={'white'}
      overflow={'hidden'}
    >
      <Navbar />
    </Flex>
  );
};
export default Layout;
