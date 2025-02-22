
import { useEffect, useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Route, Routes, Link as RouterLink } from 'react-router-dom';
import Products from './userComponents/Products';
import Profile from './userComponents/Profile';
import Message from './userComponents/Message';
import Admin from '../components/layout/AdminPanel/Users';
import PanelExpert from './userComponents/PanelExpert';

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isExpert, setIsExpert] = useState(false); 


    useEffect(() => {
        const fetchUserData = async () => {
          const token = localStorage.getItem("token");
          if (!token) return;
    
          try {
            const response = await fetch("http://localhost:10000/user-info", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
    
            const data = await response.json();
    
            // Sprawdzamy status użytkownika i ustawiamy odpowiedni stan
            if (data.status === "admin") {
              setIsAdmin(true);
            } else if (data.status === "expert") {
              setIsExpert(true);
            }
          } catch (error) {
            console.error("Błąd pobierania danych użytkownika:", error);
          }
        };
    
        fetchUserData();
      }, []);  



    return (
        <Flex margin="50px" direction="column" align="center">
            <h1>Panel użytkownika</h1>
            <Flex>
                <Box as={RouterLink} to="/dashboard/profile"
                    border="solid #ffffff 2px" padding=".5rem 1rem">Profil</Box> 
                <Box as={RouterLink} to="/dashboard/products"
                    border="solid #ffffff 2px" padding=".5rem 1rem">Produkty</Box> 
                <Box as={RouterLink} to="/dashboard/message"
                    border="solid #ffffff 2px" padding=".5rem 1rem">Wiadomości</Box>
                
                {isExpert && (<Box as={RouterLink} to="/dashboard/expert" 
                border="solid #ffffff 2px" padding=".5rem 1rem">Panel Expert</Box>)}
                
                {isAdmin && (<Box as={RouterLink} to="/dashboard/admin-users"
                        border="solid #ffffff 2px" padding=".5rem 1rem">Panel Admin</Box>)}
            </Flex>

            <Routes>
                <Route path="profile" element={<Profile />} />
                <Route path="products" element={<Products />} />
                <Route path="message" element={<Message />} />
                {isExpert && <Route path="expert" element={<PanelExpert />} />}
                {isAdmin && <Route path="admin-users" element={<Admin />} />}
            </Routes>
        </Flex>
    );
};

export default Dashboard;































