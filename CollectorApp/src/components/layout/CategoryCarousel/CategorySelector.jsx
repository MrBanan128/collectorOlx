import React from 'react';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const subcategories = {
  Figurka: [
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'miedziana', label: 'Miedziana' },
    { value: 'porcelanowa', label: 'Porcelanowa' }
  ],
  Znaczek: [
    { value: 'wojskowy', label: 'Wojskowy' },
    { value: 'personalizowany', label: 'Personalizowany' },
    { value: 'urzedowy', label: 'Urzędowy' }
  ],
  Moneta: [
    { value: 'złota', label: 'Złota' },
    { value: 'srebrna', label: 'Srebrna' },
    { value: 'zabytkowa', label: 'Zabytkowa' }
  ],
  Karta: [
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'sportowa', label: 'Sportowa' },
    { value: 'muzyczna', label: 'Muzyczna' }
  ],
  Inne: [
    { value: 'samochody', label: 'Samochody' },
    { value: 'dzieła sztuki', label: 'Dzieła sztuki' },
    { value: 'Zastawa stołowa', label: 'Zastawa stołowa' }
  ]
};

const CategorySelector = ({ selectedCategory }) => {
  const navigate = useNavigate();

  const handleSubcategoryClick = (subcategory) => {
    if (subcategory.includes('wszystkie')) {
      navigate(`/${selectedCategory}`);
    } else {
      navigate(`/${selectedCategory}/${subcategory}`);
    }
  };

  return (
    <>
      {selectedCategory && (
        <Box mt={4} style={{ textAlign: 'center' }}>
          <a
            href=""
            onClick={() =>
              handleSubcategoryClick(
                subcategories[selectedCategory]?.find((sub) =>
                  sub.value.includes('wszystkie')
                )?.value || ''
              )
            }
            style={{
              display: 'block',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '18px',
              color: 'black',
              cursor: 'pointer',
              padding: '10px',
              borderBottom: '1px solid gray',
              borderRadius: '5px',
              marginBottom: '10px'
            }}
          >
            Wybierz podkategorię dla: {selectedCategory}
          </a>

          <div>
            {subcategories[selectedCategory]
              ?.filter(
                (subcategory) => !subcategory.value.includes('wszystkie')
              )
              .map((subcategory) => (
                <a
                  key={subcategory.value}
                  href=""
                  onClick={() => handleSubcategoryClick(subcategory.value)}
                  style={{
                    display: 'block',
                    padding: '8px',
                    textDecoration: 'none',
                    color: 'black',
                    fontSize: '20px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {subcategory.label}
                </a>
              ))}
          </div>
        </Box>
      )}
    </>
  );
};

export default CategorySelector;
