import SideLink from './SideLink';

const Sidebar = () => {
  return (
    <>
      <SideLink to={'/'}>Home</SideLink>
      <SideLink to={'/dashboard'}>Dashboard</SideLink>
      <SideLink to={'/test'}>Test</SideLink>
      <SideLink to={'/Admin'}>Admin</SideLink>
    </>
  );
};

export default Sidebar;
