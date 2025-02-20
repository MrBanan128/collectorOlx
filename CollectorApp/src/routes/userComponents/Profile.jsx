import { useEffect, useState } from 'react';
import { Flex, Button, Image, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();



    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchUserData();
    }, [navigate]);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:10000/users', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Token wygasł lub jest niepoprawny');
            }

            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Błąd pobierania danych użytkownika:', error);
            localStorage.removeItem('token'); 
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

// ============================================== DELETED ============================================== //

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:10000/users', {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('Błąd usuwania konta');

            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Flex direction="column" align="center">
            <h1>Profil użytkownika</h1>

            {loading && <p>Ładowanie danych...</p>}
            {error && <p style={{ color: 'red' }}>Błąd: {error}</p>}

            {userData && (
                <Box mt={5} width="100%">
                    <h2>Witaj, {userData.username}!</h2>
                    <p>Email: {userData.email}</p>

                    {userData.avatar ? (
                        <>
                            <Image src={userData.avatar} alt="Avatar" width="200px" mt={2} />
                            <Button colorScheme="yellow" mt={2}>Usuń zdjęcie</Button>
                        </>
                    ) : (
                        <p>Brak zdjęcia</p>
                    )}

                    <Button onClick={handleDeleteAccount} colorScheme="red" mt={4}>Usuń konto</Button>
                    <Button onClick={() => { localStorage.removeItem('token'); navigate('/Sign-up'); }} colorScheme="gray" mt={2}>Wyloguj się</Button>
                </Box>
            )}
        </Flex>
    );
};

export default Profile;


