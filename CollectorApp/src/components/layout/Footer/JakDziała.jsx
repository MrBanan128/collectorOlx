import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Flex,
  useBreakpointValue
} from '@chakra-ui/react';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer.jsx';
import { useState, useEffect } from 'react';

const JakDziała = () => {
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

  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <Box
      backgroundColor={'black'}
      color={'white'}
      minH={'100vh'}
      h={'100%'}
      display={'flex'}
      flexDir={'column'}
    >
      <Box flex={1}>
        <Navbar
          background={`url('../../../assets/backgr.png') no-repeat center center, 
               linear-gradient(to bottom, #1c212b 70%, rgb(8, 13, 23) 100%); 
               background-blend-mode: overlay;`}
        />
        {/* Zmniejszony padding: base: '4rem 1rem', md: '6rem 2rem' */}
        <Box
          maxW="1200px"
          mx="auto"
          p={{ base: '4rem 1rem', md: '4rem 1rem' }}
          mt={'5rem'}
        >
          {/* Nagłówek */}
          <Heading as="h1" size="2xl" textAlign="center" mb={10}>
            Jak działa Antique Value?
          </Heading>

          {/* Sekcja kroków */}
          <Flex direction={flexDirection} gap={8} align="stretch">
            {/* Krok 1 */}
            <Box
              flex={1}
              border="1px solid"
              borderColor="gray.600"
              borderRadius="lg"
              p={6}
              backgroundColor={'#444444'}
              textAlign="center"
            >
              {/* Tytuł */}
              <Heading as="h2" fontSize="18px" mb={4}>
                1. Zrób zdjęcia przedmiotu
              </Heading>

              {/* Obrazek */}
              <Box mb={4}>
                <Image
                  src="/zrb_zdj.png" // Ścieżka względem folderu public
                  alt="Dodaj przedmiot"
                  borderRadius="lg"
                  maxW="100%"
                  height="auto"
                  mx="auto"
                  bgColor={'white'}
                />
              </Box>

              {/* Tekst */}
              <Text fontSize="lg">
                Zrób jak najdokładniejsze zdjęcia przedmiotu, który chcesz
                wycenić bez nich wycena będzie ona utrudniona.
              </Text>
            </Box>

            {/* Krok 2 */}
            <Box
              flex={1}
              border="1px solid"
              borderColor="gray.600"
              borderRadius="lg"
              p={6}
              backgroundColor={'#444444'}
              textAlign="center"
              justifyContent={'center'}
            >
              {/* Tytuł */}
              <Heading as="h2" fontSize={'18px'} mb={4}>
                2. Wstaw swój przedmiot
              </Heading>

              {/* Obrazek */}
              <Box mb={4}>
                <Image
                  src="/add_to_webs.png" // Ścieżka względem folderu public
                  alt="Ocena eksperta"
                  borderRadius="lg"
                  maxW="100%"
                  height="auto"
                  mx="auto"
                  bgColor={'white'}
                />
              </Box>

              {/* Tekst */}
              <Text fontSize="lg">
                Dodaj ogłoszenie z przedmiotem, który chcesz wycenić dołącz
                wczesniej wykonane zdjęcia i zadbaj o jak dokładniejszy opis
                oraz wybierz kategorię i podkategorię swojego przedmiotu pomoże
                ona ekspertom z wiedzą w konkretnych kolekcjach szybciej znaleźć
                i wycenić twój przedmiot.
              </Text>
            </Box>

            <Box
              flex={1}
              border="1px solid"
              borderColor="gray.600"
              borderRadius="lg"
              p={6}
              backgroundColor={'#444444'}
              textAlign="center"
              justifyContent={'center'}
            >
              {/* Tytuł */}
              <Heading as="h2" fontSize={'18px'} mb={4}>
                3. Wycena eksperta
              </Heading>

              {/* Obrazek */}
              <Box mb={4}>
                <Image
                  src="/check.png" // Ścieżka względem folderu public
                  alt="Ocena eksperta"
                  borderRadius="lg"
                  maxW="100%"
                  height="auto"
                  mx="auto"
                  bgColor={'white'}
                />
              </Box>

              {/* Tekst */}
              <Text fontSize="lg">
                Ekspert po znalezieniu twojego ogłoszenia przejdzie do wnikliwej
                analizy przedmiotu a następnie doda swoją wycenę.
              </Text>
            </Box>

            {/* Krok 3 */}
            <Box
              flex={1}
              border="1px solid"
              borderColor="gray.600"
              borderRadius="lg"
              p={6}
              backgroundColor={'#444444'}
              textAlign="center"
            >
              {/* Tytuł */}
              <Heading as="h2" fontSize={'18px'} mb={4}>
                4. Napisz do eksperta
              </Heading>

              {/* Obrazek */}
              <Box mb={4}>
                <Image
                  src="/chat.png" // Ścieżka względem folderu public
                  alt="Otrzymaj wycenę"
                  borderRadius="lg"
                  maxW="100%"
                  height="auto"
                  mx="auto"
                  bgColor={'white'}
                />
              </Box>

              {/* Tekst */}
              <Text fontSize="lg">
                W razie wątpliwości skorzystaj z możliwości wysłania wiadomości
                do eksperta z prośbą o dokładniejsze wyjaśnienie czynników,
                które wpłynęły na wycenę.
              </Text>
            </Box>
          </Flex>

          {/* Ciekawostki */}
          <Box mt={20} textAlign="center">
            <Heading as="h2" fontSize="20px" mb={6}>
              Dlaczego warto wycenić przedmiot z Antique Value?
            </Heading>
            <VStack spacing={6} maxW="800px" mx="auto">
              <Text fontSize="14px">
                🏆 Nasi eksperci mają wieloletnie doświadczenie w wycenie
                antyków i przedmiotów kolekcjonerskich.
              </Text>
              <Text fontSize="14px">
                ⏱ Szybka i profesjonalna obsługa – wycena w ciągu 24 godzin.
              </Text>
              <Text fontSize="14px">
                💡 Bezpłatne porady dotyczące sprzedaży przedmiotów.
              </Text>
            </VStack>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default JakDziała;
