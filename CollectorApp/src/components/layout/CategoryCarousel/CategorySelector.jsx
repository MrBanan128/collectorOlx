import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { subcategories } from '../../../categories';

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

          <Box
           style={{
            textAlign:'center',
            display: 'block',
            padding: '10px',
            borderBottom: '1px solid gray',
            borderRadius: '5px',
            marginBottom: '10px',
          }}
          >
          <p
            href=""
            onClick={() =>
              handleSubcategoryClick(
                subcategories[selectedCategory]?.find((sub) =>
                  sub.value.includes('wszystkie')
                )?.value || ''
              )
            }
            style={{
              display:'inline',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '18px',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Wybierz podkategorię dla: {selectedCategory}
          </p>
          </Box>

          <div>
            {subcategories[selectedCategory]
              ?.filter(
                (subcategory) => !subcategory.value.includes('wszystkie')
              )
              .map((subcategory) => (
                <Flex
                  key={subcategory.value}
                  alignItems={'center'}
                  direction={'column'}
                >
                  <Box
                    onClick={() => handleSubcategoryClick(subcategory.value)}
                    display={'block'}
                    padding={'8px'}
                    textDecoration={'none'}
                    color={'white'}
                    fontSize={'20px'}
                    fontWeight={'bold'}
                  >

                    <Box
                      _hover={{
                        textShadow: '1px 1px 1px white',
                        bgColor: 'gray.900',
                        rounded: '3xl',
                        width: '500px',
                        cursor: 'pointer'
                      }}
                    >
                      {subcategory.label}
                    </Box>
                  </Box>
                </Flex>
              ))}
          </div>
        </Box>
      )}
    </>
  );
};

export default CategorySelector;
