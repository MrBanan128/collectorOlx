import { Flex, Image, Text } from '@chakra-ui/react';
import FooterLink from './Navbar/FooterLink';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <Flex
      gap="2"
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
        gap="2"
        align="center"
        justify="space-between"
        backgroundColor={'gray.800'}
        wrap={'wrap'}
        margin={10}
      >
        <Flex direction="column" paddingTop={5} gap={4}>
          <FooterLink>Pomoc</FooterLink>
          <FooterLink
            to={'/higlighted-offerts'}
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            Wyróżnione ogłoszenia
          </FooterLink>
          <FooterLink
            to={'/blog'}
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            Blog
          </FooterLink>
          <FooterLink
            to={'/policy'}
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            Regulamin
          </FooterLink>
          <FooterLink
            to={'/privacy-policy'}
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            Polityka prywatności
          </FooterLink>
          <FooterLink
            to={'/advertisement'}
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            Reklama
          </FooterLink>
        </Flex>
        <Flex direction="column" paddingTop={5} gap={4}>
          <FooterLink to={'/safety-rules'}>Zasady bezpieczeństwa</FooterLink>
          <FooterLink to={'/categories-map'}>Mapa kategorii</FooterLink>
          <FooterLink to={'/locations-map'}>Mapa miejscowości</FooterLink>
          <FooterLink to={'/minipages-map'}>Mapa ministron</FooterLink>
          <FooterLink to={'/popular-searches'}>
            Popularne wyszukiwania
          </FooterLink>
        </Flex>
        <Flex direction="column" paddingTop={5} gap={4}>
          <FooterLink to={'/career'}>Kariera</FooterLink>
          <FooterLink to={'/how-BLO-EX-works'}>
            Jak działa BLO-EX Collectors
          </FooterLink>
          <FooterLink to={'/cookie-files-settings'}>
            Ustawienia plików cookie
          </FooterLink>
          <FooterLink to={'/prices'}>Cennik</FooterLink>
          <FooterLink to={'/cookie-policy'}>Polityka cookies</FooterLink>
        </Flex>
      </Flex>
      <Flex
        marginLeft={5}
        marginBottom={5}
        marginTop={5}
        direction={'row'}
        alignItems={'center'}
        justify="evenly"
      >
        <Link to={'https://x.com/'}>
          <Image
            marginLeft={5}
            width={8}
            height={8}
            objectFit={'cover'}
            src="/x_logo.png"
          ></Image>
        </Link>
        <Link to={'https://linkedin.com/'}>
          <Image
            marginLeft={3}
            width={8}
            height={8}
            objectFit={'cover'}
            src="/linkedin_logo.png"
          ></Image>
        </Link>
        <Link to={'https://instagram.com/'}>
          <Image
            marginLeft={3}
            width={10}
            height={10}
            objectFit={'cover'}
            src="/instagram_logo.png"
          ></Image>
        </Link>
        <Link to={'https://tiktok.com/'}>
          <Image
            marginLeft={3}
            width={8}
            height={8}
            objectFit={'cover'}
            src="/tiktok_logo.png"
          ></Image>
        </Link>
        <Link to={'https://youtube.com/'}>
          <Image
            marginLeft={3}
            width={10}
            height={10}
            objectFit={'cover'}
            src="/youtube_logo.png"
          ></Image>
        </Link>
      </Flex>
      <Flex
        backgroundColor={'#5f7b91'}
        direction={'row'}
        paddingBottom={3}
        justifyContent={'space-between'}
      >
        <Flex>
          <Text
            marginLeft={10}
            marginTop={2}
            fontSize={15}
            color={'black'}
            alignItems={'center'}
            fontWeight={'bold'}
          >
            &copy; 2025
          </Text>
          <Image
            marginLeft={5}
            width={81}
            height={28.25}
            objectFit={'cover'}
            marginTop={2}
            src="/bol-ex-black.png"
          ></Image>
        </Flex>
        <Flex marginRight={5}>
          <Text
            marginRight={2}
            marginTop={2}
            // fontSize={'auto'}
            color={'black'}
            alignItems={'center'}
            fontWeight={'bold'}
            fontSize={15}
          >
            All rights reserved
          </Text>
          <Flex>
            <Link
              to={'/privacy-preferences'}
              style={{
                marginLeft: 10,
                marginTop: 6,
                fontSize: 15,
                color: 'black',
                alignItems: 'center',
                fontWeight: 'bold',
                marginRight: 8
              }}
            >
              Privacy Preferences
            </Link>
            <Text
              marginTop={2}
              fontSize={15}
              color={'black'}
              alignItems={'center'}
              fontWeight={'bold'}
            >
              |
            </Text>
            <Link
              to={'/regulations'}
              style={{
                marginLeft: 8,
                marginTop: 6,
                fontSize: 15,
                color: 'black',
                alignItems: 'center',
                fontWeight: 'bold',
                marginRight: 5
              }}
            >
              Regulations
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
