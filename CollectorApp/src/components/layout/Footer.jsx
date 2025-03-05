import { Flex, Text } from '@chakra-ui/react';
import FooterLink from './Navbar/FooterLink';
import background from '../../assets/backgr.png';
import { Link } from 'react-router';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';

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
          <Flex>
            <FooterLink to={'/terms-and-conditions'}>Regulamin</FooterLink>
            <FooterLink to={'/about'}>Jak działa Antique Value</FooterLink>
          </Flex>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <FooterLink to={'/policy'}>Polityka prywatności</FooterLink>
            <FooterLink to={'/contact'}>Kontakt</FooterLink>
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
        <Flex alignItems={'center'} ml={5} gap={2}>
          <Link to={'https://x.com/'}>
            <FaSquareXTwitter size={'20px'} color="white" />
          </Link>
          <Link to={'https://linkedin.com/'}>
            <FaLinkedin size={'20px'} color="white" />
          </Link>
          <Link to={'https://instagram.com/'}>
            <FiInstagram size={'20px'} color="white" />
          </Link>
        </Flex>
        <Flex>
          <Text
            marginRight={5}
            paddingTop={0}
            fontSize={14}
            color={'white'}
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
