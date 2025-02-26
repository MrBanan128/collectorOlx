import './MostViewed.css';
import BlurText from '../../ui/blur-text';
import { useState, useEffect } from 'react';
import { Flex, Image, Box, Spinner } from '@chakra-ui/react'; // Dodany Spinner dla ładowania
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
        <div className="grid-container">
          <div className="heading-container">
            {/* Jeśli dane są dostępne, wyświetlamy wpisy */}

            {entries.length > 0 ? (
              entries.map((entry, index) => (
                <div key={index} className="category-card">
                  <Box
                    onClick={() => navigate(`/entry/${entry._id}`)} // Nawigowanie do szczegółów notatki
                  >
                    {entry.image && (
                      <Image
                        src={entry.image}
                        alt="Obraz"
                        className="category-image"
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
                </div>
              ))
            ) : (
              <p>Brak dostępnych wpisów.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MostViewed;
