import { Button } from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
const MenuButton = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      size={10}
      display={'block'}
      sm={{ display: 'none' }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#8F0402"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-menu"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </Button>
  );
};

export default MenuButton;
