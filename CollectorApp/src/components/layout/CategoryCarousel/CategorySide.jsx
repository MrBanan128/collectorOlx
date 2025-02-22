import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Box, Spinner, Image, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CategorySide = () => {
  const { category, subcategory } = useParams(); // Pobieramy parametry kategorii i podkategorii
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Stan ładowania
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntries(); // Pobieramy dane po załadowaniu komponentu
  }, [category, subcategory]); // Odświeżamy dane, gdy zmienia się kategoria lub podkategoria

  const fetchEntries = async () => {
    try {
      const response = await fetch('http://localhost:10000/entries');
      if (!response.ok) throw new Error('Błąd pobierania wpisów');

      const data = await response.json();

      // Filtrujemy dane na podstawie kategorii i podkategorii
      const filteredData = data.filter(entry => {
        const categoryMatch = category ? entry.category === category : true;
        const subcategoryMatch = subcategory ? entry.subcategory === subcategory : true;
        return categoryMatch && subcategoryMatch;
      });

      setEntries(filteredData);
      setLoading(false); // Ustawiamy stan ładowania na false po pobraniu danych
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
      setError(error.message);
      setLoading(false); // Ustawiamy stan ładowania na false w przypadku błędu
    }
  };

  return (
    <Box mt={5} width="100%">
      <h3>Wpisy:</h3>

      {/* Przycisk Powrót */}
      <Button onClick={() => navigate(-1)} colorScheme="teal" mb={4}>
        Powrót
      </Button>

      {/* Jeśli wystąpił błąd, wyświetlamy komunikat */}
      {error && <Box color="red.500">Błąd: {error}</Box>}

      {/* Jeśli dane są w trakcie ładowania, wyświetlamy spinner */}
      {loading ? (
        <Flex justify="center" mt={5}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box>
          {/* Jeśli dane są dostępne, wyświetlamy wpisy */}
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <Box key={index} border="1px solid #ccc" padding="10px" marginBottom="10px">
                <Box
                  _hover={{ background: "#f0f0f0", cursor: "pointer" }}
                  onClick={() => navigate(`/entry/${entry._id}`)} // Nawigowanie do szczegółów notatki
                >
                  <h4>{entry.title || 'Bez tytułu'}</h4>
                  <p>{entry.body || 'Brak treści'}</p>
                  <p>{entry.price || 'Brak ceny'}</p>
                  {entry.image && <Image src={entry.image} alt="Obraz" width="100px" />}
                </Box>
              </Box>
            ))
          ) : (
            <p>Brak dostępnych wpisów.</p>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CategorySide;


