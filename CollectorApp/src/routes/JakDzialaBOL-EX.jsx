import { Flex, Text } from '@chakra-ui/react';

const JakDzialaBOLEX = () => {
  return (
    <Flex
      direction={'column'}
      paddingTop={5}
      gap={20}
      paddingBottom={5}
      paddingLeft={10}
    >
      <Flex direction={'column'} gap={2}>
        <Flex justify={'center'} paddingBottom={20}>
          <Text fontSize={20} fontWeight={'bold'}>
            JAK DZIAŁA SERWIS BOL-EX?
          </Text>
        </Flex>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§1. Rejestracja i logowanie</Text>
        </Flex>
        <Text>
          1. Aby zacząć korzystać z serwisu, musisz się zarejestrować. Kliknij
          przycisk **„Zarejestruj się”** i podaj wymagane dane (np. adres
          e-mail, hasło, imię i nazwisko).
        </Text>
        <Text>
          2. Po rejestracji zaloguj się na swoje konto, używając adresu e-mail i
          hasła.
        </Text>
      </Flex>
      <Flex direction={'column'} gap={2}>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§2. Przeglądanie ofert</Text>
        </Flex>
        <Text>
          1. Po zalogowaniu możesz przeglądać dostępne oferty wymiany. Użyj
          wyszukiwarki lub filtrów, aby znaleźć interesujące Cię towary, usługi
          lub umiejętności.
        </Text>
        <Text>
          2. Każda oferta zawiera opis, zdjęcia (jeśli są dostępne) oraz
          informacje o tym, czego oczekuje druga strona w zamian.
        </Text>
      </Flex>
      <Flex direction={'column'} gap={2}>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§3. Dodawanie własnych ofert</Text>
        </Flex>
        <Text>
          1. Jeśli chcesz coś zaoferować, kliknij przycisk **„Dodaj ofertę”**.
          Wypełnij formularz, podając:
        </Text>
        <Flex paddingLeft={10} direction={'column'} paddingBottom={2}>
          <Text>- tytuł oferty,</Text>
          <Text>- szczegółowy opis,</Text>
          <Text>- zdjęcia (opcjonalnie),</Text>
          <Text>- informacje o tym, co chcesz otrzymać w zamian.</Text>
        </Flex>
        <Text>
          2. Twoja oferta zostanie opublikowana i będzie widoczna dla innych
          użytkowników.
        </Text>
      </Flex>
      <Flex direction={'column'} gap={2}>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§4. Kontakt z innymi użytkownikami</Text>
        </Flex>
        <Text>
          1. Jeśli znajdziesz ofertę, która Cię interesuje, skontaktuj się z jej
          autorem poprzez wiadomość prywatną w Serwisie.
        </Text>
        <Text>
          2. Ustal szczegóły wymiany, np. sposób dostarczenia towaru lub termin
          realizacji usługi.
        </Text>
      </Flex>
      <Flex direction={'column'} gap={2}>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§5. Realizacja wymiany</Text>
        </Flex>
        <Text>
          1. Po uzgodnieniu warunków wymiany, zrealizuj transakcję zgodnie z
          ustaleniami.
        </Text>
        <Text>
          2. Pamiętaj, że Serwis **BOL-EX** nie uczestniczy w transakcjach –
          odpowiedzialność za przebieg wymiany spoczywa na użytkownikach.
        </Text>
      </Flex>
      <Flex direction={'column'} gap={2}>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§6. Ocena i opinie</Text>
        </Flex>
        <Text>
          1. Po zakończonej wymianie możesz wystawić opinię drugiej stronie. To
          pomoże innym użytkownikom w podejmowaniu decyzji.
        </Text>
      </Flex>
      <Flex direction={'column'} gap={2}>
        <Flex justify={'center'} paddingBottom={5}>
          <Text fontWeight={'bold'}>§7. Zarządzanie kontem</Text>
        </Flex>
        <Text>
          1. W swoim profilu możesz edytować dane, przeglądać historię wymian
          oraz zarządzać aktywnymi ofertami.
        </Text>
      </Flex>
    </Flex>
  );
};

export default JakDzialaBOLEX;
