import { useState, useEffect } from 'react';
import { Flex, Image, Box, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react'; // Import keyframes from @emotion/react
import Navbar from '../components/layout/Navbar/Navbar';
import MostViewed from '../components/layout/MostViewed/MostViewed';
import Carousel from '../components/layout/CategoryCarousel/Carousel';
import Footer from '../components/layout/Footer';

// Animation for letter-by-letter reveal
const revealAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
      {/* Navbar */}
      <Box>
        <Navbar
          background={scrolled ? 'rgba(92, 92, 92,1)' : 'rgba(92, 92, 92,0)'}
          height={scrolled ? '84px' : '80px'}
          width={"100%"} 
        />
      </Box>

      {/* Hero Section */}
      <Box position="relative" width="100%">
        {/* Text with Animation */}
        <Box
          position="absolute"
          zIndex={999}
          left={{ base: '15%', sm: '20%', md: '20%' }}
          top={{ base: '45%', sm: '45%', md: '40%' }} // Adjusted to position text lower
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
            {'ANTIQUE VALUE'.split('').map((letter, index) => (
              <Box
                key={index}
                as="span"
                display="inline-block"
                opacity={0}
                animation={`${revealAnimation} 0.8s ease forwards ${index * 0.3}s`} // Increased delay to 0.2s per letter
                whiteSpace="pre" // Preserve spacing between letters
              >
                {letter}
              </Box>
            ))}
          </Text>
        </Box>

        {/* Background Image */}
        <Image
          src="./src/assets/main-page-img.jpeg"
          alt="background"
          width="100%"
          objectFit="cover"
          height={{
            base: '300px',
            sm: '350px',
            md: '400px',
            lg: '500px',
            xl: '700px'
          }}
        />
      </Box>

      {/* Other Sections */}
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

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default Home;
