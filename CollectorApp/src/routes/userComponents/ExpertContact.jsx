import { useEffect, useState } from "react";
import axios from "axios";
import { Flex } from "@chakra-ui/react";

const ExpertContact = ({ noteId }) => {
    const [expert, setExpert] = useState([]);
    const [selectedExpert, setSelectedExpert] = useState(""); // ID wybranego eksperta
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchExpert = async () => {
            try {
                const response = await axios.get("http://localhost:10000/expert-contact", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setExpert(response.data);
            } catch (error) {
                console.error("Błąd podczas pobierania ekspertów:", error);
            }
        };

        fetchExpert();
    }, []);

    const handleExpertClick = (expertId) => {
        // Zwijamy formularz, jeśli kliknięto na tego samego eksperta
        if (selectedExpert === expertId) {
            setSelectedExpert(""); // Zwijamy formularz
        } else {
            setSelectedExpert(expertId); // Ustawienie wybranego eksperta po kliknięciu
        }
    };

    const sendMessage = async () => {
        if (!selectedExpert) {
            setMessage("Wybierz eksperta, do którego chcesz wysłać wiadomość.");
            return;
        }
        if (!title || !content) {
            setMessage("Tytuł i treść wiadomości są wymagane.");
            return;
        }
    
        setLoading(true);
        try {
            // Wysłanie wiadomości do eksperta
            await axios.post(
                "http://localhost:10000/send-message",
                { receiverId: selectedExpert, title, content },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            
            await axios.put(
                `http://localhost:10000/users/entries/${noteId}`,
                { 
                    expertId: selectedExpert,  // Przekazujesz wybrane ID eksperta
                    expertRequest: true, 
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
    
            setMessage("Wiadomość została wysłana, ekspert został przypisany.");
            setTitle("");
            setContent("");
            setSelectedExpert("");
        } catch (error) {
            console.error("Błąd podczas wysyłania wiadomości:", error);
            setMessage("Wystąpił błąd. Spróbuj ponownie.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
            {message && <p className="text-sm text-red-600">{message}</p>}

            {selectedExpert && (
                <div className="mb-4">
                    <h3 className="text-lg text-gray-700">
                        Wybrany ekspert: {expert.find((exp) => exp._id === selectedExpert)?.username}
                    </h3>
                </div>
            )}

            <div className="mb-4">
                <h3 className="text-lg text-gray-700 mb-2">Wybierz eksperta</h3>
                <Flex className="list-disc list-inside">
                    {expert.map((exp) => (
                        <div
                            key={exp._id}
                            onClick={() => handleExpertClick(exp._id)} // Dodanie obsługi kliknięcia
                            style={{
                                padding: ".5rem 1rem",
                                cursor: "pointer",
                                background: selectedExpert === exp._id ? "#e0f7fa" : "transparent", // Podświetlenie wybranego eksperta
                            }}
                            className={`text-gray-800 hover:text-blue-600 ${
                                selectedExpert === exp._id ? "bg-blue-100" : ""
                            }`} // Podświetlenie wybranego eksperta
                        >
                            {exp.username}
                        </div>
                    ))}
                </Flex>
            </div>

            {selectedExpert && (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tytuł</label>
                        <input
                            style={{ background: "#222222", color: "#fff" }}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded-md p-2"
                            placeholder="Wpisz tytuł wiadomości..."
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Treść wiadomości</label>
                        <textarea
                            style={{ background: "#222222", color: "#fff" }}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border rounded-md p-2"
                            rows="4"
                            placeholder="Wpisz treść wiadomości..."
                        ></textarea>
                    </div>

                    <button
                        style={{ background: "blue", color: "#fff" }}
                        onClick={sendMessage}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Wysyłanie..." : "Wyślij wiadomość"}
                    </button>
                </>
            )}
        </div>
    );
};

export default ExpertContact;
