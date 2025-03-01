import { Flex, Image } from '@chakra-ui/react';

const Logo = ({ width, height }) => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'}>
      <Image
        width={width}
        height={height}
        rounded={'2xl'}
        src="/AV.png"
        alt="AntiqVal"
        // Ustawienie dla urządzeń > 480px (smartfony i większych)
        sm={{ width: '70px', height: '70px' }}
        // Ustawienie dla urządzeń > 768px (tablety i większe)
        md={{ width: '80px', height: '80px' }}
        // Ustawienie dla urządzeń > 1024px (laptopy i większe)
        lg={{ width: '85px', height: '85px' }}
      />
    </Flex>
  );
};

export default Logo;
