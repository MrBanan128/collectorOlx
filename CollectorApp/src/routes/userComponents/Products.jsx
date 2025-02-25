
import { useState, useEffect } from 'react';
import { Flex, Button, Input, Textarea, Image, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
 
    const [entries, setEntries] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editData, setEditData] = useState({ title: '', note: '', price: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchUserNotes();
    }, [navigate]);

    const fetchUserNotes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:10000/users/entries', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('Błąd pobierania notatek');

            const data = await response.json();
            setEntries(data);
        } catch (error) {
            console.error('Błąd pobierania notatek:', error);
            setError(error.message);
        }
    };

    const handleEditClick = (entry) => {
        setEditMode(entry._id);
        setEditData({ title: entry.title, note: entry.body, price: entry.price });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = async (noteId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:10000/users/entries/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...editData, body: editData.note }),
            });

            if (!response.ok) throw new Error('Błąd podczas aktualizacji notatki');

            const updatedNote = await response.json();

            setEntries(prevEntries =>
                prevEntries.map(entry =>
                    entry._id === noteId ? { ...entry, ...updatedNote, note: updatedNote.body } : entry
                )
            );

            setEditMode(null);
        } catch (error) {
            console.error('Błąd aktualizacji notatki:', error);
        }
    };

    const handleDeleteEntry = async (noteId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:10000/users/entries/${noteId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Błąd podczas usuwania notatki');
            }

            setEntries(entries.filter(entry => entry._id !== noteId));
        } catch (error) {
            console.error('Błąd usuwania notatki:', error);
        }
    };

    const handleDeleteImage = async (noteId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:10000/users/entries/image/${noteId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('Błąd usuwania zdjęcia');

            setEntries(prevEntries =>
                prevEntries.map(entry =>
                    entry._id === noteId ? { ...entry, image: null, imageId: null } : entry
                )
            );
        } catch (error) {
            console.error('Błąd usuwania zdjęcia:', error.message);
        }
    };




    const sendToExpert = async (noteId) => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch(`http://localhost:10000/users/entries/${noteId}/send-to-expert`, {
                method: 'PUT', // 🛠️ POPRAWKA: PUT, nie POST!
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sentToExpert: true }) // Wysyłamy tylko flagę
            });
    
            if (!response.ok) throw new Error('Błąd podczas wysyłania do eksperta');
    
            setEntries(prevEntries =>
                prevEntries.map(entry =>
                    entry._id === noteId ? { ...entry, sentToExpert: true } : entry
                )
            );
        } catch (error) {
            console.error('Błąd wysyłania do eksperta:', error);
        }
    };
    
    


    return (
        <Flex margin="50px" direction="column" align="center">

            <Box mt={5} width="100%">
                <h3>Wpisy:</h3>

                {entries.map((entry, index) => (
                    <Box key={index} border="1px solid #ccc" padding="10px" marginBottom="10px">
                        {editMode === entry._id ? (
                            <>
                                <Input
                                    name="title"
                                    value={editData.title}
                                    onChange={handleEditInputChange}
                                    placeholder="Edytuj tytuł"
                                    mb={2}
                                />
                                <Textarea
                                    name="note"
                                    value={editData.note}
                                    onChange={handleEditInputChange}
                                    placeholder="Edytuj treść"
                                    mb={2}
                                />
                                <Input
                                    name="price"
                                    type="number"
                                    value={editData.price}
                                    onChange={handleEditInputChange}
                                    placeholder="Edytuj numer telefonu"
                                    mb={2}
                                />
                                <Button onClick={() => handleSaveEdit(entry._id)} colorScheme="green" mt={2}>
                                    Zapisz
                                </Button>
                                <Button onClick={() => setEditMode(null)} colorScheme="gray" mt={2} ml={2}>
                                    Anuluj
                                </Button>
                            </>
                        ) : (
                            <Box  
                            key={index} border="1px solid #ccc" padding="10px" marginBottom="10px"
                            onClick={() => navigate(`/entry/${entry._id}`)}
                            >
                                
                                <h4>{entry.title || 'Bez tytułu'}</h4>
                                <p>{entry.body || 'Brak treści'}</p>
                                <p>{entry.price || 'Brak numeru telefonu'}</p>
                                {entry.image && (
                                    <>
                                        <Image src={entry.image} alt="Obraz" width="100px" />
                                        <Button onClick={() => handleDeleteImage(entry._id)} colorScheme="red" mt={2}>
                                            Usuń zdjęcie
                                        </Button>
                                    </>
                                )}
                                <Button onClick={() => handleEditClick(entry)} colorScheme="blue" mt={2}>
                                    Edytuj
                                </Button>
                                <Button onClick={() => handleDeleteEntry(entry._id)} colorScheme="red" mt={2} ml={2}>
                                    Usuń notatkę
                                </Button>
                                {!entry.sentToExpert && (
                                 <Button onClick={() => sendToExpert(entry._id)} colorScheme="purple" mt={2} ml={2}>
                                     Wyślij do eksperta
                                </Button>
                              )}


                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
        </Flex>
    );
};

export default Products;




