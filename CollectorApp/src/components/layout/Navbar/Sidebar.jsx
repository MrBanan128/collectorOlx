import { Flex } from '@chakra-ui/react';
import SideLink from './SideLink';

const Sidebar = () => {
  return (
    <Flex direction={'column'}>
      <SideLink to={'/'}>Home</SideLink>
      <SideLink to={'/message'}>Message</SideLink>
      <SideLink to={'/chat'} width={'100%'}>
        Chat
      </SideLink>
      <SideLink to={'/sign-up'} width={'100%'}>
        Account
      </SideLink>
    </Flex>
  );
};

export default Sidebar;
