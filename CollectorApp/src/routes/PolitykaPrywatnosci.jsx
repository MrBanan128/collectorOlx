import { Flex, Text } from '@chakra-ui/react';

const PolitykaPrywatnosci = () => {
  return (
    <Flex direction={'column'}>
      <Flex>
        <Text>POLITYKA PRYWATNOŚCI SERWISU BOL-EX</Text>
        <Text>§1. Postanowienia ogólne</Text>
        <Text>
          1. Niniejsza Polityka Prywatności określa zasady przetwarzania i
          ochrony danych osobowych użytkowników serwisu BOL-EX (zwanego dalej
          „Serwisem”).
        </Text>
        <Text>
          2. Administratorem danych osobowych jest [nazwa firmy lub podmiotu], z
          siedzibą pod adresem [adres], NIP: [numer NIP], REGON: [numer REGON].
        </Text>
        <Text>
          3. Kontakt z Administratorem możliwy jest pod adresem e-mail: [adres
          e-mail] lub telefonicznie pod numerem [numer telefonu].
        </Text>
      </Flex>
      <Flex>
        <Text>§2. Zakres zbieranych danych</Text>
        <Text>
          1. Serwis zbiera dane osobowe niezbędne do świadczenia usług, w tym:
          imię i nazwisko, adres e-mail, numer telefonu, adres zamieszkania (w
          przypadku wymiany towarów).
        </Text>
        <Text>
          2. Serwis może także zbierać dane techniczne, takie jak adres IP, typ
          przeglądarki czy informacje o urządzeniu.
        </Text>
      </Flex>
      <Flex>
        <Text>§3. Cel przetwarzania danych</Text>
        <Text>
          1. Dane osobowe są przetwarzane w celu realizacji usług Serwisu, w tym
          umożliwienia wymian barterowych, kontaktu z użytkownikami i
          zapewnienia bezpieczeństwa.
        </Text>
        <Text>
          2. Dane techniczne są zbierane w celu analizy ruchu oraz poprawy
          funkcjonalności Serwisu.
        </Text>
      </Flex>
      <Flex>
        <Text>§4. Prawa użytkowników</Text>
        <Text>
          1. Użytkownik ma prawo dostępu do swoich danych, ich sprostowania,
          usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz
          wniesienia sprzeciwu wobec przetwarzania.
        </Text>
        <Text>
          2. Aby skorzystać z tych praw, użytkownik może skontaktować się z
          Administratorem.
        </Text>
      </Flex>
      <Flex>
        <Text>§5. Pliki cookies</Text>
        <Text>
          1. Serwis wykorzystuje pliki cookies do analizy ruchu oraz poprawy
          funkcjonalności.
        </Text>
        <Text>
          2. Użytkownik może zarządzać ustawieniami cookies w swojej
          przeglądarce.
        </Text>
      </Flex>
      <Flex>
        <Text>§6. Bezpieczeństwo danych</Text>
        <Text>
          1. Administrator stosuje odpowiednie środki techniczne i organizacyjne
          w celu ochrony danych osobowych użytkowników.
        </Text>
      </Flex>
      <Flex>
        <Text>§7. Zmiany w Polityce Prywatności</Text>
        <Text>
          1. Administrator zastrzega sobie prawo do zmiany Polityki Prywatności.
          Informacje o zmianach będą publikowane w Serwisie.
        </Text>
        <Text>
          2. Korzystanie z Serwisu po zmianach oznacza ich akceptację.
        </Text>
      </Flex>
      <Flex>
        <Text>§8. Postanowienia końcowe</Text>
        <Text>
          1. W sprawach nieuregulowanych niniejszą Polityką Prywatności
          zastosowanie mają przepisy prawa polskiego oraz RODO.
        </Text>
        <Text>2. Polityka wchodzi w życie z dniem [data wejścia w życie].</Text>
      </Flex>
    </Flex>
  );
};

export default PolitykaPrywatnosci;
