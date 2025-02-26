import { Box } from '@chakra-ui/react';
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
