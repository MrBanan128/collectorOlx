import SideLink from './SideLink';

const Sidebar = () => {
  return (
    <>
      <SideLink to={'/'}>Home</SideLink>
      <SideLink to={'/message'}>Message</SideLink>
      <SideLink to={'/chat'} width={'100%'}>
        Chat
      </SideLink>
      <SideLink to={'/sign-up'} width={'100%'}>
        Account
      </SideLink>
    </>
  );
};

export default Sidebar;
