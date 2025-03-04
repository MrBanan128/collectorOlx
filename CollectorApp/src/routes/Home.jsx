import { useState, useEffect } from 'react';
import { Flex, Image, Box, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react'; // Import keyframes from @emotion/react
import Navbar from '../components/layout/Navbar/Navbar';
import MostViewed from '../components/layout/MostViewed/MostViewed';
import Carousel from '../components/layout/CategoryCarousel/Carousel';
import Footer from '../components/layout/Footer';
import VideoPlayer from './VideoPlayer';

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
  const [showText, setShowText] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 4000); // 10 sekund

    return () => clearTimeout(timer); // czyszczenie timera, aby uniknąć błędów
  }, []);

  return (
    <Flex flexDirection="column" background="white" overflow="hidden">
      {/* Navbar */}
      <Box>
        <Navbar
          background={
            scrolled
              ? `url('../../../assets/backgr.png') no-repeat center center, 
               linear-gradient(to bottom, #1c212b 70%, rgb(8, 13, 23) 100%); 
               background-blend-mode: overlay;`
              : 'rgba(28, 33, 43, .5)'
          }
          height={scrolled ? '84px' : '80px'}
        />
      </Box>

      {/* Hero Section */}
      <Box position="relative" width="100%">
        {/* Text with Animation */}
        <Box
          background={'rgb(28, 33, 43,.5)'}
          borderRadius={'2rem'}
          p={'1rem 2rem'}
          position="absolute"
          transform={'translate(-80px, -150px)'}
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
          <Text
            fontSize={'2.6rem'}
            p={'1rem 3rem 2rem 1rem'}
            style={{ opacity: showText ? 1 : 0, transition: 'opacity 1s' }}
          >
            Dodaj swoje artykuły kolekcjonerskie i poznaj ich wartość rynkową.
            <br />
            Łatwe w użyciu narzędzie,
            <br />
            które łączy pasjonatów kolekcjonerstwa!
          </Text>
        </Box>

        {/* Background Image */}

        <VideoPlayer />
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
            'radial-gradient(circle, #1c212b 0%, #d0c0a3 50%, rgba(9,9,9,1) 100%)'
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
