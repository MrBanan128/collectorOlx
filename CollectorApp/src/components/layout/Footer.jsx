import { Flex, Image, Text } from '@chakra-ui/react';
import FooterLink from './Navbar/FooterLink';
import background from '../../assets/backgr.png';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <Flex
      backgroundImage={`url(${background})`}
      backgroundRepeat="no-repeat"
      // backgroundColor="#1c212b"
      background={`url('../../../assets/backgr.png') no-repeat center center, 
               linear-gradient(to bottom, #1c212b 50%, #0a1020 100%); 
               background-blend-mode: overlay;`}
      backgroundBlendMode="overlay"
      backgroundSize="cover"
      direction="column"
      width="100%"
      height="auto"
      minHeight="60px"
      py={0}
      px={[0, 0, 0]}
      borderTop="5px solid"
      borderImage="linear-gradient(45deg, #8b3a3a, #b7410e, #fcd9cb, #92400e, #5a2e02)"
      borderImageSlice="1"
    >
      <Flex
        align="center"
        justify="space-between"
        direction={'Column'}
        margin={8}
      >
        <Flex gap={2} direction={'row'} align={'center'}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            borderLeft={'1px solid gray'}
          >
            <FooterLink to={'/terms-and-conditions'}>Regulamin</FooterLink>
            <FooterLink to={'/about'}>Jak działa Antique Value</FooterLink>
          </Flex>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <FooterLink to={'/policy'}>Polityka prywatności</FooterLink>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        // marginLeft={5}
        // marginBottom={3}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        background="linear-gradient(45deg, #8b3a3a, #b7410e, #fcd9cb, #92400e, #5a2e02)"
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
