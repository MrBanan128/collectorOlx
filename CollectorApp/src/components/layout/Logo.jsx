import { Flex, Image } from '@chakra-ui/react';

const Logo = () => {
  return (
    <Flex alignItems={'center'}>
      <Image
        shadow={'2xl'}
        w={'270px'}
        bg={'rgb(0, 65, 151)'}
        rounded={'3xl'}
        src="/bol-ex.png"
        alt="BOL-EX COLLECTOR"
        objectFit={'cover'}
      />
    </Flex>
  );
};

export default Logo;
