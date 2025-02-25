import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle
} from '../../ui/drawer';
import { Button, Flex, Grid, Box, Text } from '@chakra-ui/react';
import {
  House,
  MessageCircleMore,
  MessagesSquare,
  UserRound
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = ({ open, setOpen }) => {
  return (
    <DrawerRoot
      size={'full'}
      open={open}
      onOpenChange={(isOpen) => setOpen(Boolean(isOpen))}
    >
      <DrawerBackdrop />
      <DrawerContent bg="rgba(255, 255, 255, 0.8)">
        <DrawerHeader>
          <DrawerTitle color={'black'}>Antique Value</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {/* Use Flex to center the Grid */}
          <Flex
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(2, 1fr)"
              gap={4}
              width="100%" // Ensure Grid takes full width
            >
              {/* Wrap each Box with a Link */}
              <Link to="/">
                <Box
                  width="100%"
                  height="250px"
                  fontSize="xl"
                  backgroundColor={'white'}
                  color={'black'}
                  rounded={'xl'}
                  justifyItems={'center'}
                  alignContent={'center'}
                  _hover={{ bg: 'gray.100' }} // Add hover effect
                >
                  <House />
                  <Text>Home</Text>
                </Box>
              </Link>

              <Link to="/message">
                <Box
                  width="100%"
                  height="250px"
                  fontSize="xl"
                  backgroundColor={'white'}
                  color={'black'}
                  rounded={'xl'}
                  justifyItems={'center'}
                  alignContent={'center'}
                  _hover={{ bg: 'gray.100' }}
                >
                  <MessageCircleMore />
                  <Text>Message</Text>
                </Box>
              </Link>

              <Link to="/chat">
                <Box
                  width="100%"
                  height="250px"
                  fontSize="xl"
                  backgroundColor={'white'}
                  color={'black'}
                  rounded={'xl'}
                  justifyItems={'center'}
                  alignContent={'center'}
                  _hover={{ bg: 'gray.100' }}
                >
                  <MessagesSquare />
                  <Text>Chat</Text>
                </Box>
              </Link>

              <Link to="/sign-up">
                <Box
                  width="100%"
                  height="250px"
                  fontSize="xl"
                  backgroundColor={'white'}
                  color={'black'}
                  rounded={'xl'}
                  justifyItems={'center'}
                  alignContent={'center'}
                  _hover={{ bg: 'gray.100' }}
                >
                  <UserRound />
                  <Text>Account</Text>
                </Box>
              </Link>
            </Grid>
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)} fontWeight={'bold'}>
            X
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

// ✅ Make sure this export is at the end
export default Sidebar;
