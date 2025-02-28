import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Spinner, Image, Text, Flex, AbsoluteCenter } from "@chakra-ui/react";
import Navbar from '../Navbar/Navbar';

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
   
     <Box height={"100vh"}>
         {/* <Logo/> */}
        <Navbar background="rgba(92, 92, 92,0)" height={"100%"}   
        width={"10%"} direction={"column"} position={"relative"} MainDirection={'column'}/>
    

    <Box  width="100%"  p="12rem 10rem 8rem 15rem" > 
     
    <Text fontSize="2.5rem" fontWeight="bold" mb={0}>
      Wyświetlone ogłoszenia: {visibleEntries.length} / {allEntries.length}
    </Text>

      {loading && <Spinner size="lg" />}
      {!loading && visibleEntries.length === 0 && <Text>Brak wpisów do wyświetlenia.</Text>}
     <Box height={"72vh"} overflow={"auto"}>
      {visibleEntries.map((entry) => (
        <Box key={entry._id || entry.id} border="1px solid #ccc" padding="10px" marginBottom="10px">
          <Box onClick={() => navigate(`/entry/${entry._id || entry.id}`)}            >
            <Flex>
            {entry.image && 
            <Image src={entry.image} alt="Obraz" 
            className="category-image"
            width={{ base: '350px', sm: '200px', md: '250px', lg: '300px'}} // Ensure the image takes full width of the container
            height={{ base: '350px', sm: '200px', md: '250px', lg: '300px' }} // Maintain aspect ratio
            padding={{base:'0'}}
            objectFit="cover" // Ensure the image covers the container
            borderRadius="md" // Optional: Add rounded corners
            justifySelf={'center'}
            />}
            <Box>
            <h2>{entry.title || 'Bez tytułu'}</h2>
            <p>{entry.body || 'Brak treści'}</p>
            <p>{entry.price || 'Brak ceny'}</p>
            </Box>
            </Flex>
          </Box>
        </Box>
      ))}
    </Box>
      {offset < allEntries.length && (
        <Button onClick={loadMore} colorScheme="blue" mt={4} position="absolute">
          Pokaż więcej
        </Button>
      )}   
    </Box>
        </Box>
   
  );
};

export default CategorySide;




