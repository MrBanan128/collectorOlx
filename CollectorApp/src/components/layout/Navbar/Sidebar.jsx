import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  DrawerActionTrigger
} from '../../ui/drawer';
import { Button, Flex, Grid } from '@chakra-ui/react';
import { useState } from 'react';

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
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            <Button>test</Button>
            <Button>test</Button>
            <Button>test</Button>
          </Grid>
        </DrawerBody>
        <DrawerFooter>
          {/* <DrawerActionTrigger asChild>
            <Button></Button>
          </DrawerActionTrigger> */}
          <Button onClick={() => setOpen(false)} fontWeight={'bold'}>
            X
          </Button>
        </DrawerFooter>
        {/* <DrawerCloseTrigger asChild>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DrawerCloseTrigger> */}
      </DrawerContent>
    </DrawerRoot>
  );
};

// ✅ Make sure this export is at the end
export default Sidebar;
