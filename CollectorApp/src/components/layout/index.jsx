import { Flex, Box } from '@chakra-ui/react';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <Flex
      height={'100vh'}
      flexDirection={'column'}
      background={'white'}
      overflow={'hidden'}
    >
      <Navbar />
      <Box
        flex={1}
        width={'100%'}
        backgroundColor={'white'}
        color="black"
        marginTop={'70px'}
        padding={5}
      ></Box>
      <Footer />
    </Flex>
  );
};
export default Layout;
