import Footer from '../components/layout/Footer/Footer';
import Navbar from '../components/layout/Navbar/Navbar';
import { Flex, Text } from '@chakra-ui/react';

const PolitykaPrywatnosci = () => {
  return (
    <Flex direction={'column'}>
      <Navbar />
      <Flex
        paddingTop={5}
        gap={20}
        paddingBottom={5}
        paddingLeft={10}
        direction={'column'}
      >
        <Flex direction={'column'} gap={2} paddingTop={40}>
          <Flex justify={'center'} paddingBottom={20}>
            <Text fontSize={20} fontWeight={'bold'}>
              POLITYKA PRYWATNOŚCI SERWISU BOL-EX
            </Text>
          </Flex>
          <Flex justify={'center'} paddingBottom={5}>
            <Text fontWeight={'bold'}>§1. Postanowienia ogólne</Text>
          </Flex>
          <Text>
            1. Niniejsza Polityka Prywatności określa zasady przetwarzania i
            ochrony danych osobowych użytkowników serwisu BOL-EX (zwanego dalej
            „Serwisem”).
          </Text>
          <Text>
            2. Administratorem danych osobowych jest [nazwa firmy], z siedzibą
            pod adresem [adres], NIP: [numer NIP], REGON: [numer REGON].
          </Text>
          <Text>
            3. Kontakt z Administratorem możliwy jest pod adresem e-mail: [adres
            e-mail] lub telefonicznie pod numerem [numer telefonu].
          </Text>
        </Flex>
        <Flex direction={'column'}>
          <Flex justify={'center'} paddingBottom={5}>
            <Text fontWeight={'bold'}>§2. Zakres zbieranych danych</Text>
          </Flex>
          <Text>
            1. Serwis zbiera dane osobowe niezbędne do świadczenia usług, w tym:
          </Text>
          <Flex paddingLeft={5} direction={'column'} paddingBottom={2}>
            <Text>- imię i nazwisko,</Text>
            <Text>- adres e-mail,</Text>
            <Text>- numer telefonu (opcjonalnie),</Text>
            <Text>- adres zamieszkania (w przypadku wymiany towarów),</Text>
            <Text>- inne dane podane dobrowolnie przez użytkownika.</Text>
          </Flex>
          <Text>
            2. Serwis może również zbierać dane techniczne, takie jak adres IP,
            typ przeglądarki, czas korzystania z Serwisu czy informacje o
            urządzeniu.
          </Text>
        </Flex>
        <Flex direction={'column'}>
          <Flex justify={'center'} paddingBottom={5}>
            <Text fontWeight={'bold'}>§3. Cel przetwarzania danych</Text>
          </Flex>
          <Text>1. Dane osobowe są przetwarzane w celu:</Text>
          <Flex paddingLeft={5} direction={'column'} paddingBottom={2}>
            <Text>- umożliwienia korzystania z usług Serwisu,</Text>
            <Text>- realizacji wymian barterowych,</Text>
            <Text>- kontaktu z użytkownikami,</Text>
            <Text>- zapewnienia bezpieczeństwa usług,</Text>
            <Text>
              - wysyłki informacji marketingowych (za zgodą użytkownika).
            </Text>
          </Flex>
          <Text>
            2. Dane techniczne są zbierane w celu poprawy funkcjonalności
            Serwisu oraz analizy ruchu na stronie.
          </Text>
        </Flex>
        <Flex direction={'column'}>
          <Flex justify={'center'} paddingBottom={5}>
            <Text fontWeight={'bold'}>§4. Prawa użytkowników</Text>
          </Flex>
          <Text>1. Użytkownik ma prawo do:</Text>
          <Flex paddingLeft={5} direction={'column'} paddingBottom={2}>
            <Text>- dostępu do swoich danych,</Text>
            <Text>- sprostowania danych,</Text>
            <Text>- usunięcia danych („prawo do bycia zapomnianym”),</Text>
            <Text>- ograniczenia przetwarzania,</Text>
            <Text>- przenoszenia danych,</Text>
            <Text>- wniesienia sprzeciwu wobec przetwarzania.</Text>
          </Flex>
          <Text>
            2. Aby skorzystać z powyższych praw, należy skontaktować się z
            Administratorem.
          </Text>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default PolitykaPrywatnosci;
