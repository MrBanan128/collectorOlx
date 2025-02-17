import { useState, useEffect } from 'react';
import { Flex, Image, Box, Text } from '@chakra-ui/react';
import DecryptedText from '../components/ui/decrypted';

import Navbar from '../components/layout/Navbar/Navbar';
import MostViewed from '../components/layout/MostViewed/MostViewed';
import Carousel from '../components/layout/CategoryCarousel/Carousel';
import Footer from '../components/layout/Footer';

const Home = () => {
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
              : 'radial-gradient(circle, rgba(11,11,11,0) 0%, rgba(193,186,186,0) 50%, rgba(9,9,9,0) 100%)'
          }
          height={scrolled ? '84px' : '80px'} // Wysokość zmieniona o 10%
        />
      </Box>
      <Box position="relative" width="100%">
        <Box
          position="absolute"
          zIndex={999}
          left={{ base: '15%', sm: '20%', md: '20%' }}
          top={{ base: '35%', sm: '35%', md: '30%' }}
          width={{ base: '50%', sm: '41%', md: '35%', lg: '33%', xl: '35%' }}
        >
          <Text
            fontSize={{
              base: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
              lg: '3.1rem',
              xl: '4.1rem'
            }}
            color="white"
            fontWeight="bold"
          >
            <DecryptedText
              text="BARTER COLLECTORS EXCHANGE"
              animateOn="view"
              fontSize={{
                base: '1rem',
                sm: '2.0rem',
                md: '2.5rem',
                lg: '3.1rem',
                xl: '4.1rem'
              }} // Responsywny fontSize
              color="white" // Kolor
              fontWeight="bold" // Font weight
            />
          </Text>
        </Box>

        <Image
          src="/background.jpg"
          alt="background"
          width="100%"
          objectFit="cover"
          height={{
            base: '200px',
            sm: '250px',
            md: '300px',
            lg: '400px',
            xl: '500px'
          }}
        />
      </Box>
      <Carousel />
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
        <MostViewed alt={'Znaczek'} src={'/item2.png'}></MostViewed>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default Home;
