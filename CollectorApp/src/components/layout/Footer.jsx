import { Button, Flex } from '@chakra-ui/react';
import AppLink from './AppLink';

const Footer = () => {
  return (
    <Flex
      gap="2"
      align="center"
      justify="space-between"
      backgroundColor={'gray.800'}
    >
      <Box>
        <AppLink to={'/help'}>Pomoc</AppLink>
        <AppLink to={'/higlighted-offerts'}>Wyróżnione ogłoszenia</AppLink>
        <AppLink to={'/blog'}>Blog</AppLink>
        <AppLink to={'/policy'}>Regulamin</AppLink>
        <AppLink to={'/privacy-policy'}>Polityka prywatności</AppLink>
        <AppLink to={'/advertisement'}>Reklama</AppLink>
        <Button>tryb nocny</Button>
      </Box>
      <Box>
        <AppLink to={'/safety-rules'}>Zasady bezpieczeństwa</AppLink>
        <AppLink to={'/categories-map'}>Mapa kategorii</AppLink>
        <AppLink to={'/locations-map'}>Mapa miejscowości</AppLink>
        <AppLink to={'/minipages-map'}>Mapa ministron</AppLink>
        <AppLink to={'/popular-searches'}>Popularne wyszukiwania</AppLink>
        <AppLink to={'/career'}>Kariera</AppLink>
        <AppLink to={'/how-BLO-EX-works'}>Jak działa BLO-EX Collectors</AppLink>
      </Box>
      <Box>
        <AppLink to={'/cookie-files-settings'}>
          Ustawienia plików cookie
        </AppLink>
        <AppLink to={'/prices'}>Cennik</AppLink>
        <AppLink to={'/cookie-policy'}>Polityka cookies</AppLink>
      </Box>
    </Flex>
  );
};

export default Footer;
