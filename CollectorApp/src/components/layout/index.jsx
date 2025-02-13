import { useState, useEffect } from 'react';
import { Flex, Image, Box } from '@chakra-ui/react';

import Navbar from './Navbar/Navbar';
import Category from './Category/Category';

const Layout = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight * 0.2) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Flex flexDirection="column" background="white" overflow="hidden">
      {/* Navbar z dynamiczną wysokością i tłem */}
      <Box>
        <Navbar
          background={
            scrolled
              ? 'radial-gradient(circle, rgba(11,11,11,0) 0%, rgba(193,186,186,0) 50%, rgba(9,9,9,0) 100%)'
              : 'radial-gradient(circle, rgba(11,11,11,1) 0%, rgba(193,186,186,1) 50%, rgba(9,9,9,1) 100%)'
          }
          height={scrolled ? '88px' : '80px'} // Wysokość zmieniona o 10%
        />
      </Box>

      <Image src="/background.jpg" alt="background" height={'1000px'} />
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        className="container"
        style={{
          background:
            'radial-gradient(circle, rgba(11,11,11,1) 0%, rgba(193,186,186,1) 50%, rgba(9,9,9,1) 100%)'
        }}
      >
        <Category alt={'Znaczek'} src={'/item2.png'}></Category>
      </Flex>
    </Flex>
  );
};

export default Layout;
