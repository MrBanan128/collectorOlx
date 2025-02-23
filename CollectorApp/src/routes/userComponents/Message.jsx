// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Message = () => {
//     const [messages, setMessages] = useState([]);
//     const [selectedMessage, setSelectedMessage] = useState(null); // Zmienna przechowująca wybraną wiadomość
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     setError("Brak tokena, nie jesteś zalogowany");
//                     return;
//                 }
//                 const res = await axios.get('http://localhost:10000/user-messages', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 setMessages(res.data);
//             } catch (error) {
//                 setError("Nie udało się pobrać wiadomości.");
//             }
//         };

//         fetchMessages();
//     }, []);


//     const handleMessageClick = async (id, isRead) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 setError("Brak tokena, nie jesteś zalogowany");
//                 return;
//             }

//             if (!isRead) {
//                 await axios.patch(`http://localhost:10000/message/${id}/read`, {}, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 setMessages((prevMessages) =>
//                     prevMessages.map((msg) =>
//                         msg._id === id ? { ...msg, status: 'read' } : msg
//                     )
//                 );
//             }

//             const selectedMsg = messages.find(msg => msg._id === id);
//             setSelectedMessage(selectedMsg);
//         } catch (error) {
//             console.error("Błąd przy aktualizacji statusu:", error);
//             setError("Nie udało się zaktualizować statusu wiadomości.");
//         }
//     };


//     const handleDeleteMessage = async (id) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 setError("Brak tokena, nie jesteś zalogowany");
//                 return;
//             }

//             await axios.delete(`http://localhost:10000/messages/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             setMessages((prevMessages) =>
//                 prevMessages.filter((msg) => msg._id !== id)
//             );

//             if (selectedMessage && selectedMessage._id === id) {
//                 setSelectedMessage(null);
//             }
//         } catch (error) {
//             console.error("Błąd przy usuwaniu wiadomości:", error);
//             setError("Nie udało się usunąć wiadomości.");
//         }
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return "Brak daty";
//         const date = new Date(dateString);
//         return isNaN(date.getTime()) ? "Niepoprawna data" : date.toLocaleDateString();
//     };

//     const unreadMessages = messages.filter((msg) => msg.status === 'unread');
//     const readMessages = messages.filter((msg) => msg.status === 'read');

//     return (
//         <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
//             <div style={{ width: '30%' }}>
//                 <div>
//                     <h3 style={{color:"blue", fontSize:"2.5rem", fontWeight:"600"}}>Nieprzeczytane</h3>
//                     <ul style={{background:"#222222", padding:"2rem", marginRight:"2rem", minHeight:"100px"}}>
//                         {unreadMessages.map((msg) => (
//                             <li
//                                 key={msg._id}
//                                 onClick={() => handleMessageClick(msg._id, false)}
//                                 style={{ cursor: 'pointer', color: 'red' }}
//                             >
//                                 <strong>
//                                     {msg.senderId.username}
//                                     {formatDate(msg.timestamp)}
//                                     <span style={{ fontSize: '0.8em' }}> (Nowa!)</span>
//                                 </strong>: {msg.title}
                                
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div>
//                     <h3 style={{color:"blue", fontSize:"2.5rem", fontWeight:"600"}}>Przeczytane</h3>
//                     <ul style={{background:"#222222", padding:"2rem", marginRight:"2rem", minHeight:"100px"}}>
//                         {readMessages.map((msg) => (
//                             <li
//                                 key={msg._id}
//                                 onClick={() => handleMessageClick(msg._id, true)}
//                                 style={{ cursor: 'pointer' }}
//                             >
//                                 <strong>
//                                     {msg.senderId.username} 
//                                     {formatDate(msg.timestamp)}
//                                     <span style={{ fontSize: '0.8em' }}> (Stare!)</span>
//                                 </strong>: {msg.title}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>

//             <div style={{ width: '70%', padding: '20px', borderLeft: '1px solid #ccc' }}>
//                 {selectedMessage ? (
//                     <div>
//                         <button
//                             onClick={() => handleDeleteMessage(selectedMessage._id)}
//                             style={{
//                                 backgroundColor: 'red',
//                                 color: 'white',
//                                 border: 'none',
//                                 padding: '10px',
//                                 cursor: 'pointer',
//                                 marginTop: '20px'
//                             }}
//                         >
//                             Usuń wiadomość
//                         </button>
//                        <p style={{textAlign:"center"}}>--- {formatDate(selectedMessage.timestamp)} ---</p>
//                         <div>{selectedMessage.content}</div>
                        
//                     </div>
//                 ) : (
//                     <p></p>
//                 )}
                                               
//             </div>
//         </div>
//     );
// };

// export default Message;











import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Message = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null); // Zmienna przechowująca wybraną wiadomość
    const [error, setError] = useState(null);
    const [replyTitle, setReplyTitle] = useState("");
    const [replyContent, setReplyContent] = useState("");


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Brak tokena, nie jesteś zalogowany");
                    return;
                }
                const res = await axios.get('http://localhost:10000/user-messages', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setMessages(res.data);
            } catch (error) {
                setError("Nie udało się pobrać wiadomości.");
            }
        };

        fetchMessages();
    }, []);



    const handleMessageClick = async (id, isRead) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Brak tokena, nie jesteś zalogowany");
                return;
            }

            if (!isRead) {
                await axios.patch(`http://localhost:10000/message/${id}/read`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setMessages((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg._id === id ? { ...msg, status: 'read' } : msg
                    )
                );
            }

            const selectedMsg = messages.find(msg => msg._id === id);
            setSelectedMessage(selectedMsg);
        } catch (error) {
            console.error("Błąd przy aktualizacji statusu:", error);
            setError("Nie udało się zaktualizować statusu wiadomości.");
        }
    };

    const handleDeleteMessage = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Brak tokena, nie jesteś zalogowany");
                return;
            }

            await axios.delete(`http://localhost:10000/messages/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg._id !== id)
            );

            if (selectedMessage && selectedMessage._id === id) {
                setSelectedMessage(null);
            }
        } catch (error) {
            console.error("Błąd przy usuwaniu wiadomości:", error);
            setError("Nie udało się usunąć wiadomości.");
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        
        if (!replyTitle || !replyContent) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        if (!selectedMessage || !selectedMessage.senderId) {
            alert("Brak nadawcy wiadomości.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Brak tokena, nie jesteś zalogowany");
                return;
            }

            await axios.post('http://localhost:10000/send-message', {
                receiverId: selectedMessage.senderId._id || selectedMessage.senderId,
                title: replyTitle,
                content: replyContent,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Odpowiedź została wysłana!");
            setReplyTitle("");
            setReplyContent("");
        } catch (error) {
            console.error("Błąd przy wysyłaniu odpowiedzi:", error);
            setError(error.response?.data?.message || "Nie udało się wysłać odpowiedzi.");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Brak daty";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "Niepoprawna data" : date.toLocaleDateString();
    };

    const unreadMessages = messages.filter((msg) => msg.status === 'unread');
    const readMessages = messages.filter((msg) => msg.status === 'read');

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '30%' }}>
                <div>
                    <h3 style={{color:"blue", fontSize:"2.5rem", fontWeight:"600"}}>Nieprzeczytane</h3>
                    <ul style={{background:"#222222", padding:"2rem", marginRight:"2rem", minHeight:"100px"}}>
                        {unreadMessages.map((msg) => (
                            <li
                                key={msg._id}
                                onClick={() => handleMessageClick(msg._id, false)}
                                style={{ cursor: 'pointer', color: 'red' }}
                            >
                                <strong>
                                    {msg.senderId.username}
                                    {formatDate(msg.timestamp)}
                                    <span style={{ fontSize: '0.8em' }}> (Nowa!)</span>
                                </strong>: {msg.title}
                                
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 style={{color:"blue", fontSize:"2.5rem", fontWeight:"600"}}>Przeczytane</h3>
                    <ul style={{background:"#222222", padding:"2rem", marginRight:"2rem", minHeight:"100px"}}>
                        {readMessages.map((msg) => (
                            <li
                                key={msg._id}
                                onClick={() => handleMessageClick(msg._id, true)}
                                style={{ cursor: 'pointer' }}
                            >
                                <strong>
                                    {msg.senderId.username} 
                                    {formatDate(msg.timestamp)}
                                    <span style={{ fontSize: '0.8em' }}> (Stare!)</span>
                                </strong>: {msg.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div style={{ width: '70%', padding: '20px', borderLeft: '1px solid #ccc' }}>
                {selectedMessage ? (
                    <div>
                        <button
                            onClick={() => handleDeleteMessage(selectedMessage._id)}
                            style={{
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '10px',
                                cursor: 'pointer',
                                marginTop: '20px'
                            }}
                        >
                            Usuń wiadomość
                        </button>
                       <p style={{textAlign:"center"}}>--- {formatDate(selectedMessage.timestamp)} ---</p>
                        <div>{selectedMessage.content}</div>
                        
                    </div>
                ) : (
                    <p></p>
                )}



<div>
            <h3>Twoje wiadomości</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {messages.map((msg) => (
                    <li key={msg._id} onClick={() => handleMessageClick(msg._id, msg.status === 'read')}>
                        <strong>{msg.senderId?.username || "Nieznany"}</strong>: {msg.title} 
                    </li>
                ))}
            </ul>

            {selectedMessage && (
                <div>
                    <h3>Odpowiedz na wiadomość</h3>
                    <form onSubmit={handleReplySubmit}>
                        <input
                            style={{background:"#222222"}}
                            type="text"
                            placeholder="Tytuł"
                            value={replyTitle}
                            onChange={(e) => setReplyTitle(e.target.value)}
                        />
                        <textarea
                         style={{background:"#222222"}}
                            placeholder="Treść wiadomości"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                        />
                        <button 
                        style={{background:"blue"}}
                        type="submit">Wyślij odpowiedź</button>
                    </form>
                </div>
            )}
        </div>
                                               
            </div>
        </div>
    );
};

export default Message;










































