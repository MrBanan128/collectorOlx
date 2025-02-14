import { Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <Flex gap="2" backgroundColor={'gray.800'} direction="column">
      <Flex
        gap="2"
        align="center"
        justify="space-between"
        backgroundColor={'gray.800'}
      >
        <Flex direction="column" paddingLeft={125} paddingTop={5}>
          <Link to={'/help'}>Pomoc</Link>
          <Link to={'/higlighted-offerts'}>Wyróżnione ogłoszenia</Link>
          <Link to={'/blog'}>Blog</Link>
          <Link to={'/policy'}>Regulamin</Link>
          <Link to={'/privacy-policy'}>Polityka prywatności</Link>
          <Link to={'/advertisement'}>Reklama</Link>
        </Flex>
        <Flex direction="column" paddingTop={5}>
          <Link to={'/safety-rules'}>Zasady bezpieczeństwa</Link>
          <Link to={'/categories-map'}>Mapa kategorii</Link>
          <Link to={'/locations-map'}>Mapa miejscowości</Link>
          <Link to={'/minipages-map'}>Mapa ministron</Link>
          <Link to={'/popular-searches'}>Popularne wyszukiwania</Link>
        </Flex>
        <Flex direction="column" paddingRight={125} paddingTop={5}>
          <Link to={'/career'}>Kariera</Link>
          <Link to={'/how-BLO-EX-works'}>Jak działa BLO-EX Collectors</Link>
          <Link to={'/cookie-files-settings'}>Ustawienia plików cookie</Link>
          <Link to={'/prices'}>Cennik</Link>
          <Link to={'/cookie-policy'}>Polityka cookies</Link>
        </Flex>
      </Flex>
      <Flex direction={'row'} alignItems={'center'} justify="evenly">
        <Link to={'https://www.apple.com/app-store/'}>
          <Image
            paddingLeft={3}
            width={100}
            height={100}
            objectFit={'cover'}
            src="/app-store.png"
          ></Image>
        </Link>
        <Link to={'https://play.google.com/'}>
          <Image
            paddingLeft={3}
            width={100}
            height={100}
            objectFit={'cover'}
            src="/google-play.png"
          ></Image>
        </Link>
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
            fontSize={20}
            color={'black'}
            alignItems={'center'}
            fontWeight={'bold'}
          >
            &copy; 2025
          </Text>
          <Image
            marginLeft={3}
            width={20}
            height={10}
            objectFit={'cover'}
            src="/bol-ex-black.png"
          ></Image>
        </Flex>
        <Flex>
          <Text
            marginLeft={10}
            marginTop={2}
            fontSize={20}
            color={'black'}
            alignItems={'center'}
            fontWeight={'bold'}
          >
            All rights reserved
          </Text>
          <Flex>
            <Link to={'/privacy-preferences'}>
              <Text
                marginLeft={10}
                marginTop={2}
                fontSize={20}
                color={'black'}
                alignItems={'center'}
                fontWeight={'bold'}
              >
                Privacy Preferences
              </Text>
            </Link>
            <Text
              marginLeft={10}
              marginTop={2}
              fontSize={20}
              color={'black'}
              alignItems={'center'}
              fontWeight={'bold'}
            >
              |
            </Text>
            <Link to={'/regulations'}>
              <Text
                marginLeft={10}
                marginTop={2}
                fontSize={20}
                color={'black'}
                alignItems={'center'}
                fontWeight={'bold'}
                marginRight={5}
              >
                Regulations
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
