import { Flex, Image } from '@chakra-ui/react';
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
      <Flex direction={'row'}>
        <Image
          paddingLeft={3}
          width={100}
          height={100}
          objectFit={'cover'}
          src="/app-store.png"
        ></Image>
        <Image
          paddingLeft={3}
          width={100}
          height={100}
          objectFit={'cover'}
          src="/google-play.png"
        ></Image>
      </Flex>
    </Flex>
  );
};

export default Footer;
