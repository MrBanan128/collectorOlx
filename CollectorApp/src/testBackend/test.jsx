// import { useState, useEffect } from 'react';
// import { Flex, Button, Input, Textarea } from '@chakra-ui/react';
// import AppLink from './../components/layout/AppLink';

// const Test = () => {
//     const [notes, setNotes] = useState([]); // Tablica do przechowywania notatek
//     const [loading, setLoading] = useState(true); // Zmienna do kontrolowania ładowania
//     const [error, setError] = useState(null); // Zmienna do przechowywania ewentualnych błędów
//     const [newNote, setNewNote] = useState({ title: '', content: '' }); // Stan dla nowej notatki

//     useEffect(() => {
//         // Pobierz wszystkie notatki
//         fetch('http://localhost:10000/notes')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Błąd podczas pobierania danych');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setNotes(data); // Zapisz dane w stanie
//                 setLoading(false); // Zakończ ładowanie
//             })
//             .catch(error => {
//                 setError(error.message); // Zapisz błąd, jeśli wystąpi
//                 setLoading(false); // Zakończ ładowanie
//             });
//     }, []); // Używamy pustej tablicy zależności, więc zapytanie wykona się tylko raz po załadowaniu komponentu

//     // Funkcja do obsługi zmiany wartości w formularzu
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewNote(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     // Funkcja do obsługi wysyłania nowej notatki
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Wysłanie nowej notatki na serwer
//         fetch('http://localhost:10000/notes', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newNote),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 // Dodaj nową notatkę do stanu
//                 setNotes(prevNotes => [...prevNotes, data]);
//                 // Wyczyść formularz po dodaniu notatki
//                 setNewNote({ title: '', content: '' });
//             })
//             .catch(error => {
//                 setError('Błąd podczas dodawania notatki');
//             });
//     };

//     return (
//         <div>
//             <AppLink to={'/'}>Home</AppLink>
//             <Flex margin={'50px'}>
//                 <div>
//                     <h1>Test bazy danych</h1>

//                     {loading && <p>Ładowanie danych...</p>} {/* Wyświetlaj komunikat ładowania */}
//                     {error && <p>Błąd: {error}</p>} {/* Wyświetlaj błąd, jeśli wystąpi */}

//                     {/* Formularz do dodawania nowej notatki */}
//                     <form onSubmit={handleSubmit}>
//                         <div>
//                             <Input
//                                 name="title"
//                                 value={newNote.title}
//                                 onChange={handleInputChange}
//                                 placeholder="Tytuł notatki"
//                                 mb={2}
//                             />
//                             <Textarea
//                                 name="content"
//                                 value={newNote.content}
//                                 onChange={handleInputChange}
//                                 placeholder="Treść notatki"
//                                 mb={2}
//                             />
//                             <Button type="submit">Dodaj notatkę</Button>
//                         </div>
//                     </form>

//                     {notes.length > 0 && (
//                         <div>
//                             <h2>Załadowane notatki:</h2>
//                             {/* Wyświetl wszystkie tytuły notatek */}
//                             {notes.map((note, index) => (
//                                 <div key={index}>
//                                     <h3>{note.title}</h3>
//                                     <p>{note.content}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </Flex>
//         </div>
//     );
// };

// export default Test;



import { useState, useEffect } from 'react';
import { Flex, Button, Input, Textarea, Image, Box } from '@chakra-ui/react';
import AppLink from './../components/layout/Navbar/AppLink';

const Test = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newNote, setNewNote] = useState({ title: '', body: '', image: null });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await fetch('http://localhost:10000/notes');
            if (!response.ok) throw new Error('Błąd ładowania notatek');
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNote(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewNote(prev => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newNote.title);
        formData.append('body', newNote.body);
        if (newNote.image) formData.append('image', newNote.image);

        try {
            const response = await fetch('http://localhost:10000/notes', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Błąd dodawania notatki');

            const data = await response.json();
            setNotes(prevNotes => [...prevNotes, data]);
            setNewNote({ title: '', body: '', image: null });
            setPreview(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const response = await fetch(`http://localhost:10000/notes/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Błąd usuwania notatki');

            setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };


    const handleDeleteImage = async (id) => {
    try {
        const response = await fetch(`http://localhost:10000/notes/${id}/image`, { method: 'DELETE' });

        if (!response.ok) {
            const errorDetails = await response.json(); // Pobieramy szczegóły błędu
            console.error('Błąd odpowiedzi z serwera:', errorDetails);
            throw new Error('Błąd usuwania zdjęcia');
        }

        const data = await response.json();
        console.log('Odpowiedź z serwera:', data); // Zobaczmy, co zwraca serwer

        // Aktualizujemy notatki po usunięciu zdjęcia
        setNotes(prevNotes => prevNotes.map(note =>
            note._id === id ? { ...note, image: '' } : note
        ));
    } catch (error) {
        console.error('Błąd podczas usuwania zdjęcia:', error.message);
    }
};

    

    return (
        <div>
            <AppLink to="/">Home</AppLink>
            <Flex margin="50px" direction="column" align="center">
                <h1>Test bazy danych</h1>

                {loading && <p>Ładowanie danych...</p>}
                {error && <p style={{ color: 'red' }}>Błąd: {error}</p>}

                <form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%' }}>
                    <Input
                        name="title"
                        value={newNote.title}
                        onChange={handleInputChange}
                        placeholder="Tytuł notatki"
                        mb={2}
                    />
                    <Textarea
                        name="body"
                        value={newNote.body}
                        onChange={handleInputChange}
                        placeholder="Treść notatki"
                        mb={2}
                    />
                    <Input type="file" onChange={handleFileChange} mb={2} />
                    {preview && <Image src={preview} alt="Podgląd" width="100px" mb={2} />}
                    <Button type="submit" colorScheme="blue">Dodaj notatkę</Button>
                </form>

                {notes.length > 0 && (
                    <Box mt={5} width="100%">
                        <h2>Załadowane notatki:</h2>
                        {notes.map(note => (
                            <Box key={note._id} p={4} borderWidth="1px" borderRadius="md" mt={2}>
                                <h3>{note.title}</h3>
                                <p>{note.body}</p>
                                {note.image ? (
                                    <>
                                        <Image src={note.image} alt={note.title} width="200px" mt={2} />
                                        <Button onClick={() => handleDeleteImage(note._id)} colorScheme="yellow" mt={2}>
                                            Usuń zdjęcie
                                        </Button>
                                    </>
                                ) : (
                                    <p>Brak zdjęcia</p>
                                )}
                                <Button onClick={() => handleDeleteNote(note._id)} colorScheme="red" mt={2}>
                                    Usuń notatkę
                                </Button>
                            </Box>
                        ))}
                    </Box>
                )}
            </Flex>
        </div>
    );
};

export default Test;
