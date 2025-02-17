import { Flex } from '@chakra-ui/react';
import Navbar from '@/components/layout/Navbar/Navbar';
import MyProducts from '@/components/layout/Profile/MyProducts';
import Footer from '@/components/layout/Footer';

const Profile = () => {
  return (
    <Flex flexDir="column" background="gray.500" overflow="hidden">
      <Navbar position="static" />
      <MyProducts height="100vh" />
      <Footer />
    </Flex>
  );
};

export default Profile;
