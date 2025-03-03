import { Box, Heading, Text, VStack, Link, Separator } from '@chakra-ui/react';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer.jsx';
import { useState, useEffect } from 'react';

const Regulamin = () => {
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
      <Box maxW="800px" mx="auto" p="9rem 0rem 3rem 0rem">
        <Box backgroundColor={'#222222'} borderRadius="lg" p={6}>
          <Heading as="h1" size="xl" mb={5} textAlign="center">
            Regulamin serwisu Antique Value
          </Heading>

          <VStack align="start" spacing={4}>
            <Section title="§1. Postanowienia ogólne">
              <Text>
                1. Serwis internetowy <strong>Antique Value</strong> (zwany
                dalej „Serwisem”) umożliwia użytkownikom wycenę przedmiotów
                poprzez ocenę ekspertów.
              </Text>
              <Text>
                2. Właścicielem i operatorem Serwisu jest{' '}
                <strong>[nazwa firmy lub dane właściciela]</strong>.
              </Text>
              <Text>
                3. Korzystanie z Serwisu jest dobrowolne i oznacza akceptację
                niniejszego regulaminu.
              </Text>
              <Text>
                4. Regulamin określa zasady korzystania z Serwisu, w tym
                procedurę wyceny przedmiotów, prawa i obowiązki użytkowników
                oraz zasady ochrony danych osobowych.
              </Text>
            </Section>

            <Separator variant="solid" my={5} borderColor="gray.600" />

            <Section title="§2. Definicje">
              <Text>
                1. <strong>Użytkownik</strong> – osoba fizyczna, która korzysta
                z Serwisu.
              </Text>
              <Text>
                2. <strong>Ekspert</strong> – osoba posiadająca kwalifikacje i
                doświadczenie w dziedzinie wyceny przedmiotów, zatrudniona lub
                współpracująca z Serwisem.
              </Text>
              <Text>
                3. <strong>Przedmiot</strong> – rzecz materialna, która podlega
                wycenie przez ekspertów Serwisu.
              </Text>
              <Text>
                4. <strong>Wycena</strong> – opinia eksperta dotycząca
                szacunkowej wartości rynkowej Przedmiotu.
              </Text>
            </Section>

            <Separator variant="solid" my={5} />

            <Section title="§3. Zasady korzystania z Serwisu">
              <Text>
                1. Użytkownik może zgłosić Przedmiot do wyceny poprzez formularz
                dostępny na stronie Serwisu.
              </Text>
              <Text>
                2. Użytkownik zobowiązany jest do podania dokładnych i
                rzetelnych informacji dotyczących Przedmiotu, w tym jego opisu,
                stanu zachowania oraz ewentualnej historii.
              </Text>
              <Text>
                3. Użytkownik może przesłać zdjęcia Przedmiotu w celu ułatwienia
                oceny przez eksperta.
              </Text>
              <Text>
                4. Serwis zastrzega sobie prawo do odmowy wyceny Przedmiotu,
                jeśli uzna, że nie spełnia on wymagań określonych w regulaminie
                lub jeśli jego wycena wykracza poza zakres kompetencji
                ekspertów.
              </Text>
            </Section>

            <Separator variant="solid" my={5} />

            <Section title="§4. Procedura wyceny">
              <Text>
                1. Po otrzymaniu zgłoszenia, ekspert dokonuje wstępnej oceny
                Przedmiotu na podstawie dostarczonych informacji i zdjęć.
              </Text>
              <Text>
                2. W przypadku konieczności dodatkowej weryfikacji, Serwis może
                poprosić Użytkownika o dostarczenie dodatkowych informacji lub
                zdjęć.
              </Text>
              <Text>
                3. Wycena zostanie przekazana Użytkownikowi w formie pisemnej
                (np. e-mail) w terminie określonym przez Serwis (zwykle do 7 dni
                roboczych od momentu zgłoszenia).
              </Text>
              <Text>
                4. Wycena ma charakter informacyjny i nie stanowi oferty
                handlowej ani dokumentu prawnego.
              </Text>
            </Section>

            <Separator variant="solid" my={5} />

            <Section title="§5. Opłaty">
              <Text>
                1. Wycena Przedmiotu może być płatna lub bezpłatna, w zależności
                od rodzaju usługi wybranej przez Użytkownika.
              </Text>
              <Text>
                2. Szczegółowe informacje dotyczące opłat znajdują się w cenniku
                dostępnym na stronie Serwisu.
              </Text>
              <Text>
                3. Opłaty za wycenę są bezzwrotne, nawet jeśli Użytkownik nie
                zgadza się z wynikiem wyceny.
              </Text>
            </Section>

            <Separator variant="solid" my={5} />

            <Section title="§6. Odpowiedzialność">
              <Text>
                1. Serwis dokłada wszelkich starań, aby wyceny były rzetelne i
                dokładne, jednak nie ponosi odpowiedzialności za ewentualne
                różnice między wyceną a rzeczywistą wartością rynkową
                Przedmiotu.
              </Text>
              <Text>
                2. Użytkownik ponosi pełną odpowiedzialność za podanie
                nieprawdziwych lub niekompletnych informacji dotyczących
                Przedmiotu.
              </Text>
              <Text>
                3. Serwis nie ponosi odpowiedzialności za szkody wynikłe z
                korzystania z wyceny w celach handlowych lub prawnych.
              </Text>
            </Section>

            <Separator variant="solid" my={5} />

            <Section title="§7. Ochrona danych osobowych">
              <Text>
                1. Administratorem danych osobowych Użytkowników jest właściciel
                Serwisu.
              </Text>
              <Text>
                2. Dane osobowe Użytkowników są przetwarzane wyłącznie w celu
                realizacji usługi wyceny oraz w zakresie wymaganym przez
                przepisy prawa.
              </Text>
              <Text>
                3. Szczegółowe informacje dotyczące przetwarzania danych
                osobowych znajdują się w{' '}
                <Link href="/policy" color="teal.500">
                  Polityce Prywatności
                </Link>{' '}
                dostępnej na stronie Serwisu.
              </Text>
            </Section>

            <Separator variant="solid" my={5} />

            <Section title="§8. Postanowienia końcowe">
              <Text>
                1. Regulamin wchodzi w życie z dniem jego opublikowania na
                stronie Serwisu.
              </Text>
              <Text>
                2. Właściciel Serwisu zastrzega sobie prawo do zmiany regulaminu
                w dowolnym czasie. Zmiany wchodzą w życie po 7 dniach od ich
                opublikowania na stronie.
              </Text>
              <Text>
                3. W sprawach nieuregulowanych niniejszym regulaminem mają
                zastosowanie przepisy prawa polskiego.
              </Text>
            </Section>

            <Separator variant="solid" colorPalette={'white'} my={5} />

            <Text fontSize="sm" color="gray.500">
              <strong>Data publikacji regulaminu:</strong> [data]
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

export default Regulamin;
