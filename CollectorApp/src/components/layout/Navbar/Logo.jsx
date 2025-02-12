import { Flex, Image } from '@chakra-ui/react';

const Logo = () => {
  return (
    <Flex alignItems={'center'}>
      <Image
        minW={'80px'}
        height={'40px'}
        bg={'rgb(222, 222, 224,0,5)'}
        rounded={'2xl'}
        src="/bol-ex.png"
        alt="BOL-EX COLLECTOR"
        objectFit={'fill'}
        // Ustawienie dla urządzeń > 480px (smartfony i większych)
        sm={{ minW: '120px', height: '50px' }}
        // Ustawienie dla urządzeń > 768px (tablety i większe)
        md={{ width: '150px', height: '60px' }}
        // Ustawienie dla urządzeń > 1024px (laptopy i większe)
        lg={{ width: '180px', height: '70px' }}
      />
    </Flex>
  );
};

export default Logo;
