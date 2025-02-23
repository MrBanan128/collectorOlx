import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Image, Text } from '@chakra-ui/react';


const EntryPanel = () => {
    const { id } = useParams(); // Pobranie ID wpisu z URL
    const [entry, setEntry] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:10000/users/entries/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
    
                if (!response.ok) throw new Error('Błąd pobierania wpisu');
                const data = await response.json();
                setEntry(data);
            } catch (error) {
                setError(error.message);
            }
        };
    
        fetchEntry();
    }, [id]);

    if (error) return <p>Błąd: {error}</p>;
    if (!entry) return <p>Ładowanie...</p>;

    return (
        <>
        <Box padding="20px" border="1px solid #ccc" maxWidth="500px" margin="auto">
           {/* Inne elementy */}
           <Button onClick={() => navigate(-1)} colorScheme="blue" mt={4}>Powrót</Button>
        </Box>

        <Box padding="20px" border="1px solid #ccc" maxWidth="500px" margin="auto">
           <Text fontSize="xl" fontWeight="bold">{entry.title}</Text>
            <Text>{entry.body}</Text>
            <Text fontSize="sm" color="gray">Cena: {entry.price}</Text>
            <Text fontSize="sm" color="gray">Kategoria: {entry.category}</Text>
            <Text fontSize="sm" color="gray">Podkategoria: {entry.subcategory}</Text>
            {entry.image && <Image src={entry.image} alt="Obraz" width="100%" />}
        </Box>
        
        </>
        
    );
};

export default EntryPanel;
