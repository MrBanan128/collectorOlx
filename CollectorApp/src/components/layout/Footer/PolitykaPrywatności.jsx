import { Box, Heading, Text, VStack, Link, Separator } from '@chakra-ui/react';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer.jsx';
import { useState, useEffect } from 'react';

const PolitykaPrywatnosci = () => {
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
    <Box backgroundColor={'black'} color={'white'}>
      <Navbar
        background={scrolled ? 'rgba(92, 92, 92,1)' : 'rgba(92, 92, 92,0)'}
        height={scrolled ? '84px' : '80px'}
      />
      <Box maxW="800px" mx="auto" p="9rem 0 3rem 0">
        {/* Szary Box tworzący "kartę" */}
        <Box backgroundColor={'#222222'} borderRadius="lg" p={6}>
          <Heading as="h1" size="xl" mb={5} textAlign="center">
            Polityka Prywatności serwisu Antique Value
          </Heading>

          <VStack align="start" spacing={4}>
            <Section title="§1. Postanowienia ogólne">
              <Text>
                1. Polityka prywatności serwisu <strong>Antique Value</strong>{' '}
                (zwana dalej „Polityką”) określa zasady przetwarzania danych
                osobowych użytkowników.
              </Text>
              <Text>
                2. Administratorem danych osobowych jest{' '}
                <strong>[nazwa firmy lub dane właściciela]</strong>.
              </Text>
              <Text>
                3. Korzystanie z Serwisu oznacza akceptację niniejszej Polityki.
              </Text>
            </Section>

            <Separator variant="solid" my={5} borderColor="gray.600" />

            <Section title="§2. Definicje">
              <Text>
                1. <strong>Dane osobowe</strong> – informacje o zidentyfikowanej
                lub możliwej do zidentyfikowania osobie fizycznej.
              </Text>
              <Text>
                2. <strong>Przetwarzanie danych</strong> – operacje wykonywane
                na danych osobowych, takie jak zbieranie, przechowywanie,
                udostępnianie.
              </Text>
              <Text>
                3. <strong>Użytkownik</strong> – osoba fizyczna, której dane
                dotyczą.
              </Text>
            </Section>

            <Separator variant="solid" my={5} borderColor="gray.600" />

            <Section title="§3. Zakres przetwarzanych danych">
              <Text>
                1. Serwis przetwarza następujące dane osobowe:
                <br />
                - Imię i nazwisko,
                <br />
                - Adres e-mail,
                <br />
                - Numer telefonu,
                <br />- Dane dotyczące przedmiotów poddanych wycenie.
              </Text>
              <Text>
                2. Dane są zbierane w celu realizacji usługi wyceny oraz
                komunikacji z użytkownikiem.
              </Text>
            </Section>

            <Separator variant="solid" my={5} borderColor="gray.600" />

            <Section title="§4. Cele przetwarzania danych">
              <Text>
                1. Przetwarzanie danych odbywa się w celu:
                <br />
                - Realizacji usługi wyceny,
                <br />
                - Kontaktu z użytkownikiem,
                <br />- Wysyłki informacji marketingowych (za zgodą
                użytkownika).
              </Text>
            </Section>

            <Separator variant="solid" my={5} borderColor="gray.600" />

            <Section title="§5. Prawa użytkownika">
              <Text>
                1. Użytkownik ma prawo do:
                <br />
                - Dostępu do swoich danych,
                <br />
                - Sprostowania danych,
                <br />
                - Usunięcia danych,
                <br />- Ograniczenia przetwarzania.
              </Text>
              <Text>
                2. Aby skorzystać z powyższych praw, należy skontaktować się z
                Administratorem.
              </Text>
            </Section>

            <Separator variant="solid" my={5} borderColor="gray.600" />

            <Section title="§6. Bezpieczeństwo danych">
              <Text>
                1. Serwis stosuje odpowiednie środki techniczne i organizacyjne,
                aby zapewnić bezpieczeństwo przetwarzanych danych.
              </Text>
              <Text>
                2. Dane są przechowywane w sposób uniemożliwiający dostęp osób
                nieuprawnionych.
              </Text>
            </Section>

            <Separator variant="solid" my={5} borderColor="gray.600" />

            <Section title="§7. Zmiany w Polityce">
              <Text>
                1. Administrator zastrzega sobie prawo do zmiany Polityki w
                dowolnym czasie.
              </Text>
              <Text>
                2. Zmiany wchodzą w życie po 7 dniach od ich opublikowania na
                stronie Serwisu.
              </Text>
            </Section>

            <Separator variant="solid" colorPalette={'white'} my={5} />

            <Text fontSize="sm" color="gray.500">
              <strong>Data publikacji Polityki Prywatności:</strong> [data]
              <br />
              <strong>Ostatnia aktualizacja:</strong> [data]
            </Text>
          </VStack>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

const Section = ({ title, children }) => (
  <Box>
    <Heading as="h2" size="lg" mb={2}>
      {title}
    </Heading>
    {children}
  </Box>
);

export default PolitykaPrywatnosci;
