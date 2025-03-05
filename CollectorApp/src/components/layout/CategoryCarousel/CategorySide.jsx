import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Link, Spinner, Image, Text, Flex } from '@chakra-ui/react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';
import { format } from 'date-fns';
import CategoryImg from '../../../assets/imgCat.webp';
import AnimatedList from './AnimatedList';
import Backgr from '../../../assets/backgrCl.png';

const CategorySide = () => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const [allEntries, setAllEntries] = useState([]);
  const [visibleEntries, setVisibleEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const limit = 20;

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
    const sub = entry.subcategory || 'Inne';
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(entry);
    return acc;
  }, {});

  const backgroundStyle = {
    background: `url(${Backgr}) no-repeat, rgba(28, 33, 43, 1)`,
    backgroundBlendMode: 'overlay',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%', // przykładowa wysokość
    width: '100%',
    boxShadow: '#1c212b 0px -20px 20px 20px'
  };

  return (
    <>
      {Object.keys(groupedEntries).length > 0 ? (
        <Box minHeight={'100vh'}>
          <Navbar
            background={
              scrolled
                ? 'linear-gradient(to bottom, #1e252a 0%, #151c20 100%)'
                : 'rgb(86, 100, 100, 0)'
            }
            height={scrolled ? '84px' : '80px'}
          />

          <Box width="100%" p=" 20rem 10% 20rem 5% " style={backgroundStyle}>
            {/* <Box
              style={backgroundStyle}
              width={'100px'}
              height={'100px'}
              position={'absolut'}
              bottom={0}
            /> */}

            <Box
              width={'100%'}
              minHeight={'100vh'}
              zIndex={0}
              position={'fixed'}
              left={0}
              top={0}
              // backgroundRepeat="no-repeat"
              // backgroundSize="cover"
              // backgroundPosition="center"
            >
              <Image
                src={CategoryImg}
                alt="Obraz"
                width={'100%'}
                objectFit="cover"
                position={'absolute'}
                zIndex={-1}
                filter="brightness(.9)"
              />
              <Box
                // style={backgroundStyle}
                width={'100%'}
                height={'100vh'}
                position={'absolut'}
                bottom={0}
                background={'rgba(28, 33, 43, .7)'}
              />
            </Box>

            {loading && <Spinner size="lg" />}
            {visibleEntries.length === 0 && !loading && (
              <Text>Brak wpisów do wyświetlenia.</Text>
            )}

            {allEntries.length > 0 && (
              <Text
                fontSize="2rem"
                fontWeight="bold"
                position={'relative'}
                zIndex={'1'}
              >
                Wyświetlone ogłoszenia: {visibleEntries.length} /{' '}
                {allEntries.length}
              </Text>
            )}

            {/* Wyświetlanie wpisów podzielonych na subkategorie */}
            {Object.keys(groupedEntries).map((sub) => (
              <Box key={sub} borderRadius="md" p={4}>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  mb={2}
                  position={'relative'}
                  zIndex={'1'}
                  color={' #b7410e'}
                >
                  {sub}
                </Text>
                {/* <Flex direction={subcategory ? "column" : "row"} > */}

                <AnimatedList
                  items={groupedEntries[sub].map((entry) => (
                    <Box
                      key={entry._id || entry.id}
                      height={{
                        base: '250px',
                        sm: '200px',
                        md: '200px',
                        lg: '180px'
                      }}
                    >
                      <Flex
                        onClick={() =>
                          navigate(`/entry/${entry._id || entry.id}`)
                        }
                        position={'relative'}
                        direction={subcategory ? 'row' : 'column'}
                      >
                        <Box
                          width={{
                            base: '350px',
                            sm: '200px',
                            md: '250px',
                            lg: '250px'
                          }}
                          position={'relative'}
                          height={{
                            base: '250px',
                            sm: '200px',
                            md: '200px',
                            lg: '180px'
                          }}
                        >
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
                              minWidth={'250px'}
                              height={'100%'}
                              objectFit="cover"
                            />
                          )}
                        </Box>

                        <Flex
                          wordWrap={'break-word'}
                          padding={subcategory ? '10' : '5'}
                          width={'100%'}
                          height={{
                            base: '250px',
                            sm: '200px',
                            md: '200px',
                            lg: '180px'
                          }}
                          direction={'column'}
                          justify={'space-between'}
                          position={subcategory ? 'static' : 'absolute'}
                          color={
                            subcategory
                              ? 'rgba(255, 255, 255,1)'
                              : 'rgba(255, 255, 255,0)'
                          }
                          background={subcategory ? ' ' : 'rgba(0, 0, 0, 0)'}
                          _hover={{
                            color: 'rgba(255, 255, 255,1)',
                            background: 'rgba(8, 13, 23, 0.8)',

                            transition:
                              'transform 1s ease-in-out, background 1s, color 2s'
                          }}
                        >
                          <Flex justifyContent={'space-between'} width={'100%'}>
                            <Text
                              fontSize={subcategory ? '2.2rem' : '1.8rem'}
                              fontWeight="400"
                              wordBreak={'break-word'}
                              isTruncated
                            >
                              {entry.title || 'Bez tytułu'}
                            </Text>
                            <Text
                              fontWeight="bold"
                              wordBreak={'break-word'}
                              fontSize={subcategory ? '1.8rem' : '1.4rem'}
                            >
                              {entry.price + ' zł' || 'Brak ceny'}
                            </Text>
                          </Flex>
                          <Text fontSize={subcategory ? '1.5rem' : '1.2rem'}>
                            <span>Dodano:</span>
                            {entry.createdAt
                              ? format(
                                  new Date(entry.createdAt),
                                  '  yyyy-MM-dd HH:mm'
                                )
                              : 'Brak daty'}
                          </Text>
                        </Flex>
                      </Flex>
                    </Box>
                  ))}
                  subcategory={subcategory}
                  onItemSelect={(item, index) => console.log(item, index)}
                />

                <Box
                  width={'100%'}
                  textAlign={'center'}
                  transform={
                    subcategory ? 'translateY(70px)' : 'translateY(20px)'
                  }
                >
                  {offset < allEntries.length && (
                    <Link
                      onClick={loadMore}
                      colorScheme="blue"
                      color="#666666"
                      textAlign={'center'}
                      left={50}
                      fontWeight={600}
                      fontSize={'2rem'}
                      _hover={{
                        color: '#b7410e', // zmienia kolor tekstu na biały przy hover
                        textDecoration: 'underline', // dodaje podkreślenie
                        cursor: 'pointer' // zmienia kursor na wskaźnik
                      }}
                    >
                      Pokaż więcej
                    </Link>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <Footer style={{ position: 'relative', zIndex: 999 }} />
          </div>
        </Box>
      ) : (
        <Box></Box>
      )}
    </>
  );
};

export default CategorySide;
