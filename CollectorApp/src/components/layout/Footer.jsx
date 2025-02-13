import { Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <Flex
      gap="2"
      backgroundColor={'gray.800'}
      direction="column"
      width={'100%'}
      height={'auto'}
    >
      <Flex
        gap="2"
        align="center"
        justify="space-between"
        backgroundColor={'gray.800'}
      >
        <Flex
          direction="column"
          paddingTop={5}
          marginLeft={20}
          sm={{ fontSize: 1 }}
          md={{ fontSize: 3 }}
          lg={{ fontSize: 15 }}
        >
          <Link
            to={'/help'}
            style={{
              backgroundImage:
                'linear-gradient(to top, rgb(179, 179, 179) 0.01px, transparent 0.5px)',
              hover: { backgroundColor: 'blue' }
            }}
          >
            Pomoc
          </Link>
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
            sm={{ fontSize: 5 }}
            md={{ fontSize: 10 }}
            lg={{ fontSize: 17 }}
          >
            All rights reserved
          </Text>
          <Flex>
            <Link
              to={'/privacy-preferences'}
              style={{
                marginLeft: 10,
                marginTop: 8,
                fontSize: 'auto',
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
              fontSize={'auto'}
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
                marginTop: 8,
                fontSize: 'auto',
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
