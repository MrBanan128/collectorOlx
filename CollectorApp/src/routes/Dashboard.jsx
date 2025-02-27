import { useEffect, useState } from 'react';
import { Flex, Box, Heading } from '@chakra-ui/react';
import { Route, Routes, Link as RouterLink } from 'react-router-dom';
import Products from './userComponents/Products';
import Profile from './userComponents/Profile';
import Message from './userComponents/Message';
import Admin from '../components/layout/AdminPanel/Users';
import PanelExpert from './userComponents/PanelExpert';
import AddProduct from './userComponents/AddProduct';
import ArrowBack from '../components/layout/ArrowBack';
// import AdminContact from './userComponents/AdminContact';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isExpert, setIsExpert] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:10000/user-info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log(data);

        if (data.status === 'admin') {
          setIsAdmin(true);
        }
        if (data.status === 'expert') {
          setIsExpert(true);
        }
      } catch (error) {
        console.error('Błąd pobierania danych użytkownika:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Flex
      marginTop={'0'}
      direction="column"
      align="flex-start"
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'100%'}
      minHeight={'100%'}
      bgImage={
        'linear-gradient(90deg, rgba(105,127,141,1) 0%, rgba(97,120,134,1) 35%, rgba(70,93,109,1) 80%, rgba(58,79,96,1) 100%);'
      }
      className="dashboard"
      // overflow="auto"
      overflow={'hidden'}
    >
      <Box>
        <ArrowBack />
      </Box>
      <Flex
        direction="column"
        align="center"
        width="100%"
        height={'100%'}
        bgImage={
          'linear-gradient(90deg, rgba(105,127,141,1) 0%, rgba(97,120,134,1) 35%, rgba(70,93,109,1) 80%, rgba(58,79,96,1) 100%);'
        }
        padding={'15px'}
      >
        <Heading
          fontSize={'24px'}
          color={'white'}
          paddingBottom={'20px'}
          textAlign={'center'}
          width={'100%'}
          sm={{ fontSize: '32px', padding: '20px' }}
          md={{ fontSize: '40px', padding: '30px' }}
          lg={{ fontSize: '60px', padding: '40px' }}
        >
          Panel użytkownika
        </Heading>
        <Flex
          fontSize={'12px'}
          padding={'5px'}
          gap={'10px'}
          direction="row"
          color={'white'}
          sm={{ gap: '20px', fontSize: '16px', padding: '10px' }}
          md={{ gap: '30px', fontSize: '20px', padding: '15px' }}
          lg={{ gap: '40px', fontSize: '24px', padding: '20px' }}
        >
          {[
            { to: '/dashboard/profile', label: 'Profil' },
            { to: '/dashboard/products', label: 'Produkty' },
            { to: '/dashboard/message', label: 'Wiadomości' },
            isExpert && { to: '/dashboard/expert', label: 'Expert' },
            isAdmin && { to: '/dashboard/admin-users', label: 'Admin' }
          ]
            .filter(Boolean)
            .map(({ to, label }) => (
              <Box
                key={to}
                as={RouterLink}
                to={to}
                borderBottom="solid #ffffff 2px"
                transition="transform 0.3s ease, background 0.3s ease"
                padding={'10px 10px 0 10px'}
                rounded={'lg'}
                _hover={{
                  transform: 'scale(1.2)',
                  background: 'rgba(0,0,0,0.4)'
                }}
              >
                {label}
              </Box>
            ))}
        </Flex>
      </Flex>

      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="message" element={<Message />} />
        {isExpert && <Route path="expert" element={<PanelExpert />} />}
        {isAdmin && <Route path="admin-users" element={<Admin />} />}
      </Routes>
    </Flex>
  );
};

export default Dashboard;
