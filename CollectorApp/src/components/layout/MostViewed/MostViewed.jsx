import './MostViewed.css';
import BlurText from '../../ui/blur-text';
import { useState, useEffect } from 'react';
import {
  Grid,
  GridItem,
  Flex,
  Image,
  Box,
  Spinner,
  Text
} from '@chakra-ui/react'; // Dodany Spinner dla ładowania
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

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
      const topNineEntries = sortedData.slice(0, 12); // Pobranie tylko pierwszych 9 elementów
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
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)', // 3 columns for medium screens
            lg: 'repeat(4, 1fr)' // 4 columns for large screens
          }}
          gap={6} // Spacing between grid items
          className="heading-container"
          justifyItems={'center'}
          p={'5rem 5%'}
        >
          {/* Jeśli dane są dostępne, wyświetlamy wpisy */}
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <GridItem
                key={index}
                className="category-card"
                height={{
                  base: '300px',
                  sm: '300px',
                  md: '300px',
                  lg: '350px'
                }}
              >
                <Box
                  onClick={() => navigate(`/entry/${entry._id}`)} // Nawigowanie do szczegółów notatki
                  cursor="pointer" // Add pointer cursor for better UX
                >
                  <Box position={'relative'}>
                    {entry.expertEvaluation?.expertMessage && (
                      <Flex
                        color={'#ffffff'}
                        fontSize={'1.2rem'}
                        fontWeight={'600'}
                        position={'absolute'}
                        background={'red'}
                        bottom={0}
                        minWidth={'150px'}
                        left={50}
                        p={'.2rem 2rem'}
                        clipPath={
                          'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 10% 50%)'
                        }
                      >
                        <Text mr={3}>Wycenione</Text>
                        <Text>
                          {entry.expertEvaluation.expertPrice !== null
                            ? `${entry.expertEvaluation.expertPrice} zł`
                            : ''}
                        </Text>
                      </Flex>
                    )}
                    {entry.image && (
                      <Image
                        src={entry.image}
                        alt="Obraz"
                        className="category-image"
                        width={{
                          base: '250px',
                          sm: '250px',
                          md: '250px',
                          lg: '300px'
                        }} // Ensure the image takes full width of the container
                        height={{
                          base: '150px',
                          sm: '150px',
                          md: '150px',
                          lg: '200px'
                        }} // Maintain aspect ratio
                        objectFit="cover" // Ensure the image covers the container
                        borderRadius="md" // Optional: Add rounded corners
                        justifySelf={'center'}
                      />
                    )}
                  </Box>

                  <Flex
                    direction={'column'}
                    justifyContent={'space-between'}
                    minHeight={'140px'}
                    p={'10px 20px'}
                  >
                    <Box>
                      {/* <h2 className="category-title">
                        {entry.title || 'Bez tytułu'}
                      </h2> */}
                      <h4
                        className="category-description"
                        style={{ maxHeight: '55px' }}
                      >
                        {entry.body || 'Bez tytułu'}
                      </h4>
                      <h4
                        className="category-description"
                        style={{
                          fontSize: '1.8rem',
                          fontWeight: '700',
                          margin: '.5rem 0'
                        }}
                      >
                        {entry.price + ' zł' || 'Brak ceny'}
                      </h4>
                    </Box>

                    <Box fontSize={'1.6rem'} textAlign={'left'}>
                      Dodano:
                      {entry.createdAt
                        ? format(
                            new Date(entry.createdAt),
                            '  yyyy-MM-dd HH:mm'
                          )
                        : 'Brak daty'}
                    </Box>
                  </Flex>
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
