import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Spinner, Image, Text } from "@chakra-ui/react";

const CategorySide = () => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  
  const [allEntries, setAllEntries] = useState([]);  // Wszystkie wpisy z backendu
  const [visibleEntries, setVisibleEntries] = useState([]); // Te, które widzi użytkownik
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);  // Ile już pokazano

  const limit = 10; // Po ile dodajemy

  useEffect(() => {
    loadAllEntries();
  }, [category, subcategory]);

  const loadAllEntries = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:10000/entries/category?category=${category || ""}&subcategory=${subcategory || ""}`
      );
      const data = await response.json();

      if (!data.notes) {
        setAllEntries([]);
        setVisibleEntries([]);
        return;
      }

      setAllEntries(data.notes);
      setVisibleEntries(data.notes.slice(0, limit)); // Pokazujemy pierwsze 5
      setOffset(limit); // Aktualizujemy offset
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
      setAllEntries([]);
      setVisibleEntries([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextEntries = allEntries.slice(offset, offset + limit); // Pobieramy kolejne 5
    setVisibleEntries((prev) => [...prev, ...nextEntries]); // Dodajemy do wyświetlanych
    setOffset((prev) => prev + limit); // Zwiększamy offset
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Lista wpisów</Text>

      {loading && <Spinner size="lg" />}
      {!loading && visibleEntries.length === 0 && <Text>Brak wpisów do wyświetlenia.</Text>}

      {visibleEntries.map((entry) => (
        <Box key={entry._id || entry.id} border="1px solid #ccc" padding="10px" marginBottom="10px">
          <Box onClick={() => navigate(`/entry/${entry._id || entry.id}`)}>
            <h4>{entry.title || 'Bez tytułu'}</h4>
            <p>{entry.body || 'Brak treści'}</p>
            <p>{entry.price || 'Brak ceny'}</p>
            {entry.image && <Image src={entry.image} alt="Obraz" width="100px" />}
          </Box>
        </Box>
      ))}

      {offset < allEntries.length && (
        <Button onClick={loadMore} colorScheme="blue" mt={4}>
          Pokaż więcej
        </Button>
      )}
    </Box>
  );
};

export default CategorySide;




