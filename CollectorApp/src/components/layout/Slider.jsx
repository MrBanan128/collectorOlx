import { Flex, Image } from '@chakra-ui/react';
import BlurText from '../ui/blur-text'; // Import BlurText component

const Slider = () => {
  return (
    <Flex
      height="100vh" // Full screen height
      width="100%" // Full width
      justifyContent="center"
      alignItems="center"
      position="relative" // Key for positioning BlurText over the image
      overflow="hidden" // Hide anything outside container
    >
      <Image
        src="/background.jpg"
        alt="background"
        zIndex={0} // Position background image at the bottom
        width="100%" // Full width of the image
        height="100%" // Full height of the image
        objectFit="cover" // Ensure the image covers the area proportionally
      />
      <Flex
        position="absolute" // Position above the image
        top="50%" // Center vertically
        left="50%" // Center horizontally
        transform="translate(-50%, -50%)" // Adjust position to exact center
        textAlign="center"
        zIndex="1" // Put BlurText above the background image
      ></Flex>
    </Flex>
  );
};

export default Slider;
