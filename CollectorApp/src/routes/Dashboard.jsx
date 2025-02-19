// import { useEffect, useState } from 'react';
// import { Flex, Button, Input, Textarea, Image, Box } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [newData, setNewData] = useState({ username: '', email: '', avatar: null });
//     const [preview, setPreview] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             navigate('/Sign-up'); // Przekierowanie do logowania, jeśli brak tokenu
//         }
//         fetchUserData();
//     }, [navigate]);

//     const fetchUserData = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:10000/users', {
//                 method: 'GET',
//                 headers: { 'Authorization': `Bearer ${token}` },
//             });

//             if (!response.ok) throw new Error('Błąd pobierania danych użytkownika');
//             const data = await response.json();
//             setUserData(data);
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setNewData(prev => ({ ...prev, avatar: file }));
//             setPreview(URL.createObjectURL(file));
//         }
//     };


    
//     const handleUpdateProfile = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('username', newData.username);
//         formData.append('email', newData.email);
//         if (newData.avatar) formData.append('avatar', newData.avatar);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:10000/users', {
//                 method: 'PUT',
//                 headers: { 'Authorization': `Bearer ${token}` },
//                 body: formData,
//             });

//             if (!response.ok) throw new Error('Błąd aktualizacji danych');

//             const updatedUser = await response.json();
//             setUserData(updatedUser);
//             setNewData({ username: '', email: '', avatar: null });
//             setPreview(null);
//         } catch (error) {
//             setError(error.message);
//         }
//     };




//     const handleDeleteAccount = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:10000/users', {
//                 method: 'DELETE',
//                 headers: { 'Authorization': `Bearer ${token}` },
//             });

//             if (!response.ok) throw new Error('Błąd usuwania konta');

//             localStorage.removeItem('token');
//             navigate('/Sign-up');
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const handleDeleteAvatar = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`http://localhost:10000/users/image`, {
//                 method: 'DELETE',
//                 headers: { 'Authorization': `Bearer ${token}` },
//             });

//             if (!response.ok) throw new Error('Błąd usuwania zdjęcia');

//             setUserData(prev => ({ ...prev, avatar: '' }));
//         } catch (error) {
//             console.error(error.message);
//         }
//     };

//     return (
//         <Flex margin="50px" direction="column" align="center">
//             <h1>Panel użytkownika</h1>
//             {loading && <p>Ładowanie danych...</p>}
//             {error && <p style={{ color: 'red' }}>Błąd: {error}</p>}

//             {userData && (
//                 <Box mt={5} width="100%">
//                     <h2>Witaj, {userData.username}!</h2>
//                     <p>Email: {userData.email}</p>
//                     {userData.avatar ? (
//                         <>
//                             <Image src={userData.avatar} alt="Avatar" width="200px" mt={2} />
//                             <Button onClick={handleDeleteAvatar} colorScheme="yellow" mt={2}>Usuń zdjęcie</Button>
//                         </>
//                     ) : (
//                         <p>Brak zdjęcia</p>
//                     )}

//                     <form onSubmit={handleUpdateProfile} style={{ maxWidth: '400px', width: '100%' }}>
//                         <Input name="username" value={newData.username} onChange={handleInputChange} placeholder="Nowa nazwa użytkownika" mb={2} />
//                         <Input name="email" value={newData.email} onChange={handleInputChange} placeholder="Nowy email" mb={2} />
//                         <Input type="file" onChange={handleFileChange} mb={2} />
//                         {preview && <Image src={preview} alt="Podgląd" width="100px" mb={2} />}
//                         <Button type="submit" colorScheme="blue">Zapisz zmiany</Button>
//                     </form>

//                     <Button onClick={handleDeleteAccount} colorScheme="red" mt={4}>Usuń konto</Button>
//                     <Button onClick={() => { localStorage.removeItem('token'); navigate('/Sign-up'); }} colorScheme="gray" mt={2}>Wyloguj się</Button>
//                 </Box>
//             )}
//         </Flex>
//     );
// };

// export default Dashboard;










import { useEffect, useState } from 'react';
import { Flex, Button, Input, Textarea, Image, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newData, setNewData] = useState({ title: '', note: '', phoneNumber: '', avatar: null });
    const [preview, setPreview] = useState(null);
    const [entries, setEntries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Sign-up');
            return;
        }
        fetchUserData();
        fetchUserNotes();
    }, [navigate]);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:10000/users', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('Błąd pobierania danych użytkownika');
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

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
            setError(error.message);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData(prev => ({ ...prev, [name]: value }));
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewData(prev => ({ ...prev, avatar: file }));
            setPreview(URL.createObjectURL(file));
        }
    };





    const handleAddEntry = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
    
        const formData = new FormData();
        formData.append('title', newData.title);
        formData.append('body', newData.note);
        formData.append('phoneNumber', newData.phoneNumber); // ➕ DODANE!
        if (newData.avatar) formData.append('image', newData.avatar);
    
        console.log('FormData przed wysłaniem:', formData);  // Sprawdź, czy phoneNumber jest w formData

        try {
            const response = await fetch('http://localhost:10000/users/entries', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
    
            if (!response.ok) throw new Error('Błąd dodawania wpisu');
    
            const { note } = await response.json();
            setEntries(prevEntries => [...prevEntries, note]);
    
            setNewData({ title: '', note: '', phoneNumber: '', avatar: null });
            setPreview(null);
        } catch (error) {
            setError(error.message);
        }
    };
    







    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:10000/users', {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('Błąd usuwania konta');

            localStorage.removeItem('token');
            navigate('/Sign-up');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteAvatar = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:10000/users/image', {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
    
            if (!response.ok) throw new Error('Błąd usuwania zdjęcia');
    
            // Po udanym usunięciu zdjęcia, usuń je z interfejsu użytkownika
            setUserData(prev => ({ ...prev, avatar: '' }));
        } catch (error) {
            console.error(error.message);
        }
    };
    

    const handleDeleteEntry = async (noteId) => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch(`http://localhost:10000/users/entries/${noteId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
    
    


    return (
        <Flex margin="50px" direction="column" align="center">
            <h1>Panel użytkownika</h1>
            {loading && <p>Ładowanie danych...</p>}
            {error && <p style={{ color: 'red' }}>Błąd: {error}</p>}

            {userData && (
                <Box mt={5} width="100%">
                    <h2>Witaj, {userData.username}!</h2>
                    <p>Email: {userData.email}</p>
                    {userData.avatar ? (
                        <>
                            <Image src={userData.avatar} alt="Avatar" width="200px" mt={2} />
                            <Button onClick={handleDeleteAvatar} colorScheme="yellow" mt={2}>Usuń zdjęcie</Button>
                        </>
                    ) : (
                        <p>Brak zdjęcia</p>
                    )}

                    <form onSubmit={handleAddEntry} style={{ maxWidth: '400px', width: '100%' }}>
                        <Input
                            name="title"
                            value={newData.title}
                            onChange={handleInputChange}
                            placeholder="Tytuł wpisu"
                            mb={2}
                        />
                        <Textarea
                            name="note"
                            value={newData.note}
                            onChange={handleInputChange}
                            placeholder="Dodaj notatkę"
                            mb={2}
                        />
                        <Input
                            name="phoneNumber"
                            type="number"
                            value={newData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Numer telefonu"
                            mb={2}
                        />
                        <Input type="file" onChange={handleFileChange} mb={2} />
                        {preview && <Image src={preview} alt="Podgląd" width="100px" mb={2} />}
                        <Button type="submit" colorScheme="blue">Dodaj wpis</Button>
                    </form>

                    <Button onClick={handleDeleteAccount} colorScheme="red" mt={4}>Usuń konto</Button>
                    <Button onClick={() => { localStorage.removeItem('token'); navigate('/Sign-up'); }} colorScheme="gray" mt={2}>Wyloguj się</Button>
                </Box>
            )}

            <Box mt={5} width="100%">
                <h3>Wpisy:</h3>
                {entries.length === 0 ? <p>Brak wpisów</p> : (
                    
                    entries.map((entry, index) => (
                        <Box key={index} border="1px solid #ccc" padding="10px" marginBottom="10px">
                            <h4>{entry.title || 'Bez tytułu'}</h4>
                            <p>{entry.body || 'Brak treści'}</p>
                            <p>{entry.phoneNumber || 'Brak treści'}</p>
                            {entry.image && (
                                <>
                                    <Image src={entry.image} alt="Obraz" width="100px" />
                                    <Button onClick={() => handleDeleteImage(entry._id)} colorScheme="red" mt={2}>Usuń zdjęcie</Button>
                                </>
                            )}
                            <Button onClick={() => handleDeleteEntry(entry._id)} colorScheme="red" mt={2}>Usuń notatkę</Button>
                        </Box>
                    ))
                    



)}
            </Box>
        </Flex>
    );
};

export default Dashboard;
