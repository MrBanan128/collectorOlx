import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Image, Text, Textarea, Input } from '@chakra-ui/react';
import axios from "axios";

const EntryPanel = () => {
    const { id } = useParams(); // Pobranie ID wpisu z URL
    const [entry, setEntry] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(""); // Treść wiadomości
    const [title, setTitle] = useState(""); // title
    const [success, setSuccess] = useState(null);
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
                // console.log("Odpowiedź z API:", data);  // Dodaj to logowanie
                  setEntry(data);
            } catch (error) {
                setError(error.message);
                setError(error.title);
            }
        };
        fetchEntry();
    }, [id]);
   
    const sendMessage = async () => {
        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                setError("Nie jesteś zalogowany");
                return;
            }
            console.log("Dane wpisu:", entry); // Sprawdzamy dane przed wysłaniem wiadomości
                if (!entry?.userId) {
                setError("Brak odbiorcy wiadomości (entry.userId)");
                return;
            }
            await axios.post("http://localhost:10000/send-message",
                {
                    receiverId: entry.userId,  // Używamy userId z wpisu
                    title: title,
                    content: message,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess("Wiadomość wysłana!");
            setMessage(""); 
            setTitle(""); 
        } catch (error) {
            console.error("Błąd wysyłania wiadomości:", error.response?.data || error.message || error.title);
            setError("Błąd wysyłania wiadomości");
        }
    };

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

          {/* Formularz wysyłania wiadomości */}
          <Box padding="20px" border="1px solid #ccc" maxWidth="500px" margin="auto" mt={4}>
                <Text fontSize="lg" fontWeight="bold">Wyślij wiadomość do właściciela</Text>
                <Input
                placeholder="Wpisz tytuł wiadomości"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                mt={2}
                />
                <Textarea
                    placeholder="Wpisz swoją wiadomość..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    mt={2}
                />
                <Button onClick={sendMessage} colorScheme="green" mt={2}>Wyślij</Button>
                {success && <Text color="green" mt={2}>{success}</Text>}
                {error && <Text color="red" mt={2}>{error}</Text>}
            </Box>
        
        </>
        
    );
};

export default EntryPanel;

