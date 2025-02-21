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

const Sidebar = ({ open, setOpen }) => {
  return (
    <DrawerRoot
      size={'full'}
      open={open}
      onOpenChange={(isOpen) => setOpen(Boolean(isOpen))}
    >
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Antique Value</DrawerTitle>
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
              <Box
                width="100%"
                height="80px"
                fontSize="xl"
                backgroundColor={'white'}
                color={'black'}
                rounded={'xl'}
                justifyItems={'center'}
                alignContent={'center'}
              >
                <House />
                <Text>Home</Text>
              </Box>
              <Box
                width="100%"
                height="80px"
                fontSize="xl"
                backgroundColor={'white'}
                color={'black'}
                rounded={'xl'}
                justifyItems={'center'}
                alignContent={'center'}
              >
                <MessageCircleMore />
                <Text>Message</Text>
              </Box>
              <Box
                width="100%"
                height="80px"
                fontSize="xl"
                backgroundColor={'white'}
                color={'black'}
                rounded={'xl'}
                justifyItems={'center'}
                alignContent={'center'}
              >
                <MessagesSquare />
                <Text>Chat</Text>
              </Box>
              <Box
                width="100%"
                height="80px"
                fontSize="xl"
                backgroundColor={'white'}
                color={'black'}
                rounded={'xl'}
                justifyItems={'center'}
                alignContent={'center'}
                direction={'row'}
              >
                <UserRound />
                <Text>Account</Text>
              </Box>
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
