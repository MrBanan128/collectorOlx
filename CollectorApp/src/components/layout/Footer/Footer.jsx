import { Flex, Image, Text } from '@chakra-ui/react';
import FooterLink from './FooterLink';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <Flex
      backgroundColor={'gray.800'}
      direction="column"
      width={'100%'}
      height={'auto'}
      w="100%" // Ensures full width
      minHeight="60px" // Ensures it doesn’t collapse
      py={0} // Keeps vertical padding only
      px={[0, 0, 0]} // Adjusts horizontal padding
      mt={6}
    >
      <Flex
        align="center"
        justify="space-between"
        backgroundColor={'gray.800'}
        // wrap={'wrap'}
        direction={'Column'}
        margin={8}
      >
        <Flex gap={2} direction={'row'} align={'center'}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            borderLeft={'1px solid gray'}
          >
            <FooterLink>Regulamin</FooterLink>
            <FooterLink>Jak działa BLO-EX Collectors</FooterLink>
          </Flex>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <FooterLink>Polityka prywatności</FooterLink>
            <FooterLink>Ustawienia plików cookie</FooterLink>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        // marginLeft={5}
        // marginBottom={3}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        bgGradient="to-r"
        gradientFrom="blue.600"
        gradientTo="green.400"
      >
        <Flex alignItems={'center'} marginLeft={3}>
          <Link to={'https://x.com/'}>
            <Image
              marginRight={1}
              marginBottom={0.4}
              width={4}
              height={4}
              objectFit={'cover'}
              src="/x_logo.png"
            ></Image>
          </Link>
          <Link to={'https://linkedin.com/'}>
            <Image
              marginLeft={3}
              marginRight={1}
              marginBottom={0.4}
              width={4}
              height={4}
              objectFit={'cover'}
              src="/linkedin_logo.png"
            ></Image>
          </Link>
          <Link to={'https://instagram.com/'}>
            <Image
              marginLeft={3}
              marginRight={1}
              width={5}
              height={5}
              objectFit={'cover'}
              src="/instagram_logo.png"
            ></Image>
          </Link>
        </Flex>
        <Flex>
          <Text
            marginRight={5}
            paddingTop={0}
            fontSize={10}
            color={'white'}
            alignItems={'center'}
            // fontWeight={'bold'}
          >
            &copy; BOL-EX TEAM 2025
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
