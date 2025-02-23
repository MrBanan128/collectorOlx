import { IconButton } from '@chakra-ui/react';

import { NavLink } from 'react-router-dom'; // Corrected import path for NavLink

import { TbArrowBackUp } from 'react-icons/tb';

const ArrowBack = () => {
  return (
    <div>
      <NavLink to="/">
        <IconButton
          aria-label="Back"
          position="absolute"
          background={'rgba(0,0,0,0.8)'}
          shadow={'xl'}
          top={5}
          left={5}
          variant="solid"
          color={'white'}
          size={'2xl'}
          style={{ zIndex: '10' }}
          sm={{ size: '2xl' }}
        >
          <TbArrowBackUp />
        </IconButton>
      </NavLink>
    </div>
  );
};

export default ArrowBack;
