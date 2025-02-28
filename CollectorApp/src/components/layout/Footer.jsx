import { Flex, Image, Text } from '@chakra-ui/react';
import FooterLink from './Navbar/FooterLink';
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
            <FooterLink to={'/regulamin'}>Regulamin</FooterLink>
            <FooterLink>Jak działa Antique Value</FooterLink>
          </Flex>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <FooterLink>Polityka prywatności</FooterLink>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        // marginLeft={5}
        // marginBottom={3}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        backgroundColor={'#cbcdc4'}
      >
        <Flex alignItems={'center'} marginLeft={3}>
          <Link to={'https://x.com/'}>
            <Image
              marginRight={1}
              marginBottom={0.4}
              width={7}
              height={7}
              objectFit={'cover'}
              src="/x_logo.png"
            ></Image>
          </Link>
          <Link to={'https://linkedin.com/'}>
            <Image
              marginLeft={3}
              marginRight={1}
              marginBottom={0.4}
              width={9}
              height={9}
              objectFit={'cover'}
              src="/linkedin_logo.png"
            ></Image>
          </Link>
          <Link to={'https://instagram.com/'}>
            <Image
              marginLeft={3}
              marginRight={1}
              marginBottom={0.4}
              width={8}
              height={8}
              objectFit={'cover'}
              src="/instagram_logo.png"
            ></Image>
          </Link>
        </Flex>
        <Flex>
          <Text
            marginRight={5}
            paddingTop={0}
            fontSize={14}
            color={'black'}
            alignItems={'center'}
            // fontWeight={'bold'}
          >
            &copy; AV TEAM 2025
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
