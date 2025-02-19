import { Flex, Image } from '@chakra-ui/react';

const Logo = () => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'}>
      <Image
        width={'60px'}
        height={'50px'}
        rounded={'2xl'}
        src="/AV.png"
        alt="AntiqVal"
        // Ustawienie dla urządzeń > 480px (smartfony i większych)
        sm={{ width: '70px', height: '60px' }}
        // Ustawienie dla urządzeń > 768px (tablety i większe)
        md={{ width: '80px', height: '60px' }}
        // Ustawienie dla urządzeń > 1024px (laptopy i większe)
        lg={{ width: '90px', height: '70px' }}
      />
    </Flex>
  );
};

export default Logo;
