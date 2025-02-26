import './MostViewed.css';
import BlurText from '../../ui/blur-text';
import { useState, useEffect } from 'react';
import { Grid, GridItem, Flex, Image, Box, Spinner } from '@chakra-ui/react'; // Dodany Spinner dla ładowania
import { useNavigate } from 'react-router-dom';

const MostViewed = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Stan ładowania
  const navigate = useNavigate();

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  useEffect(() => {
    fetchUserNotes();
  }, []);

  const fetchUserNotes = async () => {
    try {
      const response = await fetch('http://localhost:10000/entries', {
        method: 'GET' // Metoda GET bez potrzeby tokenu
      });

      if (!response.ok) throw new Error('Błąd pobierania notatek');

      const data = await response.json();
      const sortedData = data.sort((a, b) => b.views - a.views); // Sortowanie po views
      const topNineEntries = sortedData.slice(0, 9); // Pobranie tylko pierwszych 9 elementów
      setEntries(topNineEntries);
      setLoading(false); // Po załadowaniu danych ustawiamy stan ładowania na false
    } catch (error) {
      console.error('Błąd pobierania notatek:', error);
      setError(error.message);
      setLoading(false); // Ustawiamy stan ładowania na false w przypadku błędu
    }
  };

  return (
    <div width="100%" className="categories-container">
      {/* Jeśli wystąpił błąd, wyświetlamy komunikat */}
      {error && <Box color="red.500">Błąd: {error}</Box>}
      <BlurText
        text="Najczęściej oglądane przedmioty"
        delay={50}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        mb={8}
        display="flex"
        flexWrap="nowrap"
        fontSize={'24px'}
      ></BlurText>
      {/* Jeśli dane są w trakcie ładowania, wyświetlamy spinner */}
      {loading ? (
        <Flex justify="center" mt={5}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Grid
          templateColumns={{
            base: '1fr', // 1 column for small screens (base)
            md: 'repeat(2, 1fr)', // 2 columns for medium screens
            lg: 'repeat(3, 1fr)' // 3 columns for large screens
          }}
          gap={10} // Spacing between grid items
          className="heading-container"
          justifyItems={'center'}
          paddingLeft={'200px'}
          paddingRight={'200px'}
          paddingTop={'10px'}
        >
          {/* Jeśli dane są dostępne, wyświetlamy wpisy */}
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <GridItem key={index} className="category-card">
                <Box
                  onClick={() => navigate(`/entry/${entry._id}`)} // Nawigowanie do szczegółów notatki
                  cursor="pointer" // Add pointer cursor for better UX
                >
                  {entry.image && (
                    <Image
                      src={entry.image}
                      alt="Obraz"
                      className="category-image"
                      width={{
                        base: '150px',
                        sm: '200px',
                        md: '250px',
                        lg: '300px'
                      }} // Ensure the image takes full width of the container
                      height={{
                        base: '150px',
                        sm: '200px',
                        md: '250px',
                        lg: '300px'
                      }} // Maintain aspect ratio
                      objectFit="cover" // Ensure the image covers the container
                      borderRadius="md" // Optional: Add rounded corners
                      justifySelf={'center'}
                    />
                  )}
                  <h3 className="category-title">
                    {entry.title || 'Bez tytułu'}
                  </h3>
                  <p className="category-description">
                    {entry.body || 'Brak treści'}
                  </p>
                  <p className="category-description">
                    {entry.price || 'Brak ceny'}
                  </p>
                </Box>
              </GridItem>
            ))
          ) : (
            <GridItem colSpan={{ base: 1, md: 2, lg: 3 }}>
              {' '}
              {/* Span all columns when no entries */}
              <p>Brak dostępnych wpisów.</p>
            </GridItem>
          )}
        </Grid>
      )}
    </div>
  );
};

export default MostViewed;
