import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Box, Spinner, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';

const CategorySide = ({ background, height }) => {
  const { category, subcategory } = useParams(); // Get category and subcategory from URL
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntries(); // Fetch data when the component mounts or when category/subcategory changes
  }, [category, subcategory]); // Re-fetch data if category or subcategory changes

  const fetchEntries = async () => {
    try {
      const response = await fetch('http://localhost:10000/entries');
      if (!response.ok) throw new Error('Błąd pobierania wpisów');

      const data = await response.json();

      // Filter data based on category and subcategory
      const filteredData = data.filter((entry) => {
        const categoryMatch = category ? entry.category === category : true;
        const subcategoryMatch = subcategory
          ? entry.subcategory === subcategory
          : true;
        return categoryMatch && subcategoryMatch;
      });

      setEntries(filteredData);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
      setError(error.message);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  return (
    <Flex direction="column" minHeight="100vh" backgroundColor="gray.100">
      {/* Navbar at the top */}
      <Navbar background="rgba(92, 92, 92,1)" height={height} />{' '}
      {/* Customize height and background as needed */}
      {/* Main Content */}
      <Box flex="1" width="100%" p={4} pt={20}>
        {' '}
        {/* Add padding-top to account for the fixed Navbar */}
        {/* Display error message if there's an error */}
        {error && <Box color="red.500">Błąd: {error}</Box>}
        {/* Display spinner while loading */}
        {loading ? (
          <Flex justify="center" mt={5}>
            <Spinner size="xl" />
          </Flex>
        ) : (
          <Box
            maxWidth={['100%', '100%', '1480px']} // Responsive max-width: full width on small screens, 1500px on larger screens
            margin="auto" // Center the box horizontally
          >
            {/* Display entries if available */}
            {entries.length > 0 ? (
              entries.map((entry, index) => (
                <Box
                  key={index}
                  backgroundColor="gray.500"
                  borderRadius="md"
                  boxShadow="md"
                  p={4}
                  mb={4}
                  mt={[50, 100]} // Smaller margin-top on small screens
                  minHeight={['auto', '500px']} // Auto height on small screens, fixed height on larger screens
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between" // Distribute space evenly
                  _hover={{
                    cursor: 'pointer',
                    color: 'blue.400',
                    backgroundColor: 'gray.600',
                    transform: 'scale(1.02)', // Slightly scale up on hover
                    transition: 'transform 0.2s, background-color 0.2s' // Smooth transition
                  }}
                  onClick={() => navigate(`/entry/${entry._id}`)} // Navigate to entry details
                >
                  {/* Item Title and Image */}
                  <Flex
                    direction={['column', 'row']} // Stack vertically on small screens, horizontally on larger screens
                    align="center"
                    gap={6}
                    flex="1"
                  >
                    {/* Title and Image Container */}
                    <Flex
                      direction={'column'}
                      textAlign={'center'}
                      backgroundColor={'black'}
                      rounded={'xl'}
                      gap={4}
                      width={['100%', '350px']} // Full width on small screens, fixed width on larger screens
                      height={['auto', '400px']} // Auto height on small screens, fixed height on larger screens
                      alignItems={'center'}
                      p={4} // Add padding for better spacing
                    >
                      <Text
                        fontWeight="bold"
                        fontSize={['18px', '24px', '26px']}
                        mb={4}
                        color="white" // Ensure text is visible on black background
                      >
                        {entry.title || 'Bez tytułu'}
                      </Text>
                      {/* Item Image */}
                      {entry.image && (
                        <Image
                          src={entry.image}
                          alt="Obraz"
                          width={['100%', '250px', '300px']} // Full width on small screens, fixed width on larger screens
                          height={['auto', '250px', '300px']} // Auto height on small screens, fixed height on larger screens
                          objectFit="contain"
                          borderRadius="md"
                          border="1px solid"
                          borderColor="gray.200"
                          backgroundColor={'white'}
                        />
                      )}
                    </Flex>

                    {/* Item Details */}
                    <Flex
                      direction="column"
                      flex="1"
                      gap={2}
                      backgroundColor={'black'}
                      rounded={'xl'}
                      width={['100%', '350px']} // Full width on small screens, fixed width on larger screens
                      height={['auto', '400px']} // Auto height on small screens, fixed height on larger screens
                      justify={'space-between'}
                      p={4} // Add padding for better spacing
                    >
                      {/* Description */}
                      <Text
                        fontSize={['12px', '14px', '16px']}
                        color="white"
                        m={'10px'}
                      >
                        {entry.body || 'Brak treści'}
                      </Text>

                      {/* Price */}
                      <Text
                        fontWeight="bold"
                        fontSize={['18px', '24px', '28px']}
                        color="green.500"
                        textAlign={'right'}
                        marginRight={'15px'}
                      >
                        {entry.price ? `${entry.price} PLN` : 'Brak ceny'}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              ))
            ) : (
              <Text
                color={'black'}
                paddingTop={'60px'}
                textAlign="center"
                fontWeight={'bold'}
              >
                Brak przedmiotów.
              </Text>
            )}
          </Box>
        )}
      </Box>
      {/* Footer at the bottom */}
      <Footer />
    </Flex>
  );
};

export default CategorySide;
