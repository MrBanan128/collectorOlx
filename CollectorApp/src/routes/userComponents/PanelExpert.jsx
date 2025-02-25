import { useEffect, useState } from 'react';
import { Box, Button, Input, Textarea } from '@chakra-ui/react';

const PanelExpert = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetchEntriesForExpert();
    }, []);

    const fetchEntriesForExpert = async () => {
        try {
            const token = localStorage.getItem('token'); // Pobierz token
    
            const response = await fetch('http://localhost:10000/users/entries?sentToExpert=true', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }, // Dodaj autoryzację
            });
    
            if (!response.ok) throw new Error('Błąd pobierania wpisów');
    
            const data = await response.json();
            
            // Sprawdź, czy data jest tablicą
            if (!Array.isArray(data)) {
                throw new Error('Błędny format danych');
            }
    
            setEntries(data);
        } catch (error) {
            console.error('Błąd pobierania wpisów:', error);
            setEntries([]); // Unikamy błędu `.map()`
        }
    };
    

    const handleExpertEvaluation = async (noteId, expertNote) => {
        try {
            const token = localStorage.getItem('token'); // 🔥 Dodałem autoryzację
    
            const response = await fetch(`http://localhost:10000/users/entries/${noteId}/expert`, {
                method: 'PUT', // 🔥 POPRAWKA: PUT zamiast POST
                headers: { 
                    'Authorization': `Bearer ${token}`, // 🔥 Dodałem token
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ 
                    expertDescription: expertNote, 
                    expertApproved: true 
                }),
            });
    
            if (!response.ok) throw new Error('Błąd podczas oceny');
    
            setEntries(prev => prev.filter(entry => entry._id !== noteId));
        } catch (error) {
            console.error('Błąd oceny:', error);
        }
    };
    

    return (
        <Box>
            <h1>Panel eksperta</h1>
            {entries.length === 0 ? (
                <p>Brak wpisów do oceny</p>
            ) : (
                entries.map((entry) => (
                    <Box key={entry._id} border="1px solid gray" p={4} mb={4}>
                        <h4>{entry.title}</h4>
                        <Textarea defaultValue={entry.body} readOnly />

                        <Input type="number" placeholder="Wprowadź wycenę" onChange={(e) => entry.price = e.target.value} />
                        <Button onClick={() => handleExpertEvaluation(entry._id, entry.price)} colorScheme="green" mt={2}>
                            Zatwierdź wycenę
                        </Button>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default PanelExpert;
