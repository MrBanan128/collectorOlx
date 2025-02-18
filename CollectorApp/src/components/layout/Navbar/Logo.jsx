import { Flex, Image } from '@chakra-ui/react';

const Logo = () => {
  return (
    <Flex alignItems={'center'}>
      <Image
        width={'70px'}
        height={'50px'}
        bg={'rgb(222, 222, 224,0,5)'}
        rounded={'2xl'}
        src="/AV.png"
        alt="AV"
        objectFit={'fill'}
        // Ustawienie dla urządzeń > 480px (smartfony i większych)
        sm={{ width: '60px', height: '50px' }}
        // Ustawienie dla urządzeń > 768px (tablety i większe)
        md={{ width: '70px', height: '60px' }}
        // Ustawienie dla urządzeń > 1024px (laptopy i większe)
        lg={{ width: '80px', height: '70px' }}
        xl={{ width: '100px', height: '80px' }}
      />
    </Flex>
  );
};

export default Logo;
