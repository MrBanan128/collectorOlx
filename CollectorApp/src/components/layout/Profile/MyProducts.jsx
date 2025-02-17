import { Heading, Flex, Button } from '@chakra-ui/react';
const MyProducts = (height) => {
  return (
    <Flex flexDir="column" {...height}>
      <Heading fontSize={'32px'} paddingLeft={10} paddingTop={10}>
        Twoje Ogłoszenia
      </Heading>
      <Flex flexDir="row" paddingTop={'20px'} paddingLeft={10}>
        <Button size={'2xl'}>Ogłoszenia</Button>
        <Button size={'2xl'} disabled>
          Wiadomości
        </Button>
        <Button size={'2xl'}>Profil</Button>
        {/* Skrypty wyswietlające różne elementy  po kliknieciu w odpowiedni button*/}
      </Flex>
    </Flex>
  );
};
export default MyProducts;
