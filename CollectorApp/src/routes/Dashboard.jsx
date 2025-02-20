


// import { useEffect, useState } from 'react';
// import { Flex, Button, Input, Textarea, Image, Box } from '@chakra-ui/react';
// import { useNavigate, Route, Routes, Link } from 'react-router-dom';
// import Products from './userComponents/Products';
// import Profile from './userComponents/Profile';
// import Message from './userComponents/Message';

// const Dashboard = () => {
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [newData, setNewData] = useState({ title: '', note: '', phoneNumber: '', avatar: null });
//     const [preview, setPreview] = useState(null);
//     const [entries, setEntries] = useState([]);
//     const navigate = useNavigate();
//     const [editMode, setEditMode] = useState(null);
// const [editData, setEditData] = useState({ title: '', note: '', phoneNumber: '' });

    

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             navigate('/login');
//             return;
//         }
//         fetchUserData();
//         fetchUserNotes();
//     }, [navigate]);

//     const fetchUserData = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:10000/users', {
//                 method: 'GET',
//                 headers: { 'Authorization': `Bearer ${token}` },
//             });
//             // if (!response.ok) throw new Error('Token wygasł lub jest niepoprawny');
//             if (!response.ok) {
//                 throw new Error('Token wygasł lub jest niepoprawny');
//             }
//             const data = await response.json();
//             setUserData(data);
//         } catch (error) {
//             console.error('Błąd pobierania danych użytkownika:', error);
//             localStorage.removeItem('token'); // Usuń token jeśli jest nieważny
//             navigate('/login');
//         }finally {
//             setLoading(false);
//         }
//     };
    

//     const fetchUserNotes = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:10000/users/entries', {
//                 method: 'GET',
//                 headers: { 'Authorization': `Bearer ${token}` },
//             });

//             if (!response.ok) throw new Error('Błąd pobierania notatek');

//             const data = await response.json();
//             setEntries(data);
//         } catch (error) {
//             console.error('Błąd pobierania notatek:', error);
//             setError(error.message);
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




// // ============================== ADD ==================================//
//     const handleAddEntry = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('token');
    
//         const formData = new FormData();
//         formData.append('title', newData.title);
//         formData.append('body', newData.note);
//         formData.append('phoneNumber', newData.phoneNumber); // ➕ DODANE!
//         if (newData.avatar) formData.append('image', newData.avatar);
    
//         console.log('FormData przed wysłaniem:', formData);  // Sprawdź, czy phoneNumber jest w formData

//         try {
//             const response = await fetch('http://localhost:10000/users/entries', {
//                 method: 'POST',
//                 headers: { 'Authorization': `Bearer ${token}` },
//                 body: formData
//             });
    
//             if (!response.ok) throw new Error('Błąd dodawania wpisu');
    
//             const { note } = await response.json();
//             setEntries(prevEntries => [...prevEntries, note]);
    
//             setNewData({ title: '', note: '', phoneNumber: '', avatar: null });
//             setPreview(null);
//         } catch (error) {
//             setError(error.message);
//         }
//     };
    




// // ====================================== Edit ====================================//

//     const handleEditClick = (entry) => {
//         setEditMode(entry._id);
//         setEditData({ title: entry.title, note: entry.body, phoneNumber: entry.phoneNumber });
//     };
    
//     const handleEditInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditData((prev) => ({ ...prev, [name]: value }));
//     };



//     const handleSaveEdit = async (noteId) => {
//         const token = localStorage.getItem('token');
    
//         try {
//             const response = await fetch(`http://localhost:10000/users/entries/${noteId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ ...editData, body: editData.note }), // Zamiana note na body przy wysyłaniu
//             });
    
//             if (!response.ok) throw new Error('Błąd podczas aktualizacji notatki');
    
//             const updatedNote = await response.json();
    
//             // Aktualizacja stanu z body przypisanym do note
//             setEntries((prevEntries) =>
//                 prevEntries.map((entry) =>
//                     entry._id === noteId 
//                         ? { ...entry, ...updatedNote, note: updatedNote.body } 
//                         : entry
//                 )
//             );
    
//             setEditMode(null); // Wyłącz tryb edycji
//         } catch (error) {
//             console.error('Błąd aktualizacji notatki:', error);
//         }
//     };
    

    






// // ========================= delete ========================================//

//     const handleDeleteAccount = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:10000/users', {
//                 method: 'DELETE',
//                 headers: { 'Authorization': `Bearer ${token}` },
//             });
    
//             if (!response.ok) throw new Error('Błąd usuwania konta');
    
//             localStorage.removeItem('token');
//             navigate('/login');
//         } catch (error) {
//             setError(error.message);
//         }
//     };
    
   

//     const handleDeleteEntry = async (noteId) => {
//         const token = localStorage.getItem('token');
    
//         try {
//             const response = await fetch(`http://localhost:10000/users/entries/${noteId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
    
//             if (!response.ok) {
//                 throw new Error('Błąd podczas usuwania notatki');
//             }
    
//             setEntries(entries.filter(entry => entry._id !== noteId));
//         } catch (error) {
//             console.error('Błąd usuwania notatki:', error);
//         }
//     };
    

//     const handleDeleteImage = async (noteId) => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`http://localhost:10000/users/entries/image/${noteId}`, {
//                 method: 'DELETE',
//                 headers: { 'Authorization': `Bearer ${token}` },
//             });
    
//             if (!response.ok) throw new Error('Błąd usuwania zdjęcia');nin
    
//             setEntries(prevEntries =>
//                 prevEntries.map(entry =>
//                     entry._id === noteId ? { ...entry, image: null, imageId: null } : entry
//                 )
//             );
//         } catch (error) {
//             console.error('Błąd usuwania zdjęcia:', error.message);
//         }
//     };
    
    


//     return (
//         <Flex margin="50px" direction="column" align="center">
//             <h1>Panel użytkownika</h1>
//             <Flex>
//                 <Link to="/dashboard/profile">Profil</Link> | ChatGPT
//                 ChatGPT
//                 GPT Icon
//                 Czat.ai - polski chat z GPT
                
//                 Odkryj modele GPT
//                 Dzisiaj
                
//                 <Link to="/dashboard/products">Produkty</Link> | 
//                 <Link to="/dashboard/message">Wiadomości</Link>
//             </Flex>
//                     <Routes>
//                         <Route path="profile" element={<Profile />} />
//                         <Route path="products" element={<Products />} />
//                         <Route path="message" element={<Message />} />
//                     </Routes>
                    

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

//                     <form onSubmit={handleAddEntry} style={{ maxWidth: '400px', width: '100%' }}>
//                         <Input
//                             name="title"
//                             value={newData.title}
//                             onChange={handleInputChange}
//                             placeholder="Tytuł wpisu"
//                             mb={2}
//                         />
//                         <Textarea
//                             name="note"
//                             value={newData.note}
//                             onChange={handleInputChange}
//                             placeholder="Dodaj notatkę"
//                             mb={2}
//                         />
//                         <Input
//                             name="phoneNumber"
//                             type="number"
//                             value={newData.phoneNumber}
//                             onChange={handleInputChange}
//                             placeholder="Numer telefonu"
//                             mb={2}
//                         />
//                         <Input type="file" onChange={handleFileChange} mb={2} />
//                         {preview && <Image src={preview} alt="Podgląd" width="100px" mb={2} />}
//                         <Button type="submit" colorScheme="blue">Dodaj wpis</Button>
//                     </form>

//                     <Button onClick={handleDeleteAccount} colorScheme="red" mt={4}>Usuń konto</Button>
//                     <Button onClick={() => { localStorage.removeItem('token'); navigate('/Sign-up'); }} colorScheme="gray" mt={2}>Wyloguj się</Button>
//                 </Box>
//             )}
            

//             <Box mt={5} width="100%">
//                 <h3>Wpisy:</h3>
//                 {entries.map((entry, index) => (
//     <Box key={index} border="1px solid #ccc" padding="10px" marginBottom="10px">
//         {editMode === entry._id ? (
//             <>
//                 <Input
//                     name="title"
//                     value={editData.title}
//                     onChange={handleEditInputChange}
//                     placeholder="Edytuj tytuł"
//                     mb={2}
//                 />
//                 <Textarea
//                     name="note"
//                     value={editData.note}
//                     onChange={handleEditInputChange}
//                     placeholder="Edytuj treść"
//                     mb={2}
//                 />
//                 <Input
//                     name="phoneNumber"
//                     type="number"
//                     value={editData.phoneNumber}
//                     onChange={handleEditInputChange}
//                     placeholder="Edytuj numer telefonu"
//                     mb={2}
//                 />
//                 <Button onClick={() => handleSaveEdit(entry._id)} colorScheme="green" mt={2}>
//                     Zapisz
//                 </Button>
//                 <Button onClick={() => setEditMode(null)} colorScheme="gray" mt={2} ml={2}>
//                     Anuluj
//                 </Button>
//             </>
//         ) : (
//             <>
//                 <h4>{entry.title || 'Bez tytułu'}</h4>
//                 <p>{entry.body || 'Brak treści'}</p>
//                 <p>{entry.phoneNumber || 'Brak numeru telefonu'}</p>
//                 {entry.image && (
//                     <>
//                         <Image src={entry.image} alt="Obraz" width="100px" />
//                         <Button onClick={() => handleDeleteImage(entry._id)} colorScheme="red" mt={2}>
//                             Usuń zdjęcie
//                         </Button>
//                     </>
//                 )}
//                 <Button onClick={() => handleEditClick(entry)} colorScheme="blue" mt={2}>
//                     Edytuj
//                 </Button>
//                 <Button onClick={() => handleDeleteEntry(entry._id)} colorScheme="red" mt={2} ml={2}>
//                     Usuń notatkę
//                 </Button>
//             </>
//         )}
//     </Box>
// ))}

//             </Box>
//         </Flex>
//     );
// };

// export default Dashboard;


































import { Flex,Link, Box} from '@chakra-ui/react';
import { Route, Routes, Link as RouterLink } from 'react-router-dom';
import Products from './userComponents/Products'; // Importuj Products
import Profile from './userComponents/Profile';
import Message from './userComponents/Message';

const Dashboard = () => {



    return (
        <Flex margin="50px" direction="column" align="center">
            <h1>Panel użytkownika</h1>
            <Flex>
                <Box as={RouterLink} to="/dashboard/profile"
                border = {"solid #ffffff 2px"} padding = {".5rem 1rem"}>Profil</Box> | 
                <Box as={RouterLink} to="/dashboard/products" 
                border = {"solid #ffffff 2px"} padding = {".5rem 1rem"} margin = {".5rem 1rem"}
                >Produkty</Box> | 
                <Box as={RouterLink} to="/dashboard/message" border = {"solid #ffffff 2px"} padding = {".5rem 1rem"}>Wiadomości</Box>
            </Flex>
            <Routes>
                <Route path="profile" element={<Profile />} />
                <Route path="products" element={<Products />} />  {/* Użyj komponentu Products */}
                <Route path="message" element={<Message />} />
            </Routes>
        </Flex>
    );
};

export default Dashboard;

































