import { useState, useEffect } from "react";


const Message = ({ senderId, receiverId }) => {
    const [content, setContent] = useState("");

    const sendMessage = async () => {
        const response = await fetch('/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender_id: senderId, receiver_id: receiverId, content })
        });

        if (response.ok) {
            setContent('');
            // Można dodać logikę do aktualizacji widoku wiadomości, np. ponowne załadowanie
        }
    };

    return (
        <div>
            <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Napisz wiadomość..."
            />
            <button onClick={sendMessage}>Wyślij</button>
        </div>
    );
};


export default  Message;






// Komponent do wyświetlania wiadomości //

// const MessagesPanel = ({ userId }) => {
//     const [messages, setMessages] = useState([]);
    
//     useEffect(() => {
//         fetch(`/messages/${userId}`)
//             .then(res => res.json())
//             .then(data => setMessages(data));
//     }, [userId]);

//     return (
//         <div>
//             <h2>Wiadomości</h2>
//             <ul>
//                 {messages.map((message) => (
//                     <li key={message.id}>
//                         <strong>{message.sender_id}</strong>: {message.content}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };



// Komponent do wysyłania wiadomości //

// const SendMessage = ({ senderId, receiverId }) => {
//     const [content, setContent] = useState("");

//     const sendMessage = async () => {
//         const response = await fetch('/messages', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ sender_id: senderId, receiver_id: receiverId, content })
//         });

//         if (response.ok) {
//             setContent('');
//             // Można dodać logikę do aktualizacji widoku wiadomości, np. ponowne załadowanie
//         }
//     };

//     return (
//         <div>
//             <textarea 
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="Napisz wiadomość..."
//             />
//             <button onClick={sendMessage}>Wyślij</button>
//         </div>
//     );
// };




// Integracja z panelem użytkownika //

// const UserPanel = ({ userId }) => {
//     return (
//         <div>
//             <h2>Panel użytkownika</h2>
//             <div>
//                 <h3>Wiadomości</h3>
//                 <MessagesPanel userId={userId} />
//                 <SendMessage senderId={userId} receiverId={someReceiverId} />
//             </div>
//         </div>
//     );
// };


