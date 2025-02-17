import { Flex, Text } from '@chakra-ui/react';

const Regulamin = () => {
  return (
    <Flex
      direction={'column'}
      paddingTop={5}
      gap={20}
      paddingBottom={5}
      paddingLeft={10}
    >
      <Flex direction={'column'}>
        <Flex justify={'center'} paddingBottom={20}>
          <Text fontSize={20} fontWeight={'bold'}>
            REGULAMIN SERWISU BARTEROWEGO BOL-EX
          </Text>
        </Flex>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§1. Postanowienia ogólne</Text>
        </Flex>
        <Text>
          1.Niniejszy regulamin określa zasady korzystania z serwisu barterowego
          bol-ex (zwany dalej „Serwisem”).
        </Text>
        <Text>
          2.Serwis umożliwia użytkownikom wymianę dóbr, usług lub umiejętności
          na zasadzie barteru, bez użycia środków pieniężnych.
        </Text>
        <Text>
          3.Korzystanie z Serwisu jest równoznaczne z akceptacją niniejszego
          regulaminu.
        </Text>
      </Flex>
      <Flex direction={'column'}>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§2. Warunki korzystania z Serwisu</Text>
        </Flex>
        <Text>
          1.Użytkownikiem Serwisu może być osoba fizyczna posiadająca pełną
          zdolność do czynności prawnych lub osoba prawna.
        </Text>
        <Text>
          2.Rejestracja w Serwisie jest dobrowolna, ale konieczna do dokonywania
          wymian.
        </Text>
        <Text>
          3.Użytkownik zobowiązuje się do podania prawdziwych i aktualnych
          danych podczas rejestracji.
        </Text>
      </Flex>
      <Flex direction={'column'}>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§3. Zasady wymiany barterowej</Text>
        </Flex>
        <Text>
          1.Wymiana w Serwisie odbywa się na zasadzie bezgotówkowej –
          użytkownicy wymieniają się dobrami, usługami lub umiejętnościami.
        </Text>
        <Text>
          2.Oferty zamieszczane w Serwisie muszą być zgodne z prawem oraz
          zasadami współżycia społecznego.
        </Text>
        <Text>
          3.Zabronione jest zamieszczanie ofert dotyczących towarów lub usług
          niezgodnych z prawem, niebezpiecznych lub naruszających prawa osób
          trzecich.
        </Text>
      </Flex>
      <Flex direction={'column'}>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§4. Odpowiedzialność użytkowników</Text>
        </Flex>
        <Text>
          1.Użytkownik ponosi pełną odpowiedzialność za treść zamieszczanych
          ofert oraz za realizację umów barterowych.
        </Text>
        <Text>
          2.Serwis BOL-EX nie jest stroną w transakcjach barterowych i nie
          ponosi odpowiedzialności za ich przebieg lub ewentualne spory między
          użytkownikami.
        </Text>
        <Text>
          3.Użytkownicy zobowiązują się do rozstrzygania ewentualnych sporów
          polubownie.
        </Text>
      </Flex>
      <Flex direction={'column'}>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§5. Bezpieczeństwo i ochrona danych</Text>
        </Flex>
        <Text>
          1.Serwis BOL-EX zobowiązuje się do ochrony danych osobowych
          użytkowników zgodnie z obowiązującymi przepisami prawa, w
          szczególności z RODO.
        </Text>
        <Text>
          2.Użytkownicy zobowiązują się do nieudostępniania swoich danych
          logowania osobom trzecim.
        </Text>
      </Flex>
      <Flex direction={'column'}>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§6. Zmiany w regulaminie</Text>
        </Flex>
        <Text>
          1.Administracja Serwisu zastrzega sobie prawo do zmiany regulaminu. O
          wszelkich zmianach użytkownicy zostaną poinformowani z odpowiednim
          wyprzedzeniem.
        </Text>
        <Text>
          2.Kontynuowanie korzystania z Serwisu po wprowadzeniu zmian oznacza
          ich akceptację.
        </Text>
      </Flex>
      <Flex direction={'column'}>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§7. Postanowienia końcowe</Text>
        </Flex>
        <Text>
          1.Wszelkie sprawy nieuregulowane niniejszym regulaminem będą
          rozstrzygane na podstawie obowiązującego prawa polskiego.
        </Text>
        <Text>
          2.Użytkownicy zobowiązują się do nieudostępniania swoich danych
          logowania osobom trzecim.Regulamin wchodzi w życie z dniem 6 marca
          2025 roku.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Regulamin;
