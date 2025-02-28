import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Spinner, Image, Text, Flex } from "@chakra-ui/react";
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer";

const CategorySide = () => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const [allEntries, setAllEntries] = useState([]);
  const [visibleEntries, setVisibleEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const limit = 10;

  useEffect(() => {
    loadAllEntries();
  }, [category, subcategory]);

  const loadAllEntries = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:10000/entries/category?category=${category || ''}&subcategory=${subcategory || ''}`
      );
      const data = await response.json();

      if (!data.notes) {
        setAllEntries([]);
        setVisibleEntries([]);
        return;
      }

      setAllEntries(data.notes);
      setVisibleEntries(data.notes.slice(0, limit));
      setOffset(limit);
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
      setAllEntries([]);
      setVisibleEntries([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextEntries = allEntries.slice(offset, offset + limit);
    setVisibleEntries((prev) => [...prev, ...nextEntries]);
    setOffset((prev) => prev + limit);
  };

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

  // Grupowanie wpisów według subkategorii
  const groupedEntries = visibleEntries.reduce((acc, entry) => {
    const sub = entry.subcategory || "Inne";
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(entry);
    return acc;
  }, {});

  return (
    <Box minHeight={"100vh"}>
      <Navbar 
        background={scrolled ? 'rgba(92, 92, 92,1)' : 'rgba(92, 92, 92,0)'}
        height={scrolled ? '84px' : '80px'}
      />

      <Box width="100%" p="12rem 10rem 8rem 15rem"> 
      {allEntries.length > 0 && (
  <Text fontSize="2.5rem" fontWeight="bold" mb={4}>
    Wyświetlone ogłoszenia: {visibleEntries.length} / {allEntries.length}
  </Text>
)}

        {loading && <Spinner size="lg" />}
        {!loading && visibleEntries.length === 0 && <Text>Brak wpisów do wyświetlenia.</Text>}

        {/* Wyświetlanie wpisów podzielonych na subkategorie */}
        {Object.keys(groupedEntries).map((sub) => (
          <Box key={sub} border="2px solid gray" borderRadius="md" p={4} mb={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={2}>{sub}</Text>


            <Flex>
            {groupedEntries[sub].map((entry) => (
              <Box key={entry._id || entry.id} border="1px solid #ccc" p={3} mb={3}>
                <Box onClick={() => navigate(`/entry/${entry._id || entry.id}`)}>
                  <Flex>
                    {entry.image && (
                      <Image 
                        src={entry.image} 
                        alt="Obraz" 
                        width={{ base: '350px', sm: '200px', md: '250px', lg: '300px'}}
                        height={{ base: '350px', sm: '200px', md: '250px', lg: '300px' }}
                        objectFit="cover" 
                        borderRadius="md" 
                      />
                    )}
                    <Box ml={3}>
                      <Text fontSize="xl" fontWeight="bold">{entry.title || 'Bez tytułu'}</Text>
                      <Text>{entry.body || 'Brak treści'}</Text>
                      <Text fontWeight="bold">{entry.price || 'Brak ceny'}</Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            ))}
            </Flex>


          </Box>
        ))}

        {offset < allEntries.length && (
          <Button onClick={loadMore} colorScheme="blue" mt={4} position="absolute">
            Pokaż więcej
          </Button>
        )}   
      </Box> 
      
      <Footer/>
    </Box>
  );
};

export default CategorySide;








